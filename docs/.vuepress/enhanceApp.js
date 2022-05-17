export default ({ router, Vue, isServer }) => {
  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== 'undefined') {
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath]);
      }
    }

    next();
  });
  Vue.mixin({
    mounted() {
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
