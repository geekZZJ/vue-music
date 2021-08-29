import {GET, POST} from "./index";

export function getSingerList() {
  return GET("/singer/lists");
}

export function getSingerDetail(name) {
  return GET(`/singer/detail?name=${name}`);
}

export function addSongAuto() {
  return POST("/singer/addSongAuto");
}

export function addSong(params) {
  return POST("/singer/addSong", params);
}
