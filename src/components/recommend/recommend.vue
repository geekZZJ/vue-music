<template>
  <div class="recommend">
    <div class="recommend-content" id="recommend-content">
      <div class="slider-wrapper" id="slider-wrapper">
        <Slider :banners="banners"></Slider>
      </div>
      <div class="recommend-list" v-highly>
        <h1 class="list-title">热门歌单推荐</h1>
        <ul class="list-desc">
          <li v-for="item in discList" class="item">
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgUrl" alt="">
            </div>
            <div class="text">
              <h2 class="name">{{ item.creator.name }}</h2>
              <p class="desc">{{ item.disname }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend, getDiscList} from "@/api/recommend";
import Slider from "@/base/slider";
import {API, PUBLIC, BANNER} from "@/api/config";

export default {
  name: "recommend",
  components: {
    Slider
  },
  directives: {
    highly: {
      inserted: function (el) {
        const contentHeight = document.getElementById("recommend-content").clientHeight;
        let sliderHeight;
        setTimeout(() => {
          sliderHeight = document.getElementById("slider-wrapper").clientHeight;
          el.style.height = contentHeight - sliderHeight + "px";
        }, 200);
      },
    }
  },
  data() {
    return {
      banners: [],
      discList: [
        {
          imgUrl: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1",
          creator: {
            name: "欧美"
          },
          disname: "流行节奏控"
        },
        {
          imgUrl: "https://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q4X4NiaWS01Fvtn063nqHY2Q/300?n=1",
          creator: {
            name: "欧美"
          },
          disname: "流行轻有氧"
        },
        {
          imgUrl: "https://qpic.y.qq.com/music_cover/MKjEtF7diatibd6B0iaeF5KguYHTWhScOADLtR9xjUjEEz5uYMCCKOA9w/300?n=1",
          creator: {
            name: "最"
          },
          disname: "陈奕迅"
        },
        {
          imgUrl: "https://qpic.y.qq.com/music_cover/4pmnRu5sL5QbtO8OS8NKJU7UhBRvQcdookqiaqkurvWR8j7PKeyzcFA/300?n=1",
          creator: {
            name: "最"
          },
          disname: "SUPER JUNIOR"
        },
        {
          imgUrl: "https://qpic.y.qq.com/music_cover/7vlTTvwBiaibKJpyXffTHicMpDXK5xPJiaPoPSy3PBexF9zRK9veKIXuxw/300?n=1",
          creator: {
            name: "古典"
          },
          disname: "美妙心情"
        },
      ]
    };
  },
  created() {
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    async _getDiscList() {
      const result = await getDiscList();
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
  position: fixed
  width: 100%
  top: 88px
  bottom: 0

  .recommend-content
    height: 100%
    overflow: hidden

    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden

    .recommend-list
      display: flex;
      flex-direction: column

      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme

      .list-desc
        overflow: auto
        flex: 1

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
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium

            .name
              margin-bottom: 10px
              color: $color-text

            .desc
              color: $color-text-d

    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
