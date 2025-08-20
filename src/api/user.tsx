//CONSTANTS
import { WEB_SERVICE } from "../constants";

//HTTPS
import { getRequest, postRequest, putRequest } from "./https";

async function register(params: any) {
    let url = WEB_SERVICE.sign_up
    const result = await postRequest(url, params)
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

async function resendOtp(params: any) {
    let url = WEB_SERVICE.resend_otp
    const result = await postRequest(url, params)
    return result
}

async function forgotPassword(params: any) {
    let url = WEB_SERVICE.forgot_password
    const result = await postRequest(url, params)
    return result
}

async function resetPassword(params: any) {
    let url = WEB_SERVICE.reset_password
    const result = await postRequest(url, params)
    return result
}

async function getUserProfile(params: any) {
    let url = WEB_SERVICE.user_profile + `?user_id=${params.user_id}`
    const result = await getRequest(url, params)
    return result
}

async function editProfile(params: any) {
    let url = WEB_SERVICE.edit_profile
    const result = await putRequest(url, params)
    return result
}

export {
    register,
    emailVerification,
    userLogin,
    resendOtp,
    forgotPassword,
    resetPassword,
    getUserProfile,
    editProfile
}