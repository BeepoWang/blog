module.exports = {
  title: '繁华落尽是沧桑',
  base: '/',
  descritption: '前端知识栈',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  port: '9000',
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
    ['meta', { name: 'baidu-site-verification', content: 'code-CeXCMZga34' }],
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
  plugins: [
    // 自动生成侧边栏的插件
    [
      'vuepress-plugin-auto-sidebar',
      {
        collapse: {
          open: true
        }
      }
    ],
    // 代码复制
    [
      'vuepress-plugin-nuggets-style-copy',
      {
        copyText: '复制代码',
        tip: {
          content: '复制成功!'
        }
      }
    ],
    ['vuepress-plugin-boxx'],
    // 谷歌分析
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-228936572-1' // UA-00000000-0
      }
    ],
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return new Date(timestamp).toLocaleDateString();
        }
      }
    ],
    // 樱花飘落效果
    // [
    //   'sakura',
    //   {
    //     num: 20,
    //     show: true, //  是否显示
    //     zIndex: -1, // 层级
    //     img: {
    //       replace: false // false 默认图 true 换图 需要填写httpUrl地址
    //     }
    //   }
    // ],
    // 鼠标动效
    [
      'cursor-effects',
      {
        size: 2, // size of the particle, default: 2
        shape: 'circle', // shape of the particle, default: 'star'
        zIndex: 999999999 // z-index property of the canvas, default: 999999999
      }
    ],
    // 背景彩带
    [
      'ribbon-animation',
      {
        size: 90, // 默认数据
        opacity: 0.3, //  透明度
        zIndex: -1, //  层级
        opt: {
          // 色带HSL饱和度
          colorSaturation: '80%',
          // 色带HSL亮度量
          colorBrightness: '50%',
          // 带状颜色不透明度
          colorAlpha: 0.65,
          // 在HSL颜色空间中循环显示颜色的速度有多快
          colorCycleSpeed: 6,
          // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
          verticalPosition: 'random',
          // 到达屏幕另一侧的速度有多快
          horizontalSpeed: 200,
          // 在任何给定时间，屏幕上会保留多少条带
          ribbonCount: 2,
          // 添加笔划以及色带填充颜色
          strokeSize: 0,
          // 通过页面滚动上的因子垂直移动色带
          parallaxAmount: -0.5,
          // 随着时间的推移，为每个功能区添加动画效果
          animateSections: true
        },
        ribbonShow: false, //  点击彩带  true显示  false为不显示
        ribbonAnimationShow: true // 滑动彩带
      }
    ],
    // sitemap
    [
      'sitemap',
      {
        hostname: 'https://www.beppo.fun'
      }
    ],
    // 回到顶部
    'go-top'
  ],
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    type: 'blog',
    mode: 'dark',
    author: 'wangtao',
    authorAvatar: '/avatar.jpeg',
    // 导航栏配置
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      { text: '面试', link: '/interview/' },
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
    lastUpdated: 'Last Updated',
    algolia: {
      apiKey: '3edfd4b716cabbdd5011b132f924b4bc',
      indexName: 'beppo',
      // 如果 Algolia 没有为你提供 `appId` ，使用 `BH4D9OD16A` 或者移除该配置项
      appId: 'MTD6SONHRQ'
    },
    // 备案
    record: ' 繁华落尽是沧桑',
    recordLink: 'http://www.beppo.fun',
    cyberSecurityRecord: '豫ICP备20001334号',
    cyberSecurityLink: '',
    valineConfig: {
      avatar: 'wavatar',
      appId: '6vo03jHeHlUIU8WjdtuuMWLi-gzGzoHsz', // your appId
      appKey: 'oMaM11IWapIMW4G2JXPa6nxC' // your appKey
    }
  }
};
