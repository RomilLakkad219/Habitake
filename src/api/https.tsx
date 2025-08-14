//PACKAGES
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

//CONSTANT
import { STORAGE_KEY } from '../constants';

async function getHeaders() {
    const user = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS)
    if (user) {
        const userJson = JSON.parse(user)
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userJson?.token ?? ''}`
        }
    }
    else {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
}

async function getFormDataHeaders() {
    const user = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS)
    if (user) {
        const userJson = JSON.parse(user)
        return {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
            'Authorization': `Bearer ${userJson?.token ?? ''}`
        }
    }
    else {
        return {
            'Accept': 'application/json',
            "Content-Type": "multipart/form-data",
        }
    }
}

export async function getRequest(url: any, params: any) {
    let headers = await getHeaders();

    console.log("URL", url)
    console.log("params", params)
    console.log("headers", headers)

    try {
        let config;

        if (params) {
            config = {
                method: 'GET',
                url: url,
                params: params,
                headers: headers
            }
        }
        else {
            config = {
                method: 'GET',
                url: url,
                headers: headers
            }
        }

        const response = await axios(config);
        return getResponse(response)
    }
    catch (err) {
        return getError(err);
    }
}

export async function postRequest(url: any, params: any) {
    console.log("getRequest CALLED");
    let headers = await getHeaders();

    console.log("URL", url)
    console.log("params", params ? params : '')
    console.log("headers", headers)

    try {
        let config;

        if (params) {
            config = {
                method: 'POST',
                url: url,
                data: params,
                headers: headers
            }
        }
        else {
            config = {
                method: 'POST',
                url: url,
                headers: headers
            }
        }

        const response = await axios(config);
        return getResponse(response)
    }
    catch (err) {
        console.log(err)
        return getError(err)
    }
}

export async function putRequest(url: any, params: any) {
    let headers = await getHeaders();

    console.log("URL", url)
    console.log("params", params)
    console.log("headers", headers)

    try {
        const config = {
            method: 'PUT',
            url: url,
            data: params,
            headers: headers
        };
        const response = await axios(config);
        return getResponse(response)
    }
    catch (err) {
        console.log(err)
        return getError(err)
    }
}

export async function postMultipartRequest(url: any, params: any) {
    let headers = await getFormDataHeaders();

    try {
        let config;

        if (params) {
            config = {
                method: 'post',
                url: url,
                data: params,
                headers: headers,
            }
        }
        else {
            config = {
                method: 'post',
                url: url,
                headers: headers,
            }
        }

        const response = await axios(config);
        return getResponse(response)
    }
    catch (err) {
        console.log(err)
        return getError(err)
    }
}


export async function getMultipartRequest(url: any, params: any) {
    let headers = await getFormDataHeaders();

    console.log("URL", url)
    console.log("params", params)
    console.log("headers", headers)

    try {
        let config;

        if (params) {
            config = {
                method: 'get',
                url: url,
                data: params,
                headers: headers,
            }
        }
        else {
            config = {
                method: 'get',
                url: url,
                headers: headers,
            }
        }

        const response = await axios(config);
        return getResponse(response)
    }
    catch (err) {
        console.log(err)
        return getError(err)
    }
}

const getResponse = async (response: any) => {
    if (response.status == 200) {
        if (response?.data?.status) {
            if (response?.data?.status == 200) {
                let result = {
                    status: true,
                    data: response?.data ?? null,
                    error: response?.data?.message ?? '',
                };
                return result;
            }
            else {
                let result = {
                    status: false,
                    data: response?.data ?? null,
                    error: response?.data?.message ?? '',
                };
                return result;
            }
        }
        else {
            let result = {
                status: true,
                data: response?.data ?? null,
                error: response?.data?.message ?? '',
            };
            return result;
        }
    }
    else {
        let result = {
            status: false,
            data: response?.data ?? null,
            error: response?.data?.message ?? 'Something went wrong',
        };
        return result
    }
}

const getError = (error: any) => {
    console.log('error', error)
    console.log('error', error?.response)
    console.log('error', error?.response?.data)

    var message = '';
    var obj = null;
    if (error.response) {
        if (error.response.data) {
            obj = error.response.data;
            if (error.response.data.message) {
                message = error.response.data.message;
            } else {
                message = JSON.stringify(error.response.data.message);
            }
        } else {
            obj = error.response;
            message = 'Something went wrong';
        }
    } else {
        obj = error;
        message = error.message;
    }

    let data = {
        status: false,
        data: obj,
        error: message,
        status_code: error?.response?.status ?? '',
    };
    return data;
};