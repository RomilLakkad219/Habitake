import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Login = (props: any) => {

    const insets = useSafeAreaInsets();

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [email, setEmail] = useState<any>('');
    const [password, setPassword] = useState<any>('');

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
                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled">
                    <Text
                        style={[styles.signInText, { marginTop: SCALE_SIZE(35) }]}
                        font={FONT_NAME.regular}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(28)}>
                        {STRING.lets}
                        <Text
                            font={FONT_NAME.bold}
                            color={COLORS.color_333A54}
                            size={SCALE_SIZE(28)}>
                            {STRING.sign_in}
                        </Text>
                    </Text>
                    <Text
                        style={[styles.signInText, { marginTop: SCALE_SIZE(10) }]}
                        font={FONT_NAME.regular}
                        color={COLORS.color_545A70}
                        size={SCALE_SIZE(16)}>
                        {'quis nostrud exercitation ullamco laboris nisi ut'}
                    </Text>
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(24) }]}
                        value={email}
                        isEmail={IMAGES.ic_email}
                        placeholder={STRING.email}
                        autoCapitalize='none'
                        placeholderTextColor={COLORS.color_8A8E9D}
                        onChangeText={(text) => {
                            setEmail(text)
                        }} />
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                        value={password}
                        isLock={IMAGES.ic_lock}
                        placeholder={STRING.password}
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
                    <Text
                        onPress={() => {
                            props.navigation.navigate(SCREENS.ForgotPassword.name)
                        }}
                        style={styles.forgotPasswordText}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_01A669}
                        size={SCALE_SIZE(14)}>
                        {STRING.forgot_password}
                    </Text>
                    <Button
                        onPress={() => {
                            props.navigation.navigate(SCREENS.BottomBar.name)
                        }}
                        style={styles.loginButtonStyle}
                        title={STRING.login} />
                    <View style={styles.horizontalLineView}>
                        <Image
                            style={{ flex: 1 }}
                            resizeMode="contain"
                            source={IMAGES.ic_horizontal}></Image>
                        <Text
                            style={{ marginHorizontal: SCALE_SIZE(10) }}
                            font={FONT_NAME.bold}
                            color={COLORS.color_B0B3BD}
                            size={SCALE_SIZE(10)}>
                            {STRING.or}
                        </Text>
                        <Image
                            style={{ flex: 1 }}
                            resizeMode="contain"
                            source={IMAGES.ic_horizontal}></Image>
                    </View>
                    <View style={styles.buttonDirectionView}>
                        <TouchableOpacity style={styles.googleButtonStyle}>
                            <Image
                                style={styles.socialIcons}
                                resizeMode="contain"
                                source={IMAGES.ic_google}>
                            </Image>
                        </TouchableOpacity>
                        <View style={{ width: SCALE_SIZE(12) }}></View>
                        <TouchableOpacity style={styles.fbButtonStyle}>
                            <Image
                                style={styles.socialIcons}
                                resizeMode="contain"
                                source={IMAGES.ic_fb}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginBottom: SCALE_SIZE(40) }}>
                        <Text
                            font={FONT_NAME.regular}
                            align="center"
                            color={COLORS.color_333A54}
                            size={SCALE_SIZE(16)}>
                            {STRING.dont_have_an_account}
                            <Text
                                onPress={() => {
                                    props.navigation.navigate(SCREENS.SignUp.name)
                                }}
                                font={FONT_NAME.bold}
                                align="center"
                                color={COLORS.color_01A669}
                                size={SCALE_SIZE(16)}>
                                {STRING.register}
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white,
    },
    signInText: {
        marginHorizontal: SCALE_SIZE(16)
    },
    forgotPasswordText: {
        marginTop: SCALE_SIZE(16),
        alignSelf: 'flex-end',
        marginRight: SCALE_SIZE(16)
    },
    loginButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(50),
        marginBottom: SCALE_SIZE(30)
    },
    buttonDirectionView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: SCALE_SIZE(20),
        marginBottom: SCALE_SIZE(40)
    },
    googleButtonStyle: {
        height: SCALE_SIZE(70),
        width: SCALE_SIZE(158),
        borderRadius: SCALE_SIZE(20),
        backgroundColor: COLORS.color_E6E6EA66,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fbButtonStyle: {
        height: SCALE_SIZE(70),
        width: SCALE_SIZE(158),
        borderRadius: SCALE_SIZE(20),
        backgroundColor: COLORS.color_E6E6EA66,
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialIcons: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
        alignSelf: 'center'
    },
    horizontalLineView: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: SCALE_SIZE(16),
        alignItems: 'center'
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16),
    }
})

export default Login;