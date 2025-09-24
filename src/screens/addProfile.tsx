import React, { useRef, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, SafeAreaView, Platform, ImageBackground } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//API
import { register } from "../api";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_TOAST, STORAGE_KEY, USE_STRING } from "../constants";

//COMPONENTS
import { AccountCreationSuccessSheet, Button, Header, Input, Text } from "../components";

//LOADER
import ProgressView from "./progressView";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddProfile = (props: any) => {

    const accountCreationSuccessRef = useRef<any>('')

    const name = props?.route?.params?.name;
    const email = props?.route?.params?.email;
    const password = props?.route?.params?.password
    const propertyType = props?.route?.params?.propertyType;
    const budget = props?.route?.params?.budget

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const [phoneNumber, setPhoneNumber] = useState<any>('');
    const [localImage, setLocalImage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handlePhoneChange = (text: string) => {
        const cleaned = text.replace(/[^0-9]/g, "");
        setPhoneNumber(cleaned)
    };

    async function openLibrary() {
        try {
            const options: ImageLibraryOptions = {
                mediaType: 'photo',
                selectionLimit: 1,
                includeBase64: false,
                quality: 0.7,
                presentationStyle: 'fullScreen',
            };

            const result = await launchImageLibrary(options);
            if (result.didCancel) {
                console.log('User cancelled image picker');
            } else if (result.errorCode) {
                console.log('ImagePicker Error: ', result.errorCode);
            }
            else if (!result.didCancel && !result.errorCode && result?.assets && result.assets?.length > 0) {
                setLocalImage(result.assets[0]);
            }
        } catch (err) {
            SHOW_TOAST(err);
        }
    }

    async function onValidateProfile() {
        if (!phoneNumber) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_enter_phone_number,
                position: 'bottom',
            });
        }
        else {
            onRegisterUser()
        }
    }

    async function onRegisterUser() {
        try {
            let params: any = {
                username: name,
                password: password,
                email: email,
                role: "Buyer",
                firstName: "",
                lastName: "",
                phoneNumber: phoneNumber,
                profilePicture: "https://picsum.photos/200/300",
                propertyType: propertyType,
                dateOfBirth: "",
                gender: "",
                nationality: "",
                kycStatus: "",
                address: {
                    street: "",
                    city: "",
                    state: "",
                    zipCode: "",
                    country: "",
                },
            }

            // if (localImage?.uri) {
            //     params.profilePicture = localImage.uri;
            // }

            if (budget) {
                params.budget = budget
            }

            setIsLoading(true)
            const result: any = await register(params)
            setIsLoading(false)

            console.log('SIGNUP PRMS', params)
            console.log('SIGNUP PROFILE PIC', params.budget)

            console.log('SIGN UP RES', result)

            if (result?.registerUser?.success) {
                const userData = result.registerUser;
                await AsyncStorage.setItem(STORAGE_KEY.USER_DETAILS, JSON.stringify(userData))
                setTimeout(() => {
                    accountCreationSuccessRef?.current?.open()
                }, 1000);
            }
            else {
                console.log('SIGNUP ERR', result.registerUser?.message)
                Toast.show({
                    type: 'smallError',
                    text1: result.registerUser?.message,
                    position: 'bottom',
                });
            }
        }
        catch (err: any) {
            console.log('ERRRRRRR', err)
            Toast.show({
                type: 'smallError',
                text1: err,
                position: 'bottom',
            });
        }
    }

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <SafeAreaView />
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
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                    openLibrary()
                }}>
                <ImageBackground
                    style={[styles.profileView, { backgroundColor: COLORS.gray }]}
                    resizeMode="cover"
                    source={localImage ? { uri: localImage?.uri } : undefined}>
                </ImageBackground>
                <Image
                    style={styles.editIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_edit}
                />
            </TouchableOpacity>
            <Input
                style={{ marginTop: SCALE_SIZE(27) }}
                value={phoneNumber}
                maxLength={10}
                placeholder={STRING.phone_number}
                keyboardType="numeric"
                inputStyle={{ color: COLORS.black }}
                isPhone={IMAGES.ic_phone}
                placeholderTextColor={COLORS.color_8A8E9D}
                onChangeText={handlePhoneChange} />
            <View style={{ flex: 1.0 }}></View>
            <Button
                onPress={() => {
                    onValidateProfile()
                }}
                style={styles.submitButtonStyle}
                title={STRING.submit} />
            <TouchableOpacity>
                <Text
                    onPress={() => {
                        props.navigation.navigate(SCREENS.Otp.name, {
                            name: name,
                            password: password,
                            email: email,
                            propertyType: propertyType,
                            budget: budget,
                            phoneNumber: phoneNumber,
                            profileImage: localImage?.uri
                        })
                    }}
                    align="center"
                    style={{ marginBottom: SCALE_SIZE(20) }}
                    font={FONT_NAME.medium}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(16)}>
                    {STRING.skip}
                </Text>
            </TouchableOpacity>
            <SafeAreaView />
            <AccountCreationSuccessSheet
                onRef={accountCreationSuccessRef}
                onFinish={() => {
                    accountCreationSuccessRef?.current?.close()
                    props.navigation.navigate(SCREENS.Otp.name, {
                        name: name,
                        email: email,
                    })
                }} />
            {isLoading && <ProgressView />}
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
        marginTop: SCALE_SIZE(46),
        overflow: 'hidden',
    },
    editIcon: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(-35),
        left: SCALE_SIZE(30),
    },
    submitButtonStyle: {
        marginBottom: SCALE_SIZE(24),
    },
})

export default AddProfile;