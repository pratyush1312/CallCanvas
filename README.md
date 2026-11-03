# CallCanvas

A self-contained architecture workspace for discovery and demo calls. No API keys, model calls, external JavaScript, or runtime dependencies. Open `index.html` in a browser, or build and serve `dist/`.

## Typing-only workflow

Type the starting setup in **Description**, then use **Change this diagram** during the call. This version has no transcript processing interface, file import, image upload, microphone, or project import. Recognizable speaker-labelled transcripts are rejected with an explanation while preserving the current diagram. Each input step is limited to 12,000 characters.

Builds use only described components. Generic databases stay generic; Azure reference services are never injected into an ordinary customer description. Quantities, named custom components, aliases, explicit relationships, and identity capabilities are supported. Auth0/Okta features attach to their platform. Unsupported or ambiguous references produce visible feedback.

Conversational normalization supports everyday app aliases (website, phone app, frontend), enumerated application roles, group references, relative gateway/service paths, and before/after-login phrasing. Follow-up corrections such as `Actually we need four apps`, `We no longer need KYC verifier`, and `Instead of Auth0 use Okta` resolve against the current diagram. Quoted names containing “and” stay intact. Speculative clauses beginning with “maybe”, “perhaps”, or “we might” are surfaced for confirmation instead of adding proposed products. Common Hinglish count/app/login phrases have bounded normalization; this is not comprehensive Hindi or multilingual support. Review diagram includes an expandable view of the normalized latest description.

The engine is a deterministic local parser, not an unrestricted language model. It cannot understand every sentence or recover every implied relationship. Unclear wording can need a shorter follow-up.

## Live changes

- `Add one more mobile application and connect it to Auth0`
- `Add two KYC verifiers`
- `Make it 3 KYC verifiers`
- `Remove all KYC verifiers`
- `Add a risk engine. App Service calls the risk engine after login.`
- `KYC verifier will be connected towards zero after login`
- `Rename it to Identity check`
- `Move Identity check to the right of Auth0`
- `Make Identity check bigger`
- `Make Identity check #159`
- `Replace Auth0 with Okta`

Changes resolve against current names and aliases. Multiple instructions in one step resolve in order. Additions get distinct labels; repeated relationships update existing connections rather than creating duplicates. Passive/future connections, recent-component pronouns, and lifecycle labels are supported. Generic connections use a line; explicit calls use an arrow.

Existing component positions remain stable during changes. Only new nodes are placed. There is no Arrange control. Replacements preserve IDs and connections. Source replay avoids applying an appended addition twice. A database is created for a new application only if requested or if the description explicitly defines an each-application database policy.

## Direct editing

Click a component to select it and drag from anywhere on the card to reposition. Double-click anywhere on a component to rename it. Click a line or arrow to type directly on it: an empty connection shows “Type anything” in place. Existing text can be edited the same way. Double-click also works. Enter saves, clicking away saves, and Escape cancels; there is no floating label form. Double-click empty canvas to insert editable text. Press Enter on a focused object or F2 on a selected component to edit it. Selection decorates existing SVG objects instead of replacing their click targets. The selection toolbar offers shape, color, connect, duplicate, and delete. Click a connection to change its label or direction. The bottom toolbar follows a familiar drawing-tool layout: keep-tool-active, hand, selection, rectangle, diamond, circle, arrow, line, pen, text, note, eraser, and More shapes. Click a shape to create it and edit its name immediately. Drag to draw arrows, lines, or pen strokes. Dragging an arrow between components creates an attached semantic connection; arrows with a free endpoint stay editable drawings. Stroke labels, colors, widths, and endpoints are editable. Erasing can be undone. Shortcuts: V, H, R, D, O, A, L, P, T, N, E. Numeric shape shortcuts remain available. Drag a selected corner to resize. Additional shapes under More include: rectangle, cylinder, circle, diamond, pill, hexagon, cloud, and triangle.

Dragging requires a held pointer button. Release outside the canvas ends the gesture; cancellation, capture loss, blur, and Escape roll it back. Hand/Space/middle-button panning takes priority over component/drawing selection. Ordinary wheel/trackpad scrolling pans; Ctrl/Cmd + wheel zooms around the pointer. Selection and name editing use separate interactions so dragging a label does not edit or attach it to the cursor.

