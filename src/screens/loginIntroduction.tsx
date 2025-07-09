import React from "react";
import { StyleSheet, Image, View, Dimensions, ScrollView, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

const LoginIntroduction = (props: any) => {

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.container}>
                <SafeAreaView>
                    <Image
                        style={styles.introLogo}
                        resizeMode="contain"
                        source={IMAGES.ic_intro}>
                    </Image>
                    <Text
                        font={FONT_NAME.bold}
                        align="center"
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(28)}>
                        {'Lorem ipsum dolor sit amet\n consectetur.'}
                    </Text>
                    <Text
                        style={{ marginTop: SCALE_SIZE(10) }}
                        font={FONT_NAME.regular}
                        align="center"
                        color={COLORS.color_8A8E9D}
                        lineHeight={SCALE_SIZE(26)}
                        size={SCALE_SIZE(16)}>
                        {'Lorem ipsum dolor sit amet consectetur. Nunc nunc\n felis non erat neque fringilla commodo.'}
                    </Text>
                    <Button
                        onPress={() => {
                            props.navigation.navigate(SCREENS.Login.name)
                        }}
                        style={styles.loginButtonStyle}
                        title={STRING.login} />
                    <Text
                        style={{ marginBottom: SCALE_SIZE(10) }}
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
                </SafeAreaView>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white
    },
    introLogo: {
        height: ((Dimensions.get('window').width - SCALE_SIZE(32)) * SCALE_SIZE(490)) / SCALE_SIZE(396),
        width: Dimensions.get('window').width - SCALE_SIZE(32),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(20),
        marginBottom: SCALE_SIZE(48)
    },
    loginButtonStyle: {
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(74),
        marginBottom: SCALE_SIZE(50)
    }
})

export default LoginIntroduction;