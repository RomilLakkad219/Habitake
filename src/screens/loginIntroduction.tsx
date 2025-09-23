import React from "react";
import { StyleSheet, Image, View, Dimensions, SafeAreaView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import { Button, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginIntroduction = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <SafeAreaView >
                <Image
                    style={styles.introLogo}
                    resizeMode="cover"
                    source={IMAGES.ic_intro}>
                </Image>
                <Text
                    font={FONT_NAME.bold}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.login_intro_text}
                </Text>
                <Text
                    style={{ marginTop: SCALE_SIZE(10) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_8A8E9D}
                    lineHeight={SCALE_SIZE(26)}
                    size={SCALE_SIZE(16)}>
                    {STRING.login_intro_subtext}
                </Text>
                <Button
                    onPress={() => {
                        props.navigation.navigate(SCREENS.Login.name)
                    }}
                    style={styles.loginButtonStyle}
                    title={STRING.login} />
                <View style={{ marginBottom: SCALE_SIZE(10) }}>
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
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.color_FDFDFD
    },
    introLogo: {
        height: '60%',
        width: Dimensions.get('window').width - SCALE_SIZE(32),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(20),
        marginBottom: SCALE_SIZE(35),
        marginTop: SCALE_SIZE(10)
    },
    loginButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(30),
        marginBottom: SCALE_SIZE(35)
    }
})

export default LoginIntroduction;