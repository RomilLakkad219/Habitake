import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, StyleProp, ViewStyle, KeyboardTypeOptions, View, TextInput, Platform } from "react-native";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE } from "../constants";

interface InputProps {
    style?: StyleProp<ViewStyle> | undefined;
    inputStyle?: StyleProp<ViewStyle> | undefined;
    placeholder?: string | undefined;
    title?: string | undefined;
    onChangeText?: (text: string) => void;
    secureTextEntry?: boolean | undefined;
    multiline?: boolean | undefined;
    value?: string | null;
    keyboardType?: KeyboardTypeOptions | undefined;
    editable?: boolean | undefined;
    secureIcon?: any;
    placeholderTextColor?: string | undefined;
    numberOfLines?: number;
    onPress?: () => void;
    error?: string;
    input?: StyleProp<ViewStyle> | undefined;
    secureIconStyle?: StyleProp<ViewStyle>;
    isLoading?: boolean;
    onEndEditing?: () => void;
    onSubmitEditing?: () => void;
    onPressSecureIcon?: () => void;
    pointerEvents?: "box-none" | "none" | "box-only" | "auto" | undefined;
    maxLength?: number | undefined;
    autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
    onKeyPress?: (e: any) => void;
    isEmail?: any; // This can be an Image source or a boolean,
    isLock?: any; // This can be an Image source or a boolean,
    isUser?: any; // This can be an Image source or a boolean,
    isPhone?: any,
    isLocation?: any,
    isNext?: any
}

const Input = (props: InputProps) => {

    const [enable, setEnable] = useState(false)

    return (
        <View style={props.style}>
            <View style={styles.inputContainer}>
                {props.isEmail &&
                    <View>
                        <Image
                            style={styles.emailIcon}
                            resizeMode="contain"
                            source={props.isEmail} />
                    </View>
                }
                {props.isLock &&
                    <View>
                        <Image
                            style={styles.lockIcon}
                            resizeMode="contain"
                            source={props.isLock} />
                    </View>
                }
                {props.isUser &&
                    <View>
                        <Image
                            style={styles.userIcon}
                            resizeMode="contain"
                            source={props.isUser} />
                    </View>
                }
                {props.isPhone &&
                    <View>
                        <Image
                            style={styles.userIcon}
                            resizeMode="contain"
                            source={props.isPhone} />
                    </View>
                }
                {props.isLocation &&
                    <Image
                        style={styles.locationIcon}
                        resizeMode="contain"
                        source={props.isLocation}>
                    </Image>
                }
                <TextInput
                    {...props}
                    style={[styles.input, props.inputStyle]}
                    onFocus={() => {
                        setEnable(true)
                    }}
                    onEndEditing={() => {
                        setEnable(false)
                        props?.onEndEditing?.()
                    }}
                    onBlur={() => {
                        setEnable(false)
                    }}
                    onSubmitEditing={() => {
                        props?.onSubmitEditing?.()
                        setEnable(false)
                    }}
                    onChangeText={props.onChangeText}
                    pointerEvents={props.pointerEvents}
                    maxLength={props.maxLength}
                    autoCapitalize={props.autoCapitalize}
                    placeholderTextColor={props.placeholderTextColor}
                    secureTextEntry={props.secureTextEntry}
                    onKeyPress={props.onKeyPress}
                    keyboardType={props.keyboardType}>
                </TextInput>
                {props.secureIcon &&
                    <TouchableOpacity onPress={props.onPressSecureIcon}>
                        <Image
                            style={styles.eyeHidden}
                            resizeMode="contain"
                            source={props.secureIcon} />
                    </TouchableOpacity>
                }
                {props.isNext &&
                    <Image
                        style={styles.nextIcon}
                        resizeMode="contain"
                        source={props.isNext}>
                    </Image>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        backgroundColor: COLORS.color_E6E6EA66,
        borderRadius: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(16),
        justifyContent: 'center',
        height: Platform.OS == 'android' ? 48 : 48,
        flexDirection: 'row',
        alignItems: 'center'
    },
    input: {
        flex: 1.0,
        fontFamily: FONT_NAME.regular,
        fontSize: SCALE_SIZE(14),
    },
    eyeHidden: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(16)
    },
    emailIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    lockIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    userIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    locationIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(10)
    },
    nextIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
    }
})

export default Input;