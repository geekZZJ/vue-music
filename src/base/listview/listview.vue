<template>
  <div class="listview">
    <ul>
      <li v-for="(value,key) in data" class="list-group">
        <h2 class="list-group-title">{{ key }}</h2>
        <uL>
          <li @click="selectItem(item)" v-for="item in value" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </uL>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.prevent.stop="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" :data-index="index" class="item"
            :class="{'current':currentIndex===index}">{{ item }}
        </li>
      </ul>
    </div>
    <transition>
      <div class="list-fixed" v-show="showFixedTitle">
        <div class="fixed-title">{{ fixedTitle }}</div>
      </div>
    </transition>
  </div>
</template>

<script>
import {getData} from "@/common/js/dom";
import _ from "lodash";

export default {
  name: "listview",
  props: {
    data: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      anchorHeight: 18,
      currentIndex: 0,
      showFixedTitle: false
    };
  },
  computed: {
    shortcutList() {
      return Object.keys(this.data).map(item => item.substr(0, 1));
    },
    fixedTitle() {
      const shortcutList = Object.keys(this.data);
      return shortcutList[this.currentIndex];
    }
  },
  beforeMount() {
    window.addEventListener("scroll", _.throttle(this.highLightIdx, 200));
  },
  created() {
    this.touch = {};
  },
  beforeDestroy() {
    window.addEventListener("scroll", this.highLightIdx);
  },
  methods: {
    selectItem(item) {
      this.$emit("select", item);
    },
    // 右侧高亮位置
    highLightIdx() {
      // 除以 热门 + 歌手(12个) + pd 高度
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop > 88) {
        this.showFixedTitle = true;
      } else {
        this.showFixedTitle = false;
      }
      const idx = Math.floor((scrollTop - 88) / (30 + 30 + 12 * 70));
      this.currentIndex = idx >= 0 ? idx : 0;
    },
    // 滑动高度不好确定，暂未实现
    onShortcutTouchMove(e) {
      // const firstTouch = e.touches[0]
      // this.touch.y2 = firstTouch.pageY;
      // const delta = (this.touch.y2 - this.touch.y1) / this.anchorHeight | 0;
      // const anchorIndex = parseInt(this.touch.anchorIndex) + delta;
      // const height = this.calScrollHeight(anchorIndex);
      // window.scrollTo({
      //   top: height,
      //   behavior: "smooth"
      // });
    },
    onShortcutTouchStart(e) {
      const idx = getData(e.target, "index");
      this.touch.y1 = e.target.offsetTop;
      this.touch.anchorIndex = idx;
      const height = this.calScrollHeight(idx);
      window.scrollTo({
        top: height,
        behavior: "smooth"
      });
    },
    /**
     * 计算需要滚动的高度
     * @param index
     * @returns {number}
     */
    calScrollHeight(index) {
      // 如 热门 + 歌手(12个) + pd 高度
      return index * 30 + 12 * 70 * index + index * 30 + 88;
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
    position: fixed
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
</style>
