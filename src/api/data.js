import { api } from "./api.js";
import { delUserData } from "./utils.js";

const endpoint = {
    "login": `/users/login`,
    "register": `/users/register`,
    "logout": `/users/logout`,
    "getAllalbums": `/data/albums?sortBy=_createdOn%20desc`,
    "newAlbums": `/data/albums`,
    "getAlbumId": (id) => `/data/albums/${id}`,
    "newLikes": `/data/likes`,
    "getLikesForAlbum": (albumId) => `/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    "getLikeFsorSpecificUser": (albumId, userId) => `/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

export async function getLikeFsorSpecificUser(albumId, userId) {
  return await api.get(endpoint.getLikeFsorSpecificUser(albumId, userId));
}
export async function getLikes(albumId) {
  return await api.get(endpoint.getLikesForAlbum(albumId));
}
export async function addLike(albumId) {
  return await api.post(endpoint.newLikes, {albumId});
}
export async function editAlbum(id,data) {
  return await api.put(endpoint.getAlbumId(id), data);
}
export async function createAlbum(data) {
  return await api.post(endpoint.newAlbums, data);
}
export async function daeAlbum(id) {
  return await api.del(endpoint.getAlbumId(id));
}
export async function getAlbumInfo(id) {
  return await api.get(endpoint.getAlbumId(id));
}
export async function getAllalbums() {
  return await api.get(endpoint.getAllalbums);
}
export async function logout() {
  return await api.get(endpoint.logout);
}
export async function login(email, password) {
    return await api.post(endpoint.login, { email, password });
}
export async function register(email, password) {
    return await api.post(endpoint.register, { email, password });
}
