import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Image, View, Platform, TouchableOpacity, ImageBackground } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, REGEX, SCALE_SIZE, USE_STRING } from "../constants";

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
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUp = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets()

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [name, setName] = useState<any>('');
    const [password, setPassword] = useState<any>('');
    const [email, setEmail] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState<boolean>(false);
    const [isTermsSelected, setTermsSelected] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isValidPass, setIsValidPassword] = useState<boolean>(true);
    const [confirmPassValid, setConfirmPassValid] = useState<boolean>(true)

    const PASSWORD_RE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,40}$/

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

    const handleFullNameChange = (text: string) => {
        // Allow only letters (a-z, A-Z) and spaces
        const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
        setName(cleanedText);
    };

    async function onValidateUser() {
        if (!name) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_your_full_name,
                position: 'bottom',
            });
        }
        else if (!email) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_your_email,
                position: 'bottom',
            });
        }
        else if (REGEX.emailRegex.test(email) == false) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_valid_email,
                position: 'bottom',
            });
        }
        else if (!password) {
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
        else if (confirmPassword != password) {
            Toast.show({
                type: 'smallError',
                text1: STRING.password_and_confirm_password_does_not_match,
                position: 'bottom',
            });
        }
        else if (!isValidPass) {
            Toast.show({
                type: 'longError',
                text1: STRING.password_must_be_at_least_12_characters_long,
                position: 'bottom',
            });
        }
        else if (!isTermsSelected) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_agree_to_all_terms_and_condition,
                position: 'bottom',
            });
        }
        else {
            props.navigation.navigate(SCREENS.PropertyType.name, {
                name: name,
                password: password,
                email: email
            })
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

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <Header
                type='onboarding' onBack={() => {
                    props.navigation.goBack()
                }} />
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={80}   // scrolls a bit more when focusing
                extraHeight={100}
            >
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
                    onChangeText={handleFullNameChange} />
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
            </KeyboardAwareScrollView>
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