import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Image } from 'react-native'

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import Text from "./text";
import Button from "./button";

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

interface SheetProps {
    onRef?: any,
    onOpen?: () => void,
    onClose?: () => void,
    onFinish?: () => void
}

const AccountCreationSuccessSheet = (props: SheetProps) => {

    const STRING = USE_STRING();
    
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
                    width: SCALE_SIZE(68),
                    marginTop: SCALE_SIZE(28)
                }
            }}>
            <View>
                <Image
                    style={styles.successIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_success}>
                </Image>
                <Text
                    style={{ marginTop: SCALE_SIZE(25) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.account}
                    <Text
                        font={FONT_NAME.extrabold}
                        align="center"
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(28)}>
                        {STRING.successfully}
                    </Text>
                </Text>
                <Text
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.created}
                </Text>
                <Text
                    style={{ marginTop: SCALE_SIZE(22) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_8A8E9D}
                    size={SCALE_SIZE(16)}>
                    {'Lorem ipsum dolor sit amet, consectetur.'}
                </Text>
                <Button
                    onPress={props.onFinish}
                    style={styles.buttonStyle}
                    title={STRING.finish} />
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
        marginTop: SCALE_SIZE(30)
    },
    buttonStyle: {
        marginTop: SCALE_SIZE(36),
        marginHorizontal: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(20)
    }
})

export default AccountCreationSuccessSheet;