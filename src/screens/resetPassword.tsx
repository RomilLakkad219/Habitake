import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native"

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

const ResetPassword = (props: any) => {

    const [isSecurePassword, setIsSecurePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSecureConfirmPassword, setIsConfirmSecurePassword] = useState(false);

    return (
        <View style={styles.container}>
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
})

export default ResetPassword;