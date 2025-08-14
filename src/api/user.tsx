//CONSTANTS
import { WEB_SERVICE } from "../constants";

//HTTPS
import { postRequest } from "./https";

async function register(params: any) {
    let url = WEB_SERVICE.sign_up
    const result = await postRequest(url, params)
    console.log('RES', result)
    return result
}

async function emailVerification(params: any) {
    let url = WEB_SERVICE.verify_email
    const result = await postRequest(url, params)
    return result
}

async function userLogin(params: any) {
    let url = WEB_SERVICE.login
    const result = await postRequest(url, params)
    return result
}

export {
    register,
    emailVerification,
    userLogin
}