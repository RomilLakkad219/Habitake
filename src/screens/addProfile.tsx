import React, { useRef, useState } from "react";
import { StyleSheet, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity, ImageBackground } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { AccountCreationSuccessSheet, Button, Header, Input, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

const AddProfile = (props: any) => {

    const accountCreationSuccessRef = useRef<any>('')

    const [phoneNumber, setPhoneNumber] = useState('');

    return (
        <View style={styles.container}>
            <Header
                type='basic'
                onBack={() => {
                    props.navigation.goBack()
                }} />
            <Text
                style={{ marginTop: SCALE_SIZE(14) }}
                font={FONT_NAME.regular}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(28)}>
                {STRING.fiil_your}
            </Text>
            <Text
                font={FONT_NAME.bold}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(28)}>
                {STRING.information_below}
            </Text>
            <Text
                style={{ marginTop: SCALE_SIZE(10) }}
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}
                size={SCALE_SIZE(16)}>
                {STRING.you_can_edit_this_later_on_your_account_setting}
            </Text>
            <View style={styles.profileView}>
                <Image
                    style={styles.editIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_edit} />
            </View>
            <Input
                style={{ marginTop: SCALE_SIZE(27) }}
                value={phoneNumber}
                placeholder={STRING.phone_number}
                keyboardType="numeric"
                isPhone={IMAGES.ic_phone}
                placeholderTextColor={COLORS.color_8A8E9D}
                onChangeText={(text) => {
                    setPhoneNumber(text)
                }} />
            <View style={{ flex: 1.0 }}></View>
            <Button
                onPress={() => {
                    accountCreationSuccessRef?.current?.open()
                }}
                style={styles.submitButtonStyle}
                title={STRING.submit} />
            <Text
                onPress={() => { }}
                align="center"
                style={{ marginBottom: SCALE_SIZE(20) }}
                font={FONT_NAME.medium}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(16)}>
                {STRING.skip}
            </Text>
            <AccountCreationSuccessSheet 
            onRef={accountCreationSuccessRef}
                onFinish={() => {
                    accountCreationSuccessRef?.current?.close()
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SCALE_SIZE(16)
    },
    profileView: {
        height: SCALE_SIZE(100),
        width: SCALE_SIZE(100),
        borderRadius: SCALE_SIZE(50),
        alignSelf: 'center',
        backgroundColor: 'gray',
        marginTop: SCALE_SIZE(46),
        position: 'relative',
    },
    editIcon: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        position: 'absolute',
        bottom: 0,
        right: 2,
    },
    submitButtonStyle: {
        marginBottom: SCALE_SIZE(24),
    },
})

export default AddProfile;