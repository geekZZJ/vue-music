<template>
  <div class="singer">
    <ListView @select="selectSinger" :data="singers" v-show="showList"></ListView>
    <router-view @showList="showLists"></router-view>
  </div>
</template>

<script>
import {getSingerList, addSongAuto,addSong} from "@/api/singer";
import ListView from "@/base/listview";
import {mapMutations} from "vuex";

export default {
  name: "singer",
  components: {
    ListView
  },
  data() {
    return {
      singers: {},
      showList: true,
    };
  },
  created() {
    this._getSingerList();
    // this.saveSong();
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    selectSinger(singer) {
      this.showList = false;
      this.$router.push({
        path: `/singer/${singer.name}`
      });
      this.setSinger(singer);
    },
    async saveSong() {
      const result = await addSongAuto();
      console.log("result", result.data.data);
      const lists = result.data.data.list;
      for (let i = 0; i < lists.length; i++) {
        const params = {
          song: lists[i].name,
          singer: lists[i].artist,
          album: lists[i].album,
          image: lists[i].pic,
          url: `http://localhost:7001/public/${lists[i].artist}/${lists[i].name}.mp3`,
          duration: `${lists[i].duration}`
        };
        await addSong(params)
      }
    },
    showLists() {
      this.showList = true;
    },
    async _getSingerList() {
      const result = await getSingerList();
      this.cateData(result.data);
    },
    cateData(list) {
      const obj = {};
      list.forEach(item => {
        if (!obj[item.title]) {
          obj[item.title] = [];
        }
        obj[item.title].push({
          name: item.name,
          avatar: item.avatar
        });
      });
      this.singers = obj;
    }
  }
};
</script>

<style scoped lang="stylus">
.singer
  width: 100%
</style>
