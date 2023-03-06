import { api } from "./api.js";

const endpoint = {
    "login":`/users/login`,
    "register":`/users/register`,
    "logout":`/users/logout`,
    "getAllalbums":`/data/albums?sortBy=_createdOn%20desc`,
    "newAlbums":`/data/albums`,
    "getAlbumId":(id)=> `/data/albums/${id}`,
    "newLikes":`/data/likes`,
    "getLikesForAlbum":(albumId)=>`/data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    "getLikeFsorSpecificUser":(albumId,userId)=>`/data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`
}

