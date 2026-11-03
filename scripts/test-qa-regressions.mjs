import fs from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';
const s=fs.readFileSync('index.html','utf8').match(/<script>([\s\S]*?)<\/script>/)[1],c=vm.createContext({console});vm.runInContext(s.slice(s.indexOf('const esc='),s.indexOf('let projects=[]'))+';globalThis.e={compile,sanitizeProjects};',c);const {compile,sanitizeProjects}=c.e,read=t=>compile(t,null,true,false,true).graph,edit=(t,g)=>compile(t,g,false,false,true);
const n=(g,label)=>g.nodes.find(x=>x.label===label),link=(g,a,b)=>g.edges.some(e=>e.from===n(g,a)?.id&&e.to===n(g,b)?.id||e.to===n(g,a)?.id&&e.from===n(g,b)?.id),labels=g=>[...g.nodes.map(x=>x.label)];

// An alias statement is an edit, not a description: it must never rebuild or drop existing connections.
for(const [setup,pre] of [['A web app signs in with Auth0. A mobile app uses Okta.',[]],['A web app signs in with Auth0. A mobile app uses Okta.',['Add a risk engine']],['A web app signs in with Auth0. A mobile app uses Okta.',['Enterprise connection in Auth0']],['A web app uses Auth0. A service called Billing.',[]]]){let g=read(setup);for(const p of pre)g=edit(p,g).graph;const edges=g.edges.length;const r=edit('Auth0 is also called Login provider',g);assert.equal(r.graph.edges.length,edges,'alias edit must keep every connection: '+setup+' '+pre);assert(n(r.graph,'Auth0').aliases.includes('Login provider'));assert(r.changes>0)}
{let g=read('A web app signs in with Auth0. A mobile app uses Okta. A service called Billing.');g=edit('Auth0 is also called Login provider',g).graph;g=edit('Connect Login provider to Billing',g).graph;assert(link(g,'Auth0','Billing'),'the alias resolves in a follow-up command');g=edit('Okta is also known as Workforce SSO',g).graph;g=edit('Connect Workforce SSO to Billing',g).graph;assert(link(g,'Okta','Billing'));assert(link(g,'Web app','Auth0'));assert(g.context.compiledText.startsWith('A web app signs in with Auth0.'),'alias edits append to the recorded source instead of replacing it')}
console.log('QA regressions passed: alias edits keep connections and stay resolvable.');

// "X uses Y to <verb> ..." is a purpose clause: it must never become a component.
{let g=read('A web app uses Auth0 to log in users.');assert.deepEqual(labels(g).sort(),['Auth0','Web app']);assert.equal(g.edges.length,1);assert(link(g,'Web app','Auth0'));
g=read('A web app uses Auth0 in order to sign users in.');assert.deepEqual(labels(g).sort(),['Auth0','Web app']);
g=read('A web app calls Billing to charge customers.');assert.deepEqual(labels(g).sort(),['Billing','Web app']);
g=read('A web app uses Auth0 to authenticate users and a database to store data.');assert.deepEqual(labels(g).sort(),['Auth0','Database','Web app']);assert(link(g,'Web app','Auth0'));assert(link(g,'Web app','Database'));
g=read('A web app uses a queue to call a billing service.');assert.deepEqual(labels(g).sort(),['Billing service','Queue','Web app']);assert(link(g,'Web app','Queue'));assert(link(g,'Queue','Billing service'),'a relational purpose becomes a call from the instrument');
g=read('An AI agent calls an MCP server. The MCP server uses Token Vault to call a third-party API.');assert.deepEqual(labels(g).sort(),['AI agent','MCP server','Third-party API','Token Vault']);assert(link(g,'AI agent','MCP server'));assert(link(g,'MCP server','Token Vault'));assert(link(g,'Token Vault','Third-party API'));
g=read('A service called "Talks to Okta" uses a database to store data.');assert(!labels(g).some(l=>/store data/i.test(l)),'quoted names do not stop purpose clauses from being removed');assert(labels(g).includes('Talks to Okta'));
g=read('A web app uses Auth0 and a database.');assert(link(g,'Web app','Auth0')&&link(g,'Web app','Database'),'plain conjunctions are unchanged')}
console.log('QA regressions passed: purpose clauses never create components.');

