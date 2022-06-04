// import vueCanvas from 'vue-canvas-effect';

export default ({ router, Vue, options }) => {
  // Vue.use(vueCanvas);

  let words = '朝罢从容归陋院,喜看旭日散晴辉';
  let author = '何乔新';
  const fetchWords = () => {
    fetch('https://v1.hitokoto.cn?c=d&c=i&c=k')
      .then((response) => response.json())
      .then((data) => {
        words = data.hitokoto || '朝罢从容归陋院,喜看旭日散晴辉';
        author = data.from_who || '何乔新';
      })
      .catch(console.error);
  };

  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== 'undefined') {
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath]);
      }
    }
    // fetchWords();

    next();
  });

  router.afterEach((to, from) => {
    // to.meta.words = words;
    // to.meta.author = author;
  });

  Vue.mixin({
    mounted() {
      // import('vue-canvas-effect').then(function (m) {
      //   Vue.use(m.Bubbles); // 引入组件
      // });
      // 不加 setTimeout 会有报错，但不影响效果
      setTimeout(() => {
        try {
          docsearch({
            appId: 'MTD6SONHRQ',
            apiKey: '3edfd4b716cabbdd5011b132f924b4bc',
            indexName: 'beppo',
            container: '.search-box',
            debug: false
          });
        } catch (e) {
          console.log(e);
        }
      }, 100);
    }
  });
};
