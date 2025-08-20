// BASE URL
export const BASE_URL = 'https://8piqxvpn55.execute-api.eu-central-1.amazonaws.com/dev/auth/';

export const WEB_SERVICE = {
    sign_up: BASE_URL + 'register',
    login: BASE_URL + 'login',
    verify_email: BASE_URL + 'verify-email',
    resend_otp: BASE_URL + 'resend-email',
    forgot_password: BASE_URL + 'forgot-password/',
    reset_password: BASE_URL + 'reset-password',
    user_profile: BASE_URL + 'profile',
    edit_profile: BASE_URL + 'profile'
}