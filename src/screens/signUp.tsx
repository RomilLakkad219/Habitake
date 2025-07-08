import React, { useState } from "react";
import { StyleSheet, Image, View, ScrollView, KeyboardAvoidingView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//NAVIGATION
import { CommonActions } from "@react-navigation/native";

//SCREENS
import { SCREENS } from ".";

const SignUp = (props: any) => {

    const [isSecurePassword, setIsSecurePassword] = useState(false);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState(false);

    return (
        <View style={styles.container}>
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
                        placeholder={STRING.full_name}
                        autoCapitalize='none'
                        placeholderTextColor={COLORS.color_8A8E9D}
                        onChangeText={(text) => {
                            setName(text)
                        }} />
                    <Input
                        style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
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
                    <View style={styles.termsConditionView}>
                        <Image
                            style={styles.squareIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_square}>
                        </Image>
                        <Text
                            font={FONT_NAME.medium}
                            color={COLORS.color_00092999}
                            size={SCALE_SIZE(16)}>
                            {STRING.agree_to_terms_conditions}
                        </Text>
                    </View>
                    <Button
                        onPress={() => {
                            props.navigation.navigate(SCREENS.Location.name)
                        }}
                        style={styles.nextButtonStyle}
                        title={STRING.next} />
                    <Text
                        style={{ marginBottom: SCALE_SIZE(20) }}
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
    nextButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(50)
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16),
    },
    termsConditionView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(20)
    },
    squareIcon: {
        height: SCALE_SIZE(16),
        width: SCALE_SIZE(16),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(12)
    }
})

export default SignUp;