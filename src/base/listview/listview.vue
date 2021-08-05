<template>
  <div class="listview">
    <ul>
      <li v-for="(value,key) in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{ key }}</h2>
        <uL>
          <li v-for="item in value" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item">{{ item }}
        </li>
      </ul>
    </div>
    <!--    <div class="list-fixed" ref="fixed" v-show="fixedTitle">-->
    <!--      <div class="fixed-title">{{fixedTitle}} </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import {getData} from "@/common/js/dom";

export default {
  name: "listview",
  props: {
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    shortcutList() {
      return Object.keys(this.data).map(item => item.substr(0, 1));
    }
  },
  methods: {
    onShortcutTouchStart(e) {
      const idx = getData(e.target, "index");
      const height = this.calScrollHeight(idx);
      window.scrollTo({
        top: height,
        behavior: "smooth"
      });
    },
    calScrollHeight(index) {
      // 如 热门 + 歌手(12个) + pd 高度
      const height = index * 30 + 12 * 70 * index + index * 30 + 88;
      return height;
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background

  .list-group
    padding-bottom: 30px

    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background

    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px

      .avatar
        width: 50px
        height: 50px
        border-radius: 50%

      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium

  .list-shortcut
    position: fixed
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d

    .item
      padding: 3px
      color: $color-text-l
      font-size: $font-size-small

      &.current
        color: $color-theme

  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%

    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background

  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
