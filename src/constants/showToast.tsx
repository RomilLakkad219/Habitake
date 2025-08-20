import Toast from 'react-native-toast-message'

export function SHOW_TOAST(message: any) {
    Toast.show({
        type: 'error',
        text1: message,
        position: 'bottom',
    })
}

export function SHOW_SUCCESS_TOAST(message: any) {
    Toast.show({
        type: 'success',
        text1: message,
        position: 'bottom'
    })
}