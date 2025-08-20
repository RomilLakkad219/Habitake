import React, { useContext, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from 'react-native'

//CONSTANT
import { COLORS, SHOW_TOAST, STORAGE_KEY } from "../constants";

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

    const { user, setProfile } = useContext(AuthContext)

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

        const storedUser = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS);
        if (storedUser) {
            var parsed = JSON.parse(storedUser)
        }

        const params = {
            user_id: parsed?.userId,
        }

        const result = await getUserProfile(params)

        console.log("PROFILE", JSON.stringify(result))
        
        if (result.status) {
            setProfile(result?.data?.data)
            redirectHome()
        }
        else {
            SHOW_TOAST(result?.error)
            // props.navigation.dispatch(CommonActions.reset({
            //     index: 0,
            //     routes: [{
            //         name: SCREENS.Login.name
            //     }]
            // }))
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