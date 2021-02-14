#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布gitee, 访问地址: gitt
git push -f https://gitee.com/claude-gitee/claude-gitee.git master

cd -