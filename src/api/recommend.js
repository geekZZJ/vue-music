import {GET} from "./index";

export function getRecommend() {
  return GET("/recommend/banner")
}
