import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform } from "react-native"

//API
import { resetPassword } from "../api";

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, USE_STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

//LOADER
import ProgressView from "./progressView";

const ResetPassword = (props: any) => {

    const STRING = USE_STRING();

    const email = props.route.params.email
    const insets = useSafeAreaInsets();

    const [otpFromStorage, setOtpFromStorage] = useState<string | null>(null);
    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const loadData = async () => {
            const savedOtp = await AsyncStorage.getItem("FORGOT_PASSWORD_OTP");
            setOtpFromStorage(savedOtp);
        };
        loadData();
    }, []);

    const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#\$%\^&\*]).{12,}$/

    function onResetPasswordCheck() {
        if (!password) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_your_password,
                position: 'bottom',
            });
        }
        else if (!confirmPassword) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_your_confirm_password,
                position: 'bottom',
            });
        }
        else if (!PASSWORD_RE.test(password)) {
            Toast.show({
                type: 'longError',
                text1: STRING.password_must_be_at_least_12_characters_long,
                position: 'bottom',
            });
        }
        else if (password !== confirmPassword) {
            Toast.show({
                type: 'smallError',
                text1: STRING.password_and_confirm_password_does_not_match,
                position: 'bottom',
            });
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
                code: otpFromStorage
            }

            setIsLoading(true)
            const result = await resetPassword(params)
            setIsLoading(false)

            if (result?.status) {
                SHOW_SUCCESS_TOAST(STRING.reset_password_successfully)
                // clear stored values after success
                await AsyncStorage.removeItem("FORGOT_PASSWORD_OTP");
                setTimeout(() => {
                    props.navigation.navigate(SCREENS.Login.name)
                }, 1000);
            }
            else {
                Toast.show({
                    type: 'smallError',
                    text1: result?.error,
                    position: 'bottom',
                });
            }
        }
        catch (err: any) {
            Toast.show({
                type: 'smallError',
                text1: err,
                position: 'bottom',
            });
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
    }
})

export default ResetPassword;