import { delUserData, getUserData } from "./utils.js";

const host = "http://localhost:3030";

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data !== undefined) {
        options.headers[`Content-Type`] = `application/json`;
        options.body = JSON.stringify(data);
    }

    const user = getUserData();

    if (user) {
        options.headers[`X-Authorization`] = user.accessToken;
    }

    try {

        const response = await fetch(host + url, options);

        if (response.status == 204) {
            return response;
        }

        const result = await response.json();

        if (response.ok == false) {
            if (result.code === 403) {
                delUserData();
            }
            throw new Error(result.message);
        }

        return result;

    } catch (error) {
        throw error;
    }
}


export const api = {
    get: request.bind(null, `get`),
    post: request.bind(null, `post`),
    put: request.bind(null, `put`),
    del: request.bind(null, `delete`)
}