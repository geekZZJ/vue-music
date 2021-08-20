<template>
  <div class="singer">
    <ListView @select="selectSinger" :data="singers"></ListView>
    <router-view></router-view>
  </div>
</template>

<script>
import {getSingerList} from "@/api/singer";
import ListView from "@/base/listview";

export default {
  name: "singer",
  components: {
    ListView
  },
  data() {
    return {
      singers: {}
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.name}`
      });
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
