#!/bin/bash

set -e

npm run build

cd dist

git add -A
git commit -m "deploy"
git push -f git@github.com:Thr0TT1e/store-tekhnozavrrr.git master:gh-pages

cd -

rm -rf dist