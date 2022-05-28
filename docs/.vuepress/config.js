module.exports = {
  title: '繁华落尽是沧桑',
  base: '/',
  descritption: '前端知识栈',
  theme: 'reco',
  themeConfig: {
    // 博客配置
  },
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  port: '9000',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['link', { href: 'https://cdn.jsdelivr.net/npm/@docsearch/css@3', rel: 'stylesheet' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/@docsearch/js@3' }],
    [
      'script',
      {},
      `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?54b706f821d7e9d401602d910ffb726d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();   
      `
    ]
  ],
  themeConfig: {
    type: 'blog',
    author: 'wangtao',
    authorAvatar: '/avatar.jpeg',
    // 导航栏配置
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      { text: '面试', link: '/interview/' },
      // { text: '前端框架', link: '/framework/Vue' },
      {
        text: '前端技术',
        items: [
          { text: 'TypeScript', link: 'https://www.tslang.cn/' },
          { text: 'Vue.js', link: 'https://cn.vuejs.org/' },
          { text: 'React', link: 'https://react.docschina.org/' },
          { text: 'Vuepress', link: 'https://vuepress.vuejs.org/zh/' }
        ]
      },
      {
        text: 'UI组件库',
        items: [
          { text: 'Element UI', link: 'https://element.eleme.cn/#/zh-CN' },
          {
            text: 'Element Plus',
            link: 'https://element-plus.gitee.io/#/zh-CN/'
          },
          {
            text: 'Ant Design Vue',
            link: 'https://www.antdv.com/docs/vue/introduce-cn/'
          },
          { text: 'Vant', link: 'https://vant-contrib.gitee.io/vant/#/zh-CN/' }
        ]
      }
    ],
    // 侧边栏配置
    sidebar: {
      '/interview/': [
        {
          title: 'Vue',
          path: '/interview/vue'
          // children:[
          //   {title}
          // ]
        },
        {
          title: 'Javascript',
          path: '/interview/js'
        }
      ],
      '/guide/': [
        {
          title: 'Javascript',
          children: [
            { title: '数据类型', path: '/guide/javascript/dataType' },
            { title: '防抖与节流', path: '/guide/javascript/debounce' },
            { title: '函数柯里化', path: '/guide/javascript/curry' },
            { title: 'valueOf / toString', path: '/guide/javascript/valueOf' }
          ]
        },
        {
          title: 'Vue',
          children: [
            { title: 'axios封装', path: '/guide/vue/axios' },
            { title: '高德地图应用', path: '/guide/vue/amap' },
            { title: 'websocket消息通知', path: '/guide/vue/websocket' },
            { title: 'Vue复习', path: '/guide/vue/reStudyVue' }
          ]
        },
        {
          title: '开发环境',
          children: [
            { title: 'SSH key 配置', path: '/guide/system/ssh' },
            { title: 'node版本管理-nvm', path: '/guide/system/nvm' }
          ]
        },
        {
          title: '网络',
          children: [{ title: 'XSS、XSRF 网络安全', path: '/guide/network/xss' }]
        },
        {
          title: '小程序',
          children: [
            { title: '微信JSSDK', path: '/guide/miniprogram/wechat' },
            { title: '小程序全局样式', path: '/guide/miniprogram/globalCss' }
          ]
        },
        {
          title: '代码规范',
          collapsable: true,
          children: [
            { title: '命名规则', path: '/guide/specification/' },
            { title: 'Js编写规范', path: '/guide/specification/js' },
            { title: 'Vue编写规范', path: '/guide/specification/vue' },
            { title: 'Eslint规范', path: '/guide/specification/Eslint' },
            { title: 'Commit规范', path: '/guide/specification/commitLint' },
            { title: 'Prettier', path: '/guide/specification/prettier' }
          ]
        },
        {
          title: '算法',
          children: [{ title: 'leetCode Hot 100', path: '/guide/LeetCode/leetcode' }]
        }
      ]
    },
    markdown: {
      lineNumbers: true,
      toc: { includeLevel: [2, 3] }
    },
    lastUpdated: 'Last Updated',
    plugins: [
      [
        'vuepress-plugin-nuggets-style-copy',
        {
          copyText: '复制代码',
          tip: {
            content: '复制成功!'
          }
        }
      ],
      [
        '@vuepress/google-analytics',
        {
          ga: 'G-STRHV338JN' // UA-00000000-0
        }
      ],
      '@vuepress/back-to-top'
    ],
    blogConfig: {
      // tag: {
      //   location: -1, // 在导航栏菜单中所占的位置，默认3
      //   text: 'Tag' // 默认文案 “标签”
      // }
    },
    // 备案
    record: ' 繁华落尽是沧桑',
    recordLink: 'http://www.beppo.fun',
    cyberSecurityRecord: '豫ICP备20001334号-1',
    cyberSecurityLink: '',
    valineConfig: {
      avatar: 'wavatar',
      appId: '6vo03jHeHlUIU8WjdtuuMWLi-gzGzoHsz', // your appId
      appKey: 'oMaM11IWapIMW4G2JXPa6nxC' // your appKey
    }
  }
};
