#!/bin/bash
curl http://media.mongodb.org/zips.json > zips.json
curl https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/dataset.json > rest.json

mongoimport --db test --collection rest --drop --file rest.json
mongoimport --db test --collection zips --drop --file zips.json
