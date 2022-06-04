<template>
  <div class="words-box">
    <p>{{ words }}</p>
    <p>{{ author }}</p>
  </div>
</template>

<script>
  import { defineComponent, computed, toRefs, ref, onMounted } from 'vue-demi';

  export default defineComponent({
    props: {
      times: {
        type: number
      }
    },
    setup(props, ctx) {
      const interval = null;
      let words = ref('');
      let author = ref('');

      const fetchWords = () => {
        fetch('https://v1.hitokoto.cn?c=d&c=i&c=k')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            words.value = data.hitokoto;
            author.value = data.from_who;
          })
          .catch(console.error);
      };

      const dynamicUpdateWords = (times) => {
        if (props.times) {
          clearInterval(interval);
          interval = setInterval(() => {
            fetchWords();
          }, times);
        }
      };

      onMounted(() => {
        fetchWords();
        props.times && this.dynamicUpdateType(props.times);
      });

      return {
        words,
        author
      };
    }
  });
</script>
