const fs = require('fs');
const path = require('path');

// 查找指定文件夹下面的文件夹
const readSubFolders = (folder) => {
  const isExist = fs.existsSync(folder);
  if (!isExist) return [];

  const files = fs.readdirSync(folder);
  return files.filter(item => {
    const fPath = path.join(folder, item);
    const stat = fs.statSync(fPath);
    if (stat.isDirectory() === true) {
      return true
    }
    return false
  })
}

const readFolder = (folder, folderName = '') => {
  const realPath = folderName ? `${folderName}/` : '';

  const isExist = fs.existsSync(folder);
  if (!isExist) return [];

  const files = fs.readdirSync(folder);

  return files.map((item) => {
    const fPath = path.join(folder, item);
    const stat = fs.statSync(fPath);
    if (stat.isDirectory() || !item.endsWith('.md')) {
      return false
    }
    let title = item.replace('.md', '');
    if (title.charAt(2) === '.') {
      title = title.substring(3);
    }

    if (title === 'README') {
      return ['', '汇总'];
    }
    return [`${realPath}${item}`, title];
  }).filter(item => item);
};

const knowledgeFolder = path.resolve(__dirname, '../knowledge');

const knowledge = readSubFolders(knowledgeFolder).map(item => {
  let title = item;
  if (title.charAt(2) === '.') {
    title = title.substring(3);
  }
  return {
    title,
    sidebarDepth: 0,
    children: readFolder(path.join(knowledgeFolder, item), item),
  }
})

module.exports = {
  title: '前端进阶手册',
  description: '前端进阶',

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico',
      },
    ],
  ],

  // markdown: {
  //   lineNumbers: true
  // },

  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: '上次更新',
    nav: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '文章',
        link: '/articles/',
      },
      {
        text: '前端知识',
        link: '/knowledge/00.HTML/00.DOCTYPE',
      },
      {
        text: '面试题',
        items: [
          {
            text: '前端相关',
            link: '/interview/frontend/CSS',
          },
          {
            text: '计算机相关',
            link: '/interview/computer/HTTP',
          },
          {
            text: '文章',
            link: '/interview/articles/',
          },
          {
            text: '面经',
            link: '/interview/experience/',
          },
        ],
      },
      // {
      //   text: '工程化',
      //   link: '/engineer/'
      // },
      {
        text: '工具库',
        link: '/utils/Function/',
      },
      // {
      //   text: '算法',
      //   items: [{
      //     text: 'LeetCode',
      //     link: '/algorithm/LeetCode/'
      //   }]
      // },
      // {
      //   text: '设计模式',
      //   link: '/design/Factory/'
      // },
      {
        text: '其他',
        link: '/others/ImgURL/',
      },
      {
        text: 'Github',
        items: [
          {
            text: '博客',
            link: 'https://github.com/claude-hub/MyDream',
          },
          {
            text: 'React原理',
            link: 'https://github.com/claude-hub/build-my-own-react',
          },
        ],
      },
    ],
    sidebar: {
      '/knowledge/': [
        ...knowledge,
        {
          title: '框架相关',
          sidebarDepth: 1,
          children: readFolder(path.resolve(__dirname, '../knowledge')),
        },
      ],
      '/articles/': [
        {
          title: '文章',
          collapsable: false, // 下级列表不可折叠
          sidebarDepth: 0,
          children: readFolder(path.resolve(__dirname, '../articles')),
        },
      ],
      '/interview/frontend/': [
        {
          title: '前端相关',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['CSS', 'CSS面试题'],
            ['JS', 'JS面试题'],
            ['React', 'React面试题'],
            ['Webpack', 'Webpack面试题'],
          ],
        },
      ],
      '/interview/computer/': [
        {
          title: '计算机相关',
          collapsable: false,
          sidebarDepth: 2,
          children: [['HTTP', 'HTTP面试题']],
        },
      ],
      '/interview/articles/': [
        {
          title: '文章',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['', '汇总'],
            [
              '高频前端开发面试问题及答案整理',
              '高频前端开发面试问题及答案整理',
            ],
          ],
        },
      ],
      '/interview/experience/': [
        {
          title: '面经',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['', '汇总'],
            ['2021.2.18', '2021.2.18'],
            ['2021.2.24', '2021.2.24'],
          ],
        },
      ],
      '/utils/': [
        {
          title: '工具库',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['Function', '函数相关'],
            ['Array', '数组相关'],
          ],
        },
      ],
      '/algorithm/': [
        {
          title: '算法',
          collapsable: false,
          sidebarDepth: 2,
          children: ['LeetCode'],
        },
      ],
      '/design/': [
        {
          title: '设计模式',
          collapsable: false,
          sidebarDepth: 2,
          children: [['Factory', '工厂模式']],
        },
      ],
      '/others/': [
        {
          title: '其他',
          collapsable: false,
          sidebarDepth: 2,
          children: [
            ['ImgURL', '图床'],
            ['SSR', 'SSR'],
            ['微信反编译工具', '微信反编译工具'],
            ['Mac命令大全', 'Mac命令大全'],
          ],
        },
      ],
    },
  },

  plugins: [['@vuepress/back-to-top', true]],
};
