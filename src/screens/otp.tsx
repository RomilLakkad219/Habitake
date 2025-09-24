import React, { useContext, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

//API
import { emailVerification, getUserProfile, resendOtp } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, STORAGE_KEY, USE_STRING } from "../constants";

//COMPONENTS
import { Button, Header, Text } from "../components";

//CONTEXT
import { AuthContext } from "../context";

//SCREENS
import { SCREENS } from ".";

//LOADER
import ProgressView from "./progressView"

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import OTPTextInput from 'react-native-otp-textinput'
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Otp = (props: any) => {

    const { setProfile } = useContext(AuthContext)

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets()

    const [otp, setOtp] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const name = props.route.params.name;
    const email = props.route.params.email;

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
                "username": name,
                "confirmationCode": otp,
            }

            setIsLoading(true)
            const response: any = await emailVerification(params)
            setIsLoading(false)

            if (response?.verifyEmailCode?.success) {
                const userDataStr = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS);
                const userData = userDataStr ? JSON.parse(userDataStr) : null;

                const userResponse = userData
                //Fetch profile here (no Prepare screen needed)
                const profileRes: any = await getUserProfile({ userId: userResponse?.userId });

                if (profileRes?.getUser?.success) {
                    const profile = profileRes?.getUser?.data;

                    // Save user profile
                    await AsyncStorage.setItem(STORAGE_KEY.USER_DETAILS, JSON.stringify(profile));
                    setProfile(profile);

                    SHOW_SUCCESS_TOAST(STRING.login_successfully);

                    // Redirect directly to Home
                    props.navigation.dispatch(CommonActions.reset({
                        index: 0,
                        routes: [{ name: SCREENS.BottomBar.name }]
                    }));
                } else {
                    Toast.show({
                        type: 'smallError',
                        text1: profileRes?.getUser?.message,
                        position: 'bottom',
                    });
                }
            } else {
                Toast.show({
                    type: 'smallError',
                    text1: response?.verifyEmailCode?.error,
                    position: 'bottom',
                });
            }
        }
        catch (error: any) {
            Toast.show({
                type: 'smallError',
                text1: error,
                position: 'bottom',
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function onResendOtp() {
        try {
            const params = {
                "username": name,
            }

            setIsLoading(true)
            const result: any = await resendOtp(params)
            setIsLoading(false)

            if (result?.resendVerificationCode?.success) {
                SHOW_SUCCESS_TOAST(STRING.otp_has_been_sent_on_your_email)
            }
            else {
                Toast.show({
                    type: 'smallError',
                    text1: result?.resendVerificationCode?.message,
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
                    tintColor={COLORS.color_34216B}
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
        marginTop: SCALE_SIZE(8),
        color: COLORS.color_34216B,
        backgroundColor: '#F6F6F6',
        height: SCALE_SIZE(60),
        width: SCALE_SIZE(55),
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: SCALE_SIZE(20),
    },
    nextButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(40)
    },
})

export default Otp;