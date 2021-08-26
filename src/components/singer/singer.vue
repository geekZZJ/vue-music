<template>
  <div class="singer">
    <ListView @select="selectSinger" :data="singers" v-show="showList"></ListView>
    <router-view @showList="showLists"></router-view>
  </div>
</template>

<script>
import {getSingerList} from "@/api/singer";
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
