module.exports = {
  title: '前端进阶手册',
  description: '前端进阶',

  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }]
  ],

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    logo: '/logo.svg',
    lastUpdated: '上次更新',
    nav: [{
        text: '首页',
        link: '/',
      },
      {
        text: '前端知识',
        link: '/knowledge/CSS/'
      },
      {
        text: '面试题',
        items: [{
          text: '前端相关',
          link: '/interview/frontend/CSS'
        }, {
          text: '计算机相关',
          link: '/interview/computer/HTTP'
        }]
      },
      {
        text: '算法',
        items: [{
          text: 'LeetCode',
          link: '/algorithm/LeetCode/'
        }]
      },
      {
        text: '设计模式',
        link: '/design/Factory/'
      },
      {
        text: '其他',
        link: '/others/ImgURL/',
      },
      {
        text: 'Github',
        items: [{
            text: '博客',
            link: 'https://github.com/claude-hub/MyDream'
          },
          {
            text: 'React原理',
            link: 'https://github.com/claude-hub/build-my-own-react'
          }
        ]
      },
    ],
    sidebar: {
      '/knowledge/': [{
        title: '前端知识',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['CSS', 'CSS 相关'],
          ['JS', 'JS 相关'],
        ]
      }],
      '/interview/frontend/': [{
        title: '前端相关',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['CSS', 'CSS面试题'],
          ['JS', 'JS面试题'],
        ]
      }],
      '/interview/computer/': [{
        title: '计算机相关',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['HTTP', 'HTTP面试题'],
        ]
      }],
      '/algorithm/': [{
        title: '算法',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          'LeetCode',
        ]
      }],
      '/design/': [{
        title: '设计模式',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['Factory', '工厂模式'],
        ]
      }],
      '/others/': [{
        title: '其他',
        collapsable: false,
        sidebarDepth: 2,
        children: [
          ['ImgURL', '图床'],
        ]
      }],
    }
  },

  plugins: [
    ['@vuepress/back-to-top', true],
  ]
}
