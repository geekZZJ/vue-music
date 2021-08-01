import {GET} from "./index";

export function getSingerList() {
  return GET("/singer/lists")
}
