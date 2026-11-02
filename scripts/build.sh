#!/usr/bin/env bash
set -euo pipefail
project_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
rm -rf "$project_root/dist"
mkdir -p "$project_root/dist"
cp "$project_root/index.html" "$project_root/dist/index.html"