// Quantities: "N things" creates N components, up to the diagram limit, and never loses the rest silently.
{let g=read('Three AI agents and two MCP servers.');assert.equal(g.nodes.length,5,'counted catalog items are all drawn');
g=read('We have two vector databases.');assert.equal(g.nodes.filter(x=>/vector/i.test(x.label)).length,2);
g=read('We have 30 web apps. All use Auth0.');assert.equal(g.nodes.length,31);assert.equal(g.edges.length,30,'30 apps all connect to Auth0 (no 12-app cap)');
g=read('We have 50 web apps and 20 mobile apps. All use Auth0.');assert(g.nodes.length>60,'over-limit input is reported in full so the app can refuse it clearly instead of silently truncating')}
console.log('QA regressions passed: counts are honoured.');

// Spelling variants and quoted names.
{for(const t of ['A SPA calls an API gateway.','A single page app calls an API gateway.','Our SPAs call an API gateway.','A single-page application calls an API gateway.'])assert(read(t).nodes.some(x=>/single page|spa/i.test(x.label)),'SPA recognised: '+t);
assert(!read('The team booked a spa resort for the offsite.').nodes.some(x=>/spa|single page/i.test(x.label)),'a lowercase spa is just a word');
const q=read('A service called "Salesforce Okta Stripe bridge" uses a database.');assert.deepEqual(labels(q).sort(),['Database','Salesforce Okta Stripe bridge'],'words inside a quoted name never become catalog components');assert(link(q,'Salesforce Okta Stripe bridge','Database'))}
console.log('QA regressions passed: SPA variants and quoted names.');

// "Each (app) has a database" is one database per app, like "its own database".
{for(const t of ['A web app and a mobile app use Auth0. Each has a database.','A web app and a mobile app use Auth0. Each app has a database.','A web app and a mobile app use Auth0. Each has its own database.']){const g=read(t),dbs=g.nodes.filter(x=>x.type==='store');assert.equal(dbs.length,2,t);assert(dbs.every(d=>g.edges.some(e=>e.to===d.id||e.from===d.id)),'every database is attached: '+t);assert(link(g,'Web app',dbs[0].label)!==link(g,'Web app',dbs[1].label),'each app owns exactly one: '+t)}
const shared=read('A web app and a mobile app use Auth0. Both apps share one database.');assert.equal(shared.nodes.filter(x=>x.type==='store').length,1,'shared stays shared')}
console.log('QA regressions passed: each app has a database.');

// Stored projects can be damaged or hand-edited; loading must repair them instead of wedging the app.
{const ok={id:'p1',name:'Good',graph:{title:'T',nodes:[{id:'a',type:'app',label:'Web app',x:10,y:20,w:220,h:100,badges:['MFA'],aliases:['Site']}],edges:[],drawings:[],assumptions:[]},notes:'',activity:[],version:2,updated:5};
const copy=JSON.parse(JSON.stringify(ok)),[kept]=[...sanitizeProjects([copy])];assert.deepEqual(JSON.parse(JSON.stringify(kept)),ok,'a valid project is returned unchanged');
const bad=sanitizeProjects([null,5,'x',{id:''},{id:'p2',name:7,graph:{nodes:[null,'s',{id:'n',label:12,badges:'oops',aliases:{a:1},x:'abc',y:1e308,w:-50,h:null,capabilityStyles:'z',appearance:'red'},{id:'n'}],edges:[{id:'e',from:'ghost',to:'n'},{id:'f',from:'n',to:'n',label:{a:1},points:'zz'}]},activity:'x',version:'q'},{id:'p2',graph:{}}]);
assert.equal(bad.length,1,'unusable entries and duplicate ids are dropped');const [p2]=bad,node=p2.graph.nodes[0];
assert.equal(p2.graph.nodes.length,1);assert.equal(node.label,'12');assert.deepEqual([...node.badges],[]);assert.deepEqual([...node.aliases],[]);assert(Number.isFinite(node.x)&&Number.isFinite(node.y)&&node.w>=20&&node.h>=20,'geometry is finite and positive');assert(!('capabilityStyles'in node)&&!('appearance'in node));
assert.equal(p2.graph.edges.length,1,'edges to missing components are dropped');assert.equal(p2.graph.edges[0].label,'');assert(!('points'in p2.graph.edges[0]));assert.deepEqual([...p2.activity],[]);assert.equal(p2.name,'7');
assert.deepEqual([...sanitizeProjects('nope')],[]);assert.deepEqual([...sanitizeProjects(null)],[]);
const noNodes=sanitizeProjects([{id:'p3',name:'x',graph:{edges:[],context:{compiledText:'old'}}}])[0];assert.deepEqual([...noNodes.graph.nodes],[]);assert(!('context'in noNodes.graph),'stale source context is dropped with the lost components, so Build starts clean')}
console.log('QA regressions passed: damaged stored projects are repaired on load.');
