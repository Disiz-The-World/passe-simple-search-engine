#!/bin/env bash

(cd ./passe-simple-search-engine && ng serve) &
(cd ./backend && npx json-server db.json --static public) &
wait
