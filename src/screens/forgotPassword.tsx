import React, { useContext, useState } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from "react-native"

//API
import { forgotPassword } from "../api";

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, REGEX, SCALE_SIZE, SHOW_TOAST, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//CONTEXT
import { AuthContext } from "../context";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//LOADER
import ProgressView from "./progressView";

const ForgotPassword = (props: any) => {

    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function onForgotPasswordValidation() {

        if (!email) {
            SHOW_TOAST('Enter your email')
        }
        else if (REGEX.emailRegex.test(email) == false) {
            SHOW_TOAST('Please enter valid email')
        }
        else {
            onForgotPassword()
        }
    }

    async function onForgotPassword() {

        try {
            const params = {
                email: email
            }

            setIsLoading(true)
            const result = await forgotPassword(params)
            setIsLoading(false)

            console.log('FORGOT', JSON.stringify(result))

            if (result.status) {
                props.navigation.navigate(SCREENS.ResetPassword.name, {
                    email: email
                })
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
            <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}>
                <Text
                    style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.forgot}
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
                    value={email}
                    isEmail={IMAGES.ic_email}
                    inputStyle={styles.inputTextStyle}
                    placeholder={STRING.email}
                    autoCapitalize='none'
                    placeholderTextColor={COLORS.color_8A8E9D}
                    onChangeText={(text) => {
                        setEmail(text)
                    }} />
                <View style={{ flex: 1 }}></View>
                <Button
                    onPress={() => {
                        onForgotPasswordValidation()
                    }}
                    style={styles.continueButtonStyle}
                    title={STRING.continue} />
                <Text
                    style={{ marginBottom: SCALE_SIZE(20) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_00092999}
                    size={SCALE_SIZE(18)}>
                    {STRING.remember_your_password}
                    <Text
                        onPress={() => {
                            props.navigation.navigate(SCREENS.Login.name)
                        }}
                        font={FONT_NAME.medium}
                        align="center"
                        color={COLORS.color_01A669}
                        size={SCALE_SIZE(18)}>
                        {STRING.login_insted}
                    </Text>
                </Text>
            </KeyboardAvoidingView>
            <SafeAreaView />
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
    continueButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(16)
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16)
    },
    inputTextStyle: {
        color: COLORS.black,
        fontSize: SCALE_SIZE(14),
        fontFamily: FONT_NAME.medium
    },
})

export default ForgotPassword;