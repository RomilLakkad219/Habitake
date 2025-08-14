import React from "react";
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native'

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constants";

//COMPONENTƒ
import { Text } from '../components'

const Loader = (props:any) => {
    if (props.isLoading) {
        return (
            <View style={styles.container}>
                <View style={styles.indicatorContainer}>
                    <ActivityIndicator />
                </View>
            </View>
        )
    }
    if (props.isError) {
        return (
            <View style={styles.errorContainer}>
                <Text
                    size={SCALE_SIZE(15)}
                    align='center'
                    font={FONT_NAME.regular}
                    color={COLORS.black}>
                    {props.isError}
                </Text>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0
    },
    indicatorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: SCALE_SIZE(100)
    },
    errorContainer: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(16)
    },
    errorImage: {
        height: SCALE_SIZE(300),
        width: SCALE_SIZE(300),
        alignSelf: 'center'
    }
})

export default Loader;