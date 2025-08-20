import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, View, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity, ImageBackground } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//API
import { register } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, REGEX, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, STORAGE_KEY, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//CONTEXT
import { AuthContext } from "../context";

//SCREENS
import { SCREENS } from ".";

//LOADER
import ProgressView from "./progressView";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const SignUp = (props: any) => {

    const { setUser, fetchProfile } = useContext<any>(AuthContext)

    const insets = useSafeAreaInsets()

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [name, setName] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState<boolean>(false);
    const [isTermsSelected, setTermsSelected] = useState<boolean>(false);
    const [nameError, setNameError] = useState<any>('');
    const [emailError, setEmailError] = useState<any>('');
    const [passwordError, setPasswordError] = useState<any>('');
    const [confirmPasswordError, setConfirmPasswordError] = useState<any>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValidPass, setIsValidPassword] = useState<boolean>(true);
    const [confirmPassValid, setConfirmPassValid] = useState<boolean>(true)

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

    async function onValidateUser() {
        if (!name) {
            SHOW_TOAST('Please enter your full name')
        }
        else if (!email) {
            SHOW_TOAST('Please enter your email')
        }
        else if (REGEX.emailRegex.test(email) == false) {
            SHOW_TOAST('Enter valid email')
        }
        else if (!password) {
            SHOW_TOAST('Please enter your password')
        }
        else if (!confirmPassword) {
            SHOW_TOAST('Please enter your confirm password')
        }
        else if (confirmPassword != password) {
            SHOW_TOAST('Password and confirm password do not match')
        }
        else if (!isValidPass) {
            SHOW_TOAST('Password must be at least 12 characters long,\ninclude 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.')
            // SHOW_TOAST('Password must be at least with 1 number,\n1 uppercase letter,1 lowercase letter and 1 special character.')
        }
        else if (!isTermsSelected) {
            SHOW_TOAST('Please agree to all terms and condition')
        }
        else {
            onRegisterUser()
        }
    }

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
            setConfirmPassValid(true)
        }
        else {
            setConfirmPassValid(false)
        }
    }

    async function onRegisterUser() {
        try {
            const params = {
                "username": name,
                "password": password,
                "email": email,
                "role": "buyer"
            }

            setIsLoading(true)
            const result = await register(params)
            setIsLoading(false)

            if (result.data.success) {
                const userData = result?.data?.data;
                console.log('SIGNUP SUCCESS',JSON.stringify(result?.data?.data))
                setUser(userData)
                await AsyncStorage.setItem(STORAGE_KEY.USER_DETAILS, JSON.stringify(userData))
                SHOW_SUCCESS_TOAST('Sign up successfully')
                await fetchProfile(userData.userId)

                props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{
                        name: SCREENS.Otp.name,
                        params: {
                            userName: name,
                            email: email
                        }
                    }]
                }))
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
                            {STRING.create_an_account}
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
                        value={name}
                        isUser={IMAGES.ic_user}
                        inputStyle={styles.inputTextStyle}
                        placeholder={STRING.full_name}
                        autoCapitalize='none'
                        placeholderTextColor={COLORS.color_8A8E9D}
                        onChangeText={(text) => {
                            setName(text)
                        }} />
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                        value={email}
                        inputStyle={styles.inputTextStyle}
                        isEmail={IMAGES.ic_email}
                        placeholder={STRING.email}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        placeholderTextColor={COLORS.color_8A8E9D}
                        onChangeText={(text) => {
                            setEmail(text)
                        }} />
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                        value={password}
                        inputStyle={styles.inputTextStyle}
                        isLock={IMAGES.ic_lock}
                        placeholder={STRING.password}
                        autoCapitalize='none'
                        placeholderTextColor={COLORS.color_8A8E9D}
                        secureTextEntry={!isSecurePassword}
                        secureIcon={isSecurePassword ? IMAGES.ic_eye : IMAGES.ic_hide}
                        onPressSecureIcon={() => {
                            setIsSecurePassword(!isSecurePassword)
                        }}
                        onChangeText={(text) => {
                            setPassword(text)
                        }} />
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                        value={confirmPassword}
                        inputStyle={styles.inputTextStyle}
                        isEmail={IMAGES.ic_lock}
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
                    <TouchableOpacity style={styles.termsConditionView} onPress={() => {
                        setTermsSelected(!isTermsSelected)
                    }}>
                        <TouchableOpacity onPress={() => {
                            setTermsSelected(!isTermsSelected)
                        }}>
                            <View style={styles.imageDirection}>
                                <ImageBackground
                                    style={styles.squareIcon}
                                    resizeMode="contain"
                                    source={IMAGES.ic_square}>
                                    {isTermsSelected &&
                                        <Image
                                            style={styles.rightImage}
                                            resizeMode="cover"
                                            source={IMAGES.green_check_bg} />
                                    }
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                        <Text
                            font={FONT_NAME.medium}
                            color={COLORS.color_00092999}
                            size={SCALE_SIZE(16)}>
                            {STRING.agree_to_terms_conditions}
                        </Text>
                    </TouchableOpacity>
                    <Button
                        onPress={() => {
                            onValidateUser()
                        }}
                        style={styles.nextButtonStyle}
                        title={STRING.next} />
                    <Text
                        style={{ marginBottom: SCALE_SIZE(25) }}
                        font={FONT_NAME.regular}
                        align="center"
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.already_have_an_account}
                        <Text
                            onPress={() => {
                                props.navigation.navigate(SCREENS.Login.name)
                            }}
                            font={FONT_NAME.bold}
                            align="center"
                            color={COLORS.color_01A669}
                            size={SCALE_SIZE(16)}>
                            {STRING.login}
                        </Text>
                    </Text>
                </ScrollView>
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
    signInText: {
        marginHorizontal: SCALE_SIZE(16)
    },
    forgotPasswordText: {
        marginTop: SCALE_SIZE(16),
        alignSelf: 'flex-end',
        marginRight: SCALE_SIZE(16)
    },
    nextButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(40)
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16),
    },
    inputTextStyle: {
        color: COLORS.black,
        fontSize: SCALE_SIZE(14),
        fontFamily: FONT_NAME.medium
    },
    termsConditionView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(20)
    },
    squareIcon: {
        height: SCALE_SIZE(17),
        width: SCALE_SIZE(17),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(12)
    },
    rightImage: {
        height: SCALE_SIZE(17),
        width: SCALE_SIZE(17),
        alignSelf: 'center'
    },
    imageDirection: {
        flexDirection: 'row',
    }
})

export default SignUp;