import {GET} from "./index";

export function getRecommend() {
  return GET("/recommend/banner")
}

export function getDiscList(){
  return GET("/recommend/desc")
}
