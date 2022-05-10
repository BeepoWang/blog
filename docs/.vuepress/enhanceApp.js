export default ({ router, Vue, isServer }) => {
  Vue.mixin({
    mounted() {
      // 不加 setTimeout 会有报错，但不影响效果
      setTimeout(() => {
        try {
          docsearch({
            appId: "HVQRIKLSFA",
            apiKey: "962f6732c6ad91fae5ce51ea30ece411",
            indexName: "blog",
            container: '.search-box',
            debug: false
          });
        } catch(e) {
          console.log(e);
        }
      }, 100)
    },
  });
};
