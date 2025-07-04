import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

//COMPONENTS
import Text from "./text";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constants";

interface ButtonProps {
    style: any
    onPress?: () => void;
    disabled?: boolean;
    title: string
}

const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity
            disabled={props?.disabled == true ? true : false}
            style={[styles.buttonContainer, props.style]}
            onPress={props.onPress}>
            <Text
                font={FONT_NAME.semiBold}
                align="center"
                color={COLORS.white}
                size={SCALE_SIZE(16)}>
                {props.title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: SCALE_SIZE(56),
        backgroundColor: COLORS.color_34216B,
        borderRadius: SCALE_SIZE(32),
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
})

export default Button;