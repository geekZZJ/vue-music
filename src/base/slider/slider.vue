<template>
  <Swiper :options="swiperOption">
    <SwiperSlide v-for="(item,index) in banners" :key="index"><img :src="item" class="swiper-img"/></SwiperSlide>
    <div class="swiper-pagination" slot="pagination"></div>
  </Swiper>
</template>

<script>
import {Swiper, SwiperSlide} from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  name: "slider",
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    banners: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          disableOnInteraction: false,
          delay: 2500,
        },
        loop: this.loop,
      }
    };
  },
};
</script>

<style scoped lang="stylus">
.swiper-img
  width: 100%
</style>
