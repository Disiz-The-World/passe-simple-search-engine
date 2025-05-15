#!/bin/env bash

(cd ./passe-simple-search-engine && npm install && ng serve) &
(cd ./backend && npm install && npx json-server db.json --static public) &
wait
