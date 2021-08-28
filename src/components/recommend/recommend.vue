<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper">
        <Slider :banners="banners"></Slider>
      </div>
      <div class="recommend-list">
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgUrl" alt="">
            </div>
            <div class="text">
              <h2 class="desc">{{ item.disname }}</h2>
              <p class="name">{{ item.creator.name }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from "@/api/recommend";
import Slider from "@/base/slider";
import {API, PUBLIC, BANNER} from "@/api/config";
import Loading from "@/base/loading/loading";

export default {
  name: "recommend",
  components: {
    Slider,
    Loading
  },
  data() {
    return {
      banners: [],
      discList: []
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    async _getDiscList() {
      const result = await getDiscList();
      this.discList = result.data
    },
    async _getRecommend() {
      const result = await getRecommend();
      const banners = [];
      result.data.forEach(item => {
        banners.push(`${API}${PUBLIC}${BANNER}/${item}`);
      });
      this.banners = banners;
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable"

.recommend
  width: 100%

  .recommend-content
    height: 100%

    .slider-wrapper
      position: relative
      width: 100%

    .recommend-list
      display: flex;
      flex-direction: column

      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme

      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px

        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px

        .text
          display: flex
          flex-direction: column
          justify-content: center
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium

          .name
            color: $color-text-d

          .desc
            margin-bottom: 10px
            color: $color-text

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
