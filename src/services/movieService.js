import http from "./httpServices";
// import { moviesApi } from "../config.json";

const moviesApi = "/movies";
export function getMovies() {
  return http.get(moviesApi);
}

export function getMovie(id) {
  return http.get(`${moviesApi}/${id}`);
}

export function deleteMovie(movieId) {
  return http.delete(`${moviesApi}/${movieId}`);
}

export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(`${moviesApi}/${movie._id}`, body);
  }

  return http.post(moviesApi, movie);
}