**Review diagram** lists the current components and connections without rebuilding them. **Confirm diagram** records the current state locally, survives reload, and returns to Draft when the content, style, or positions change. Undo restores previous graph states.

## Blank projects

**New blank** stays visible in the header. The template browser also has **New blank project**. Either opens an empty canvas with empty source/change fields, separate undo history, and a unique project name. Previous projects remain saved and can be reopened from the project selector.

## Templates and verified references

The gallery keeps sixteen simple Auth0/Okta starting points, including regular web/mobile login, MFA, Attack Protection, Adaptive MFA, passwordless email/SMS, enterprise/social login, B2B Organizations, protected APIs, workforce SSO, directory/SCIM provisioning, HR lifecycle, and combined customer/workforce identity.

Two researched identity-flow collections add ten editable sequence templates, with numbered messages, participant lifelines, source documentation, source diagrams, and scope notes:

| Auth0 flows | Okta flows |
| --- | --- |
| Authorization Code | Authorization Code |
| Authorization Code + PKCE | Authorization Code + PKCE |
| Client Credentials | Client Credentials for your API |
| Device Authorization | Interaction Code |
| CIBA approval | Native SSO |

The definitions link the exact diagrams from official Auth0 and Okta guides, reviewed November 2, 2026. Repeated message pairs occupy separate numbered rows. Participants, message labels, directions, and step order remain editable. The message toolbar moves a step earlier or later. New participants keep existing positions; explicit before/after-login connections are placed relative to the sign-in steps when an anchor is available. An ambiguous text edit between a pair with multiple messages asks the user to select the numbered message rather than rewriting an arbitrary exchange.

Six additional Okta references cover SP-initiated SAML with a deep link, IdP-initiated SAML, inbound external IdP federation, SAML assertion-to-OAuth exchange, assertion inline hooks, and OAuth Org2Org provisioning. Each links official Okta documentation and a source diagram, with scope notes distinguishing an exact flow diagram from a broader overview adaptation. The Okta collection now has eleven references; all collections total thirty-six built-in templates.

A separate **Azure references** collection contains four editable logical adaptations:

| Reference | Microsoft documentation |
| --- | --- |
| Private, resilient App Service | https://learn.microsoft.com/en-us/azure/architecture/web-apps/app-service/architectures/baseline-zone-redundant |
| Web, queue, and background workers | https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/web-queue-worker |
| Hub-spoke hybrid network | https://learn.microsoft.com/en-us/azure/architecture/networking/architecture/hub-spoke |
| Protected public and internal APIs | https://learn.microsoft.com/en-us/azure/architecture/web-apps/api-management/architectures/protect-apis |

Each Azure definition requires a verified architecture diagram, the official documentation URL, the exact source-diagram URL, a review date, and a scope note explaining simplifications. Reviewed November 2, 2026. Cards link both sources; opened diagrams retain a Microsoft Learn link. Templates contain editable nodes and connections, not pasted images. Subnet and deployment internals are summarized where stated in the reference scope.

This is a curated local pattern library, not model training or a crawl of all Azure documentation. Pages without a verified diagram are not stored. References are opened explicitly through the gallery or commands such as `Use the Azure hub-spoke reference template`; normal descriptions do not inherit a reference stack.

## Reusable templates and local pattern memory

**Save template** stores the complete editable graph, custom drawings, and a preview under **My templates**. Opening it creates a separate project with new IDs and remapped connections. Saved templates are independent of later project changes. Remove can be undone from the gallery.

When enabled, confirming a diagram remembers up to twenty local examples. An exact normalized description can reuse the newest approved diagram, including corrections and layout. Similar wording offers an explicit suggestion and never silently expands a different customer's stack. Quantities are retained in matching keys. Manual templates can also opt into suggestions. **Storage** can disable memory or forget learned examples. This is example retrieval, not model training, and no customer data is pooled or sent to an AI service.

