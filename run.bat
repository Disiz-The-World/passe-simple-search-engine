@echo off
setlocal

set ROOT=%~dp0

start cmd /k "cd /d %ROOT%passe-simple-search-engine && npm install && ng serve"
start cmd /k "cd /d %ROOT%backend && npm install && npx json-server db.json --static public"

