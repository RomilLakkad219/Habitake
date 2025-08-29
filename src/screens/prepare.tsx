import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from 'react-native'

//CONSTANT
import { COLORS, STORAGE_KEY } from "../constants";

//CONTEXT
import { AuthContext } from "../context";

//API
import { getUserProfile } from "../api";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Prepare = (props: any) => {

    const { setProfile } = useContext(AuthContext)

    const userData = props?.route?.params?.userData;

    useEffect(() => {
        fetchProfile()
    }, [])

    async function redirectHome() {
        props.navigation.dispatch(CommonActions.reset({
            index: 0,
            routes: [{
                name: SCREENS.BottomBar.name,
            }]
        }))
    }

    async function fetchProfile() {

        const params = {
            user_id: userData?.userId,
        }

        const result = await getUserProfile(params)

        console.log("PROFILE", JSON.stringify(result),params)

        if (result.status) {
            setProfile(result?.data?.data)
            await AsyncStorage.setItem(STORAGE_KEY.USER_DETAILS, JSON.stringify(result?.data?.data))
            redirectHome()
        }
        else {
            props.navigation.dispatch(CommonActions.reset({
                index: 0,
                routes: [{
                    name: SCREENS.Login.name
                }]
            }))
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Prepare;