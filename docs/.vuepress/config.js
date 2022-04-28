module.exports = {
  title: 'Blog',
  description: 'Blog',
  base:'/blog',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '个人介绍',
        items: [
          { text: '掘金', link: 'https://juejin.cn' },
          { text: '简书', link: 'https://juejin.cn' }
        ]
      }
    ],
    sidebar:[
      {
        title:'欢迎学习',
        path:'/',
        collapsable: false,
        children:[
          {title:'必读',path:'/'}
        ]
      },{
        title:'基础学习',
        path:'/javascript/dataTypes',
        collapsable:false,
        children:[
          {title:'数据类型',path:'/javascript/dataTypes'}
        ]
      }
    ]
  }
}
