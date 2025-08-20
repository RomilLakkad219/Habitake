import React, { useEffect, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Platform } from "react-native"

//API
import { resetPassword } from "../api";

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions } from "@react-navigation/native";

//LOADER
import ProgressView from "./progressView";

const ResetPassword = (props: any) => {

    const email = props.route.params.email
    const otp = props.route.params.otp

    const insets = useSafeAreaInsets();

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValidPass, setIsValidPassword] = useState<boolean>(true);

    const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{12,}$/

    useEffect(() => {
        if (password != '') {
            _validatePassword()
        }
    }, [password])

    useEffect(() => {
        if (confirmPassword != '') {
            _validateConfirmPassword()
        }
    }, [confirmPassword])

    function _validatePassword() {
        if (password.length > 0 && PASSWORD_RE.test(String(password))) {
            setIsValidPassword(true)
        }
        else {
            setIsValidPassword(false)
        }
    }

    function _validateConfirmPassword() {
        if (password === confirmPassword && confirmPassword.length > 0) {
            setIsValidPassword(true)
        }
        else {
            setIsValidPassword(false)
        }
    }

    function onResetPasswordCheck() {
        if (!password) {
            SHOW_TOAST('Enter your password')
        }
        else if (!confirmPassword) {
            SHOW_TOAST('Enter your confirm password')
        }
        else if (!isValidPass) {
            SHOW_TOAST('Password must be at least 12 characters long,\ninclude 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.')
        }
        else if (password != confirmPassword) {
            SHOW_TOAST('New password and confirm password does not match')
        }
        else {
            onResetPassword()
        }
    }

    async function onResetPassword() {
        try {
            const params = {
                email: email,
                new_password: password,
                code: otp
            }

            setIsLoading(true)
            const result = await resetPassword(params)
            setIsLoading(false)

            console.log('RESET SUCCESS', JSON.stringify(result))

            if (result?.status) {
                SHOW_SUCCESS_TOAST('Reset password successfully')
                setTimeout(() => {
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{
                            name: SCREENS.Login.name
                        }]
                    }))
                }, 1000);
            }
            else {
                SHOW_TOAST(result?.error)
            }
        }
        catch (err) {
            SHOW_TOAST(err)
        }
    }

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <Header
                type='onboarding' onBack={() => {
                    props.navigation.goBack()
                }} />
            <Text
                style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                font={FONT_NAME.bold}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(28)}>
                {STRING.reset}
                <Text
                    font={FONT_NAME.regular}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.password}
                </Text>
            </Text>
            <Text
                style={[styles.textStyle, { marginTop: SCALE_SIZE(10) }]}
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}
                size={SCALE_SIZE(16)}>
                {'quis nostrud exercitation ullamco laboris nisi ut'}
            </Text>
            <Input
                style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                value={password}
                isLock={IMAGES.ic_lock}
                placeholder={STRING.password}
                inputStyle={styles.inputTextStyle}
                autoCapitalize='none'
                placeholderTextColor={COLORS.color_8A8E9D}
                secureTextEntry={!isSecurePassword}
                onPressSecureIcon={() => {
                    setIsSecurePassword(!isSecurePassword)
                }}
                secureIcon={isSecurePassword ? IMAGES.ic_eye : IMAGES.ic_hide}
                onChangeText={(text) => {
                    setPassword(text)
                }} />
            <Input
                style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                value={confirmPassword}
                isEmail={IMAGES.ic_lock}
                inputStyle={styles.inputTextStyle}
                placeholder={STRING.confirm_password}
                autoCapitalize='none'
                placeholderTextColor={COLORS.color_8A8E9D}
                secureTextEntry={!isSecureConfirmPassword}
                secureIcon={isSecureConfirmPassword ? IMAGES.ic_eye : IMAGES.ic_hide}
                onPressSecureIcon={() => {
                    setIsConfirmSecurePassword(!isSecureConfirmPassword)
                }}
                onChangeText={(text) => {
                    setConfirmPassword(text)
                }} />
            <View style={{ flex: 1 }}></View>
            <Button
                onPress={() => {
                    onResetPasswordCheck()
                }}
                style={styles.buttonStyle}
                title={STRING.set_password} />
            {isLoading && <ProgressView />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white,
    },
    textStyle: {
        marginHorizontal: SCALE_SIZE(16)
    },
    forgotPasswordText: {
        marginTop: SCALE_SIZE(16),
        alignSelf: 'flex-end',
        marginRight: SCALE_SIZE(16)
    },
    buttonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(50)
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16),
    },
    inputTextStyle: {
        color: COLORS.black,
        fontSize: SCALE_SIZE(14),
        fontFamily: FONT_NAME.medium
    },
})

export default ResetPassword;