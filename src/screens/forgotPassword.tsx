import React, { useState } from "react";
import { StyleSheet, View } from "react-native"

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

const ForgotPassword = (props: any) => {

    const [email, setEmail] = useState('');

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
                placeholder={STRING.email}
                autoCapitalize='none'
                placeholderTextColor={COLORS.color_8A8E9D}
                onChangeText={(text) => {
                    setEmail(text)
                }} />
            <View style={{ flex: 1 }}></View>
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.ResetPassword.name)
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
    }
})

export default ForgotPassword;