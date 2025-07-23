import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

const EditProfile = (props: any) => {

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [name, setName] = useState<string>('Mathew Adam');
    const [password, setPassword] = useState<string>('12345');
    const [email, setEmail] = useState<string>('mathew@gmail.com');
    const [phoneNumber, setPhoneNumber] = useState<string>('1234567890');

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                type="home"
                locationText={'1012 Ocean avanue, New yourk, USA'}
                profileIcon={() => {

                }}
                onNotification={() => {
                    props.navigation.navigate(SCREENS.Notification.name)
                }} />
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled">
                <Text
                    style={{ marginTop: SCALE_SIZE(24) }}
                    size={SCALE_SIZE(16)}
                    align="center"
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_333A54}>
                    {STRING.profile}
                </Text>
                <View style={styles.profileView}>
                    <Image
                        style={styles.editIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_edit}
                    />
                </View>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}>
                    <View style={[styles.inputView, { marginTop: SCALE_SIZE(40) }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_user} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={name}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={(text) => {
                                setName(text)
                            }}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputView, { marginTop: SCALE_SIZE(20) }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_email} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={email}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                        // editable={false}
                        >

                        </TextInput>
                    </View>
                    <View style={[styles.inputView, { marginTop: SCALE_SIZE(20) }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_phone} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={phoneNumber}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={(text) => {
                                setPhoneNumber(text)
                            }}
                            keyboardType="numeric">

                        </TextInput>
                    </View>
                    <View style={[styles.inputView, { marginTop: SCALE_SIZE(20) }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_lock} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={password}
                            secureTextEntry={!isSecurePassword}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                        // editable={false}
                        >
                        </TextInput>
                        <View style={{ flex: 1 }}></View>
                        <TouchableOpacity onPress={() => {
                            setIsSecurePassword(!isSecurePassword)
                        }}>
                            <Image
                                style={[styles.inputImages, { tintColor: COLORS.black }]}
                                resizeMode="contain"
                                source={!isSecurePassword ? IMAGES.ic_hide : IMAGES.ic_eye} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                <Button
                    style={styles.updateButton}
                    onPress={() => {

                    }}
                    title={STRING.update} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16)
    },
    profileView: {
        height: SCALE_SIZE(100),
        width: SCALE_SIZE(100),
        backgroundColor: 'gray',
        borderRadius: SCALE_SIZE(50),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(42),
    },
    editIcon: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(65),
        left: SCALE_SIZE(30),
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.color_E6E6EA,
        borderRadius: SCALE_SIZE(10),
        paddingVertical: Platform.OS == 'ios' ? SCALE_SIZE(20) : 0,
        paddingHorizontal: SCALE_SIZE(16)
    },
    inputImages: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    inputTextStyle: {
        fontSize: SCALE_SIZE(14),
        fontFamily: FONT_NAME.semiBold,
        color: COLORS.color_333A54,
    },
    updateButton: {
        marginTop: SCALE_SIZE(50),
        marginBottom: SCALE_SIZE(20)
    }
})

export default EditProfile;