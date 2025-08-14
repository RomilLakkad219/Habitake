import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Platform } from "react-native"

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

const ResetPassword = (props: any) => {

    const insets = useSafeAreaInsets();

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [password, setPassword] = useState<any>('');
    const [confirmPassword, setConfirmPassword] = useState<any>('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState<boolean>(false);

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <Header
                type='onboarding' onBack={() => {
                    props.navigation.goBack()
                }} />
            <Text
                style={[styles.textStyle, { marginTop: SCALE_SIZE(35) }]}
                font={FONT_NAME.bold}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(28)}>
                {STRING.reset}
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
                value={password}
                isLock={IMAGES.ic_lock}
                placeholder={STRING.password}
                inputStyle={styles.inputTextStyle}
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
            <Input
                style={[styles.inputStyle, { marginTop: SCALE_SIZE(20) }]}
                value={confirmPassword}
                isEmail={IMAGES.ic_lock}
                inputStyle={styles.inputTextStyle}
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
            <View style={{ flex: 1 }}></View>
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.Login.name)
                }}
                style={styles.buttonStyle}
                title={STRING.set_password} />
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
    buttonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(58),
        marginBottom: SCALE_SIZE(50)
    },
    inputStyle: {
        marginHorizontal: SCALE_SIZE(16),
    },
    inputTextStyle: {
        color: COLORS.black,
        fontSize: SCALE_SIZE(14),
        fontFamily: FONT_NAME.medium
    },
})

export default ResetPassword;