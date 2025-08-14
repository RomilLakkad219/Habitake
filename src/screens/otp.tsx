import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

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
import { CommonActions } from "@react-navigation/native";

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
                    arguments: {
                        input: {
                            username: userName,
                            verificationCode: otp,
                        },
                    },
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            SHOW_SUCCESS_TOAST('Otp Verify Successfully')
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                    name: SCREENS.BottomBar.name
                }]
            }))
        } catch (error: any) {
            SHOW_TOAST(error.response?.data || error.message);
        }
        finally {
            setIsLoading(false)
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
                    {'Verify Email'}
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
                <TouchableOpacity onPress={() => { }}>
                    <Text
                        style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                        font={FONT_NAME.medium}
                        color={COLORS.color_333A54}
                        align="center"
                        size={SCALE_SIZE(16)}>
                        {`Don't receive a code?`}
                        <Text
                            style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                            font={FONT_NAME.medium}
                            align="center"
                            color={COLORS.color_34216B}
                            size={SCALE_SIZE(16)}>
                            {` Resend`}
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