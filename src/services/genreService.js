import http from "./httpServices";
// import { genresApi } from "../config.json";

const genresApi = "/genres";
export function getGenres() {
  return http.get(genresApi);
}
