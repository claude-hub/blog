/*
 * @Author: zhangyunpeng@sensorsdata.cn
 * @Description: 
 * @Date: 2024-03-27 10:50:01
 * @LastEditTime: 2024-04-08 16:01:20
 */
const chalk = require('chalk');
const simpleGit = require('simple-git');
const fs = require('fs');
const shell = require('shelljs');

const gitAdd = async () => {
  await simpleGit().add('.');
}

const gitCommit = async () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  // 获取月份，注意月份是从0开始的，所以需要加1
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  // 格式化月份和日期，确保它们至少有两位数
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedDay = day < 10 ? `0${day}` : day;

  // 按照指定的格式组合年月日
  const message = `${year}/${formattedMonth}/${formattedDay}`;

  console.log(chalk.green(`gitCommit ${message}`));
  try {
    await simpleGit().commit(message);
  } catch (e) {
    console.log(chalk.red(`gitCommit ${e?.message}`));
    process.exit(1);
  }
}

const gitPush = async () => {
  try {
    await simpleGit().push();
  } catch (e) {
    console.log(chalk.red(`gitPush ${e?.message}`));
    process.exit(1);
  }
}

// diff md 文件
const gitDiffFiles = async () => {
  try {
    const { files } = await simpleGit().diffSummary(['--staged']);
    const changedFiles = files.map(item => item.file);
    console.log(chalk.green(`gitDiff ${changedFiles.join('\n')}`));
    return changedFiles;
  } catch (e) {
    console.log(chalk.red(`gitDiff ${e?.message}`));
    process.exit(1);
  }
};

// 替换 url
const replaceImgUrl = async (file) => {
  try {
    if (!file.endsWith('.md')) return;
    const contents = fs.readFileSync(file, 'utf-8');
    // 替换
    // https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main/
    const replaced = contents.replace(/https:\/\/raw.githubusercontent.com\/claude-hub\/cloud-img\/main/g, 'https://cdn.jsdelivr.net/gh/claude-hub/cloud-img@main');

    fs.writeFileSync(file, replaced, 'utf-8');
  } catch (e) {
    console.log(chalk.red(`replace failed ${e?.message}`));
  }
}

// 处理文件
const replaceFiles = async (files) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    await replaceImgUrl(file);
  }
}

(async () => {
  console.log(chalk.green('----start----'));

  // 同步，执行代理
  shell.exec('export all_proxy=http://127.0.0.1:7890');

  // 1. add files
  await gitAdd();
  // 2. diff 缓存区的 md 文件
  const files = await gitDiffFiles();

  if (files.length > 0) {
    // 3. 替换图片 url
    await replaceFiles(files);
    // 4. 修改了文件后，再次添加
    await gitAdd();
    // 5. 提交代码
    await gitCommit();
  }

  // 6. push远程
  await gitPush();

  console.log(chalk.green('----end----'));
})()
