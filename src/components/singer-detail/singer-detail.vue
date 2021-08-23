<template>
  <transition name="slide">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import {getSingerDetail} from "@/api/singer";

export default {
  name: "singer-detail",
  computed: {
    ...mapGetters(["singer"])
  },
  data() {
    return {
      song: []
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    async _getDetail() {
      if (!this.singer.name) {
        this.$router.push("/singer");
        return;
      }
      const result = await getSingerDetail(this.singer.name);
      console.log(result);
      this.song = result;
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable.styl"
.singer-detail
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
