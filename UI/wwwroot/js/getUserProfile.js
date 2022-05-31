import {api} from "./consts.js";

export default async function getUserProfile(id) {
    return await fetch(`${api}/profile/user/getProfile/${id}`, {
        headers : {
            'Authorization': `Bearer ${getToken()}`
        }
    })
        .then(response => response.json())
        .then(res => res)
        .catch(console.log)
}