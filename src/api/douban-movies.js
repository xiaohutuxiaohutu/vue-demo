import axios from "axios";
import { douban } from "@/config/hosts";
// 导出 API 资源调用函数
export const getTop250Movies = params =>
    axios.get(`${douban}/v2/movie/top250`, { params });
// src/views/douban-movies/top250/index.vue

// script 部分
import { getTop250Movies } from "@/api/douban-movies";

export default {
  name: "Top250",
  data() {
    return {
      movies: []
    };
  },
  async created() {

    // 调用 API 资源
    const { subjects } = await getTop250Movies({
      start: 0,
      count: 20
    });

    this.movies = subjects;
  }
};