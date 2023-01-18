#!/usr/bin/env sh

set -e

push_addr=`git remote get-url --push origin` 
commit_info=`git describe --all --always --long`
dist_path=.dist
tmp_path=.tmp
push_branch=gh-pages

# 生成静态文件
npm run publish

cd $dist_path

git init
git add -A
git commit -m "deploy, $commit_info"
git push -f $push_addr HEAD:$push_branch

cd -
rm -rf $dist_path
rm -rf $tmp_path
