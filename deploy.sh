#!/usr/bin/env sh
set -e
npm run build
cd docs/.vuepress/dist

git init
git config user.name "BeppoWang"
git config user.email "beppowang@gmail.com"

git add -A
git commit -m 'deploy'

git push -f git@beppo.github.com:BeepoWang/blog.git master:gh-pages
cd -
