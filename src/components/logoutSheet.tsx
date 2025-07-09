import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity } from 'react-native'

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import Text from "./text";

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

interface SheetProps {
    onRef?: any,
    onOpen?: () => void,
    onClose?: () => void,
    onFinish?: () => void,
    onLogout?: () => void,
    onCancel?: () => void
}

const LogoutSheet = (props: SheetProps) => {
    return (
        <RBSheet ref={props.onRef}
            closeOnPressMask={true}
            onOpen={props.onOpen}
            onClose={props.onClose}
            draggable={true}
            customStyles={{
                container: {
                    backgroundColor: COLORS.white,
                    height: Dimensions.get('window').height * 0.6,
                    borderTopLeftRadius: SCALE_SIZE(40),
                    borderTopRightRadius: SCALE_SIZE(40),
                },
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.3)'
                },
                draggableIcon: {
                    backgroundColor: COLORS.color_545A70,
                    height: 3,
                    width: SCALE_SIZE(68)
                }
            }}>
            <View style={{ marginHorizontal: SCALE_SIZE(16) }}>
                <Image
                    style={styles.successIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_success}>
                </Image>
                <Text
                    style={{ marginTop: SCALE_SIZE(31) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.are_you_sure_want_to}
                    <Text
                        font={FONT_NAME.extrabold}
                        align="center"
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(28)}>
                        {STRING.logout}
                    </Text>
                </Text>
                <Text
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.the_account}
                </Text>
                <View style={styles.buttonDirectionView}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={styles.logoutButton}
                            activeOpacity={1}
                            onPress={props.onLogout}>
                            <Text
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.bold}
                                color={COLORS.white}>
                                {STRING.logout_capital}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: SCALE_SIZE(12) }}></View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.cancelButton}
                            activeOpacity={1}
                            onPress={props.onCancel}>
                            <Text
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.regular}
                                color={COLORS.color_333A54}>
                                {STRING.cancel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SafeAreaView />
        </RBSheet>
    )
}

const styles = StyleSheet.create({
    successIcon: {
        height: SCALE_SIZE(162),
        width: SCALE_SIZE(162),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(60)
    },
    buttonDirectionView: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(65),
        alignItems: 'center',
    },
    logoutButton: {
        paddingVertical: SCALE_SIZE(18),
        paddingHorizontal: SCALE_SIZE(71),
        backgroundColor: COLORS.color_34216B,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(32),
    },
    cancelButton: {
        paddingVertical: SCALE_SIZE(18),
        paddingHorizontal: SCALE_SIZE(71),
        backgroundColor: COLORS.color_E6E6EA,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(32),
    }
})

export default LogoutSheet;