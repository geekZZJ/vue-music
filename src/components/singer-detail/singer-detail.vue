<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage" @showList="showList"></music-list>
  </transition>
</template>

<script>
import {mapGetters} from "vuex";
import {getSingerDetail} from "@/api/singer";
import MusicList from "@/components/music-list/music-list";

export default {
  name: "singer-detail",
  components: {MusicList},
  computed: {
    ...mapGetters(["singer"]),
    title() {
      return this.singer.name;
    },
    bgImage() {
      return this.singer.avatar;
    }
  },
  data() {
    return {
      songs: []
    };
  },
  created() {
    this._getDetail();
  },
  methods: {
    showList() {
      this.$emit("showList");
    },
    async _getDetail() {
      if (!this.singer.name) {
        this.$router.push("/singer");
        return;
      }
      const result = await getSingerDetail(this.singer.name);
      console.log(result);
      this.songs = result.data;
    }
  }
};
</script>

<style scoped lang="stylus">
@import "../../common/stylus/variable.styl"

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
