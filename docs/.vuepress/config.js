const fs = require('fs');
const path = require('path');

process.env.TZ = 'Asia/Shanghai';

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
    // // Google adsense
    // ['meta', {
    //   name: 'google-adsense-account',
    //   content: 'ca-pub-6215606311487003'
    // }],
    // // Google adsense
    // ['script', {
    //   async: 'async',
    //   src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6215606311487003',
    //   crossorigin: 'anonymous',
    // }],
    // // Google adsense 文章广告单元
    // ['script', {},
    //   `window['addAds'] = function(){
    //       (adsbygoogle = window.adsbygoogle || []).push({});
    //   }`],


    // 1. 将此代码粘贴到网页的 <head> 中尽可能靠上的位置：
    // <!-- Google Tag Manager -->
    // <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    // new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    // j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    // 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    // })(window,document,'script','dataLayer','GTM-K48SQ9HQ');</script>
    // <!-- End Google Tag Manager -->

    // 2. 请将此代码粘帖到紧跟起始 <body> 标记之后的位置
    // <!-- Google Tag Manager (noscript) -->
    // <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-K48SQ9HQ"
    // height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    // <!-- End Google Tag Manager (noscript) -->

    // GTM
    // [
    //   'script', {},
    //   `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    //     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    //     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    //     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    //     })(window,document,'script','dataLayer','GTM-K48SQ9HQ')
    //   `
    // ],



    // <!-- Google tag (gtag.js) -->
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-LV493ER5K4"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());

    //   gtag('config', 'G-LV493ER5K4');
    // </script>

    // <!-- Google tag (gtag.js) -->
    // <script async src="https://www.googletagmanager.com/gtag/js?id=G-K74LKS85ZB"></script>
    // <script>
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());

    //   gtag('config', 'G-K74LKS85ZB');
    // </script>

    // <!-- Google tag (gtag.js) -->
    // ['script', {
    //   async: 'async',
    //   src: 'https://www.googletagmanager.com/gtag/js?id=G-K74LKS85ZB',
    //   crossorigin: 'anonymous',
    // }],
    // [
    //   'script', {},
    //   `
    //     window.dataLayer = window.dataLayer || [];
    //     function gtag(){dataLayer.push(arguments);}
    //     gtag('js', new Date());
    //     gtag('config', 'G-K74LKS85ZB');
    //   `
    // ]
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
        text: '前端知识',
        link: '/knowledge/00.HTML/00.概览',
      },
      {
        text: '前端周刊',
        link: '/articles/',
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
          {
            text: '2024',
            link: '/interview/2024/00.知识点',
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
          title: '前端周刊',
          collapsable: false, // 下级列表不可折叠
          sidebarDepth: 0,
          children: readFolder(path.resolve(__dirname, '../articles')),
        },
      ],
      '/interview/2024/': [
        {
          title: '知识图谱',
          sidebarDepth: 2,
          // children: [
          //   ['知识点', '前端知识点'],
          // ],
          children: readFolder(path.resolve(__dirname, '../interview/2024')),
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
