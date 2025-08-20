import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

//API
import { resendOtp } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STRING, WEB_SERVICE } from "../constants";

//COMPONENTS
import { Button, Header, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//LOADER
import ProgressView from "./progressView"

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import OTPTextInput from 'react-native-otp-textinput'
import axios from "axios";

const Otp = (props: any) => {

    const insets = useSafeAreaInsets()

    const [otp, setOtp] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const userName = props.route.params.userName
    const email = props.route.params.email

    function onOtpCheck() {
        if (!otp) {
            SHOW_TOAST('Please enter your otp')
        }
        else {
            onGetOtp()
        }
    }

    async function onGetOtp() {
        setIsLoading(true)
        try {
            const response = await axios.post(
                WEB_SERVICE.verify_email,
                {
                    username: userName,
                    confirmationCode: otp,
                }
            );
            console.log(response.data);
            SHOW_SUCCESS_TOAST('Otp Verify Successfully')
            setTimeout(() => {
                props.navigation.navigate(SCREENS.Prepare.name)
            }, 1000);
        } catch (error: any) {
            SHOW_TOAST(error.message);
        }
        finally {
            setIsLoading(false)
        }
    }

    async function onResendOtp() {
        try {
            const params = {
                "username": userName
            }

            setIsLoading(true)
            const result = await resendOtp(params)
            setIsLoading(false)

            console.log('PRMS', params)

            console.log('RESEND OTP SUCCESS', JSON.stringify(result))

            if (result.status) {
                SHOW_SUCCESS_TOAST('OTP has been sent on your email')
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
                    {`Enter the verification code we just sent you on\n${email}`}
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

export default Otp;