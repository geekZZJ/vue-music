import {GET} from "./index";

export function getSingerList() {
  return GET("/singer/lists");
}

export function getSingerDetail(name) {
  return GET(`/singer/detail?name=${name}`);
}
