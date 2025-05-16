@echo off
start cmd /k "cd passe-simple-search-engine && npm install && ng serve"
start cmd /k "cd backend && npm install && npx json-server db.json --static public"

