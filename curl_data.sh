#!/bin/bash
mkdir data
curl http://media.mongodb.org/zips.json > data/zips.json
curl https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/dataset.json > data/rest.json

mongoimport --db test --collection rest --drop --file data/rest.json
mongoimport --db test --collection zips --drop --file data/zips.json
