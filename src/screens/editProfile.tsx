import React, { useContext, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, ImageBackground } from "react-native"
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

//API
import { editUserProfile } from "../api";

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, SHOW_SUCCESS_TOAST, SHOW_TOAST, USE_STRING } from "../constants";

//CONTEXT
import { AuthContext } from "../context";

//COMPONENTS
import { Button, Header, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchImageLibrary, launchCamera, ImageLibraryOptions } from 'react-native-image-picker';
import Toast from "react-native-toast-message";

//LOADER
import ProgressView from "./progressView";

const EditProfile = (props: any) => {

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                if (props.navigation.canGoBack()) {
                    props.navigation.goBack();
                } else {
                    BackHandler.exitApp()
                }
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [props.navigation])
    );

    const { profile, fetchProfile } = useContext(AuthContext)

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [name, setName] = useState<string>(profile?.firstName);
    const [password, setPassword] = useState<string>('12345');
    const [email, setEmail] = useState<string>(profile?.email || '');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [localImage, setLocalImage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    async function openCamera() {
        const result = await launchCamera({
            mediaType: 'mixed',
            cameraType: 'back',
            maxWidth: 500,
            maxHeight: 500,
            quality: 1,
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.errorCode) {
            console.log('ImagePicker Error: ', result.errorCode);
        } else {
            setLocalImage(result?.assets?.[0]);
        }
    }

    const handleFullNameChange = (text: string) => {
        // Allow only letters (a-z, A-Z) and spaces
        const cleanedText = text.replace(/[^a-zA-Z\s]/g, '');
        setName(cleanedText);
    };

    async function updateProfile() {
        try {
            const params = {
                "userId": profile?.userId,
                input: {
                    "name": name == null ? '' : name,
                    "phone": "",
                    "status": "",
                    "profilePicture": localImage?.uri
                }
            };

            setIsLoading(true)
            const result: any = await editUserProfile(params);
            setIsLoading(false);

            console.log('Update Profile Params', JSON.stringify(params));

            console.log("Update Profile Result", JSON.stringify(result));

            if (result?.updateUser?.success) {
                await fetchProfile();
                props.navigation.goBack();
                SHOW_SUCCESS_TOAST(STRING.profile_updated_successfully);
            } else {
                Toast.show({
                    type: 'smallError',
                    text1: result?.updateUser?.message,
                    position: 'bottom',
                });
            }
        }
        catch (error: any) {
            Toast.show({
                type: 'smallError',
                text1: error,
                position: 'bottom',
            });
        }
    }

    return (
        <View style={[styles.container, { marginTop: Platform.OS === 'android' ? insets.top : 0, paddingBottom: Platform.OS === 'android' ? insets.bottom : 0 }]}>
            <SafeAreaView />
            <Header
                type="home"
                locationText={'1012 Ocean avanue, New yourk, USA'}
                profileIcon={true}
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
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                        openLibrary()
                    }}>
                    <ImageBackground
                        style={[styles.profileView, { backgroundColor: COLORS.gray }]}
                        resizeMode="cover"
                        source={localImage
                            ? { uri: localImage?.uri }
                            : profile?.profilePicture
                                ? { uri: profile.profilePicture }
                                : undefined}>
                    </ImageBackground>
                    <Image
                        style={styles.editIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_edit}
                    />
                </TouchableOpacity>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}>
                    <View style={[styles.inputView, {
                        marginTop: SCALE_SIZE(40),
                        backgroundColor: COLORS.white
                    }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_user} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={name}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={handleFullNameChange}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputView, {
                        marginTop: SCALE_SIZE(20),
                        backgroundColor: COLORS.color_E6E6EA
                    }]}>
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
                            editable={false}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputView, {
                        marginTop: SCALE_SIZE(20),
                        backgroundColor: COLORS.color_E6E6EA
                    }]}>
                        <Image
                            style={styles.inputImages}
                            resizeMode="contain"
                            source={IMAGES.ic_phone} />
                        <TextInput
                            style={styles.inputTextStyle}
                            value={phoneNumber}
                            placeholder={STRING.please_enter_phone_number}
                            placeholderTextColor={COLORS.color_333A54}
                            onChangeText={(text) => {
                                setPhoneNumber(text)
                            }}
                            keyboardType="numeric"
                            editable={false}>
                        </TextInput>
                    </View>
                    <View style={[styles.inputView, {
                        marginTop: SCALE_SIZE(20),
                        backgroundColor: COLORS.color_E6E6EA
                    }]}>
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
                            editable={false}>
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
                        updateProfile()
                    }}
                    title={STRING.update} />
            </ScrollView>
            {isLoading && <ProgressView />}
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
        borderRadius: SCALE_SIZE(50),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(42),
        overflow: 'hidden',
    },
    editIcon: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(-35),
        left: SCALE_SIZE(30),
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
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