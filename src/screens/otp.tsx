import React, { useRef, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native"

//API
import { emailVerification, register, resendOtp } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, STORAGE_KEY, USE_STRING } from "../constants";

//COMPONENTS
import { AccountCreationSuccessSheet, Button, Header, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//LOADER
import ProgressView from "./progressView"

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import OTPTextInput from 'react-native-otp-textinput'
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Otp = (props: any) => {

    const accountCreationSuccessRef = useRef<any>('')

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets()

    const [otp, setOtp] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const name = props.route.params.name;
    const email = props.route.params.email;
    const password = props?.route?.params?.password;
    const propertyType = props?.route?.params?.propertyType;
    const budget = props?.route?.params?.budget;
    const phoneNumber = props?.route?.params?.phoneNumber;
    const profileImage = props?.route?.params?.profileImage;

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
                onRegisterUser()
            }
            else {
                Toast.show({
                    type: 'smallError',
                    text1: response?.verifyEmailCode?.error,
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
                "username": name,
            }

            setIsLoading(true)
            const result: any = await resendOtp(params)
            setIsLoading(false)

            console.log('RESEND', params, JSON.stringify(result))

            if (result?.resendVerificationCode?.success) {
                SHOW_SUCCESS_TOAST(STRING.otp_has_been_sent_on_your_email)
            }
            else {
                console.log('ERR', result?.resendVerificationCode?.message,)
                Toast.show({
                    type: 'smallError',
                    text1: result?.resendVerificationCode?.message,
                    position: 'bottom',
                });
            }
        }
        catch (err: any) {
            console.log('ERR', err)
            Toast.show({
                type: 'smallError',
                text1: err,
                position: 'bottom',
            });
        }
    }

    async function onRegisterUser() {
        try {
            const params = {
                username: name,
                password: password,
                email: email,
                role: "Buyer",
                firstName: "",
                lastName: "",
                phoneNumber: phoneNumber,
                profilePicture: profileImage,
                propertyType: propertyType,
                budget: budget,
                dateOfBirth: "",
                gender: "",
                nationality: "",
                kycStatus: "",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                },
            }

            setIsLoading(true)
            const result: any = await register(params)
            setIsLoading(false)

            console.log('SIGNUP PRMS', params)

            console.log('SIGN UP RES', result)

            if (result?.registerUser?.success) {
                const userData = result.registerUser;
                await AsyncStorage.setItem(STORAGE_KEY.USER_DETAILS, JSON.stringify(userData))
                accountCreationSuccessRef?.current?.open()
                setTimeout(() => {
                    props.navigation.navigate(SCREENS.Prepare.name, {
                        userData: userData
                    })
                }, 5000);
            }
            else {
                console.log('ERR', result.registerUser?.message)
                Toast.show({
                    type: 'smallError',
                    text1: result.registerUser?.message,
                    position: 'bottom',
                });
            }
        }
        catch (err: any) {
            console.log('ERRRRRRR', err)
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
            <AccountCreationSuccessSheet
                onRef={accountCreationSuccessRef}
                onFinish={() => {
                    accountCreationSuccessRef?.current?.close()
                }} />
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