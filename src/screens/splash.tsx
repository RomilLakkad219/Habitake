import React, { useEffect } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { SCALE_SIZE } from "../constants";

//NAVIGATION
import { CommonActions } from "@react-navigation/native";

//SCREENS
import { SCREENS } from ".";

const Splash = (props: any) => {

    useEffect(() => {
        setTimeout(() => {
            moveToNext()
        }, 1000);
    }, [])

    async function moveToNext() {
        // const user = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS)
        // if (user) {
        //     const userJson = JSON.parse(user)
        //     setUser(userJson)

        //     props.navigation.dispatch(CommonActions.reset({
        //         index: 0,
        //         routes: [{
        //             name: SCREENS.Prepare.name
        //         }]
        //     }))
        // }
        // else {
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                    name: SCREENS.LoginIntroduction.name
                }]
            }))
        // }
    }

    return (
        <ImageBackground style={styles.container}
            resizeMode="cover"
            source={IMAGES.ic_splash}>
            <Image
                style={styles.habitakeLogo}
                resizeMode="contain"
                source={IMAGES.ic_habitake}>
            </Image>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        justifyContent: 'center'
    },
    habitakeLogo: {
        height: SCALE_SIZE(165),
        width: SCALE_SIZE(330),
        alignSelf: 'center',
        justifyContent: 'center'
    }
})

export default Splash;