The parser additionally supports explicit named fan-out, event/data sending, group targets, and negated connection commands. Every member of a fan-out must resolve before it is connected. Autosave is debounced by 180 ms instead of serializing the workspace on every keystroke; preview SVGs are cached. Pen renders are coalesced to animation frames and drawing sizes are bounded. Generation is limited to sixty components and 120 semantic connections per diagram.

## Call workspace

Save a baseline before exploring a proposed system. The comparison lists additions, removals, renames, and the net connection change. Open the baseline as another project without replacing the proposal. Call notes hold decisions, questions, next steps, and owners; download a Markdown recap with the component and connection lists. This does not infer decisions or send follow-ups.

## Storage, backup, and authentication

Existing browser-local projects are preserved. Autosave writes localStorage with an IndexedDB recovery copy. Startup restores a newer recovery copy only when no new edits have been made. Both copies belong to the current browser and site origin. Clearing site data can remove both. Storage shows the recovery timestamp and offers a persistent-storage request, which remains subject to the browser's decision.

**Download offline backup** embeds projects, personal templates, and pattern memory into a standalone HTML copy. Opening the file bootstraps its workspace locally, merges missing items, preserves newer project records, and applies the portable snapshot once. No file-import controls or transcript workflow are exposed. Backup files contain the workspace data and are not an account-sync service.

PNG/SVG include custom drawings. Excalidraw export keeps custom arrows, lines, and pen marks editable. JSON export remains available as a project record. Generation makes no network requests and needs no model/API key.

Auth0 integration and cloud sync are not implemented in this version. Authentication alone will not save diagrams per profile. The next architecture is a browser app using Auth0, a token-validating backend, and a database storing project JSON against the validated issuer/subject identity. Cloudflare D1 has a free tier that can be evaluated for early use within its limits. Store application diagrams in the application store rather than Auth0 profile metadata.

