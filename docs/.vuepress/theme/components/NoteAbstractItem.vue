<template>
  <div class="abstract-item draw" @click="$router.push(item.path)">
    <reco-icon v-if="item.frontmatter.sticky" icon="reco-sticky" />
    <div class="title">
      <reco-icon v-if="item.frontmatter.keys" icon="reco-lock" />
      <router-link :to="item.path">{{ item.title }}</router-link>
    </div>
    <div class="abstract" v-html="item.excerpt"></div>
    <PageInfo :pageInfo="item" :currentTag="currentTag"> </PageInfo>
  </div>
</template>

<script>
  import { defineComponent } from 'vue-demi';
  import { RecoIcon } from '@vuepress-reco/core/lib/components';
  import PageInfo from './PageInfo';
  export default defineComponent({
    components: { PageInfo, RecoIcon },
    props: ['item', 'currentPage', 'currentTag']
  });
</script>

<style lang="stylus" scoped>
  .abstract-item
    position relative
    margin: 0 auto 20px;
    padding: 16px 20px;
    width 100%
    overflow: hidden;
    border-radius: $borderRadius
    box-shadow: var(--box-shadow);
    box-sizing: border-box;
    transition all .3s
    background-color var(--background-color)
    cursor: pointer;
  
    > * {
      pointer-events: auto;
    }
    .reco-sticky
      position absolute
      top 0
      left 0
      display inline-block
      color $accentColor
      font-size 2.4rem
    &:hover
      box-shadow: var(--box-shadow-hover)
    .title
      position: relative;
      font-size: 1.28rem;
      line-height: 46px;
      display: inline-block;
      a
        color: var(--text-color);
      .reco-lock
        font-size 1.28rem
        color $accentColor
      &:after
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: $accentColor;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        transition: .3s ease-in-out;
      &:hover a
        color $accentColor
      &:hover:after
        visibility visible
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
    .tags
      .tag-item
        &.active
          color $accentColor
        &:hover
          color $accentColor
  @media (max-width: $MQMobile)
    .tags
      display block
      margin-top 1rem;
      margin-left: 0!important;
</style>
<style scoped>
  .draw::before {
    top: 0;
    left: 0;
  }
  .draw::after {
    bottom: 0;
    right: 0;
  }
  .draw:hover {
    color: #60daaa;
  }
  .draw:hover::before,
  .draw:hover::after {
    width: 100%;
    height: 100%;
  }
  .draw:hover::before {
    border-top-color: #60daaa;
    border-right-color: #60daaa;
    transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
  }
  .draw:hover::after {
    border-bottom-color: #60daaa;
    border-left-color: #60daaa;
    transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s,
      height 0.25s ease-out 0.75s;
  }
  .meet:hover {
    color: #fbca67;
  }
  .meet::after {
    top: 0;
    left: 0;
  }
  .meet:hover::before {
    border-top-color: #fbca67;
    border-right-color: #fbca67;
  }
  .meet:hover::after {
    border-bottom-color: #fbca67;
    border-left-color: #fbca67;
    transition: height 0.25s ease-out, width 0.25s ease-out 0.25s;
  }
  .center:hover {
    color: #6477b9;
  }
  .center::before,
  .center::after {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  .center::before {
    border-top: 2px solid #6477b9;
    border-bottom: 2px solid #6477b9;
    -webkit-transform: scale3d(0, 1, 1);
    transform: scale3d(0, 1, 1);
  }
  .center::after {
    border-left: 2px solid #6477b9;
    border-right: 2px solid #6477b9;
    -webkit-transform: scale3d(1, 0, 1);
    transform: scale3d(1, 0, 1);
  }
  .center:hover::before,
  .center:hover::after {
    -webkit-transform: scale3d(1, 1, 1);
    transform: scale3d(1, 1, 1);
    transition: transform 0.5s, -webkit-transform 0.5s;
  }
</style>
