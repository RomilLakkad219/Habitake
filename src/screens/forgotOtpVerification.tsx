import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

//API
import { emailVerification, forgotPassword, otpVerification, resendOtp } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, USE_STRING } from "../constants";

//COMPONENTS
import { Button, Header, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//LOADER
import ProgressView from "./progressView"

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import OTPTextInput from 'react-native-otp-textinput'
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ForgotOtpVerification = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets()

    const [otp, setOtp] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userName = props.route.params.userName
    const email = props.route.params.email

    console.log("FORGOT OTP Props", userName, email);

    function onOtpCheck() {
        if (!otp) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_your_otp,
                position: 'bottom',
            });
        }
        else {
            onGetOtp()
        }
    }

    async function onGetOtp() {
        try {
            const params = {
                "email": email,
                "code": otp,
            }

            setIsLoading(true)
            const response = await otpVerification(params)
            setIsLoading(false)

            console.log('OTP PRMS', params)

            console.log('OTP RESPONSE', JSON.stringify(response))

            if (response?.status) {
                SHOW_SUCCESS_TOAST(STRING.otp_verify_successfully)
                await AsyncStorage.setItem("FORGOT_PASSWORD_OTP", otp);
                setTimeout(() => {
                    props.navigation.navigate(SCREENS.ResetPassword.name, {
                            email: email
                        })
                }, 1000);
            }
            else {
                Toast.show({
                    type: 'smallError',
                    text1: response?.error,
                    position: 'bottom',
                });
            }
        } catch (error: any) {
            Toast.show({
                type: 'smallError',
                text1: error,
                position: 'bottom',
            });
        }
        finally {
            setIsLoading(false)
        }
    }

    async function onResendOtp() {
        try {
            const params = {
                "email": email
            }

            setIsLoading(true)
            const result = await forgotPassword(params)
            setIsLoading(false)

            console.log('RESENT OTP', JSON.stringify(result))

            if (result.status) {
                SHOW_SUCCESS_TOAST(STRING.otp_has_been_sent_on_your_email)
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
            <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <Text
                    style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.verify_email}
                </Text>
                <Text
                    style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                    font={FONT_NAME.medium}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(16)}>
                    {STRING.enter_verification_code + `\n${email}`}
                </Text>
                <OTPTextInput
                    defaultValue={otp}
                    containerStyle={styles.otpContainerStyle}
                    textInputStyle={styles.otpSelected}
                    inputCount={6}
                    handleTextChange={(text) => {
                        setOtp(text)
                    }}>
                </OTPTextInput>
                <TouchableOpacity onPress={() => {
                    onResendOtp()
                }}>
                    <Text
                        style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                        font={FONT_NAME.medium}
                        color={COLORS.color_333A54}
                        align="center"
                        size={SCALE_SIZE(16)}>
                        {STRING.didnt_receive_the_code}
                        <Text
                            style={[styles.textStyle, {
                                marginTop: SCALE_SIZE(35),
                                textDecorationLine: 'underline',
                                textDecorationColor: COLORS.color_34216B
                            }]}
                            font={FONT_NAME.semiBold}
                            align="center"
                            color={COLORS.color_34216B}
                            size={SCALE_SIZE(16)}>
                            {STRING.resend}
                        </Text>
                    </Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <Button
                    onPress={() => {
                        onOtpCheck()
                    }}
                    style={styles.nextButtonStyle}
                    title={STRING.next} />
            </KeyboardAvoidingView>
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
    otpContainerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCALE_SIZE(5)
    },
    otpSelected: {
        borderRadius: SCALE_SIZE(10),
        borderWidth: 1,
        borderBottomWidth: 1,
        marginTop: SCALE_SIZE(42),
        color: COLORS.color_34216B,
        backgroundColor: '#F6F6F6',
        borderColor: COLORS.color_34216B
    },
    nextButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(40)
    },
})

export default ForgotOtpVerification;