References: [Auth0 user data storage](https://auth0.com/docs/secure/security-guidance/data-security/user-data-storage), [D1 pricing](https://developers.cloudflare.com/d1/platform/pricing/), and [D1 limits](https://developers.cloudflare.com/d1/platform/limits/).

## Checks

```sh
node scripts/test-engine.mjs
node scripts/test-narrative.mjs
node scripts/test-repairs.mjs
node scripts/test-conversation-links.mjs
node scripts/test-typed-workflow.mjs
node scripts/test-drawing-flows.mjs
node scripts/test-se-workspace.mjs
node scripts/test-human-language.mjs
node scripts/test-relationship-scope.mjs
node scripts/test-canvas-interactions.mjs
bash scripts/build.sh
node scripts/validate-artifact.mjs
```

Checks cover exact customer examples, generic database labels, custom names and quantities, contextual edits, sequential additions/connections, replacements, stable positions, connector routing, confirmation signatures, Azure aliases, all thirty-six template graphs, verified reference metadata, and absence of import controls. Narrative/transcript tests remain internal legacy engine regression coverage; transcript generation is not exposed in the product.

Explicit relationship scope is checked before retaining inferred identity fan-out. Quantified endpoints resolve by role and cardinality; singular references to multiple same-role nodes remain ambiguous. Unpunctuated repeated subject clauses are separated when a preceding relationship is present. A 51-case scope suite varies counts, app/service/API roles, platform choice and connection phrasing, plus shared identity and incremental group edits. These checks are bounded coverage, not universal language understanding.

## Structured request planning

Typing now passes through clause segmentation, a disposable discovery candidate, explicit reference binding, and plan execution before the visible graph is committed. The existing catalog/description parser remains a compatibility adapter, not a universal grammar. The plan records clause evidence and unresolved references and is available under Review diagram. Resolvable relationships proceed even when another clause needs clarification.

Resolution supports role groups with exclusions, ordinal components, and last-mentioned singular/group references within and across requests. Explicit `X is also called Y` aliases remain on the component and are saved locally; this is deterministic alias storage, not automatic model training. Explicit database ownership distinguishes per-application counts from shared stores, survives reload, and applies to later application additions. Repeated ownership instructions preserve IDs. Templates remap stored reference and policy IDs when cloned.

Run `node scripts/test-request-plan.mjs` for exclusions, ordinals, ownership, shared databases, contextual references, partial execution, aliases, and idempotency. Unsupported phrasing and ambiguous pronouns still require clarification.

## Identity vocabulary and editable features

A bounded domain catalog recognizes enterprise/ENT login and connections, SSO/single sign-on, MFA/2FA, Adaptive MFA, passwordless, passkeys, Universal Login, Attack Protection and its named defenses, FastPass, ThreatInsight, Identity Threat Protection, SCIM provisioning, Lifecycle Management, Organizations and RBAC. These are diagram concepts; recognition does not assert licensing, tenant configuration or universal platform compatibility. Unknown terms may still need clarification.

Enterprise and social connections use generic provider nodes when the provider is unspecified; the engine does not invent Entra ID, Google, SAML, or OIDC. `Enterprise connection in Auth0`, `Enable single sign-on on Auth0`, and `Disable MFA on Okta` work in the change box. SPA is a distinct named application.

Attached capabilities remain part of their platform. They stack below the platform by default, within a subtle grouping frame. Click a badge to edit its label and color, drag it independently, reset its position, or remove it; double-click focuses its name field. Labels, offsets, colors, undo and saved templates retain the customization. The original canonical capability key is retained for text-based enable/disable commands even after renaming the visible label. Fit/export bounds and connector routing include the badge geometry. Excalidraw exports badges as separate editable shapes and text.

Vocabulary references reviewed November 2, 2026: [Auth0 Enterprise Connections](https://auth0.com/docs/authenticate/enterprise-connections), [Auth0 SSO](https://auth0.com/docs/authenticate/single-sign-on), [Auth0 Attack Protection](https://auth0.com/docs/secure/attack-protection), [Okta FastPass](https://help.okta.com/oie/en-us/content/Topics/identity-engine/devices/fp/fp-main.htm), [Okta ThreatInsight](https://help.okta.com/oie/en-us/content/topics/security/threat-insight/ti-index.htm), [Okta SCIM](https://developer.okta.com/docs/guides/scim-provisioning-integration-overview/).

Run `node scripts/test-identity-vocabulary.mjs` for domain aliases, provider neutrality, feature defaults and custom geometry.


### Direct customization and AI vocabulary (November 3, 2026)

Select a component or line once to open its style panel. Change stroke/background/text colors, stroke width/style, text size, opacity, corners (components), or order within its object layer. Duplicate, clear just the text, or delete the object. Double-click or Edit text opens the inline editor; the inline connector editor also provides Clear text and Delete line. Delete/Backspace deletes the selected object when focus is outside a text field; Undo restores it. Styles persist in browser projects and SVG/PNG output; editable Excalidraw exports preserve primary stroke/fill/opacity styles.

The local catalog recognizes AI agents, MCP servers/clients, Token Vault, Auth for MCP, Auth0 Actions, Management/Authentication APIs, log streams, RAG pipelines, vector databases, first/third-party APIs, CIBA approval, token exchange, connected accounts, refresh token rotation, session protection, step-up authentication, DPoP, PKCE, lazy migration, and home realm discovery. Token Vault is represented as a separate component in generated descriptions rather than duplicated as a badge. Saved older projects retain their existing objects.

Catalog aliases now resolve consistently in component discovery, quantities, and follow-up commands. AI/MCP groups support complete-group references. Conversational clauses such as “speaks to”, “reaches out to”, “hooks into”, and “relies on” normalize to supported relationships, with quoted names protected. Unspecified connections remain unspecified; this is bounded language parsing, not model training or an implementation/configuration validator. No API key or inference service is used.

Official references checked: [Auth0 for AI Agents](https://auth0.com/docs/get-started/auth0-for-ai-agents), [Token Vault](https://auth0.com/docs/secure/call-apis-on-users-behalf/token-vault), [CIBA](https://auth0.com/docs/get-started/authentication-and-authorization-flow/client-initiated-backchannel-authentication-flow).

Regression checks: `node scripts/test-ai-editor.mjs` plus the existing parser and gesture suites.
