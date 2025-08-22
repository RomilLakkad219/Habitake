import React, { useContext, useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, ImageBackground } from "react-native"

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
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

//LOADER
import ProgressView from "./progressView";

const EditProfile = (props: any) => {

    const { profile, fetchProfile } = useContext(AuthContext)

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const [isSecurePassword, setIsSecurePassword] = useState<boolean>(false);
    const [name, setName] = useState<string>(profile?.username);
    const [password, setPassword] = useState<string>('12345');
    const [email, setEmail] = useState<string>(profile?.email || '');
    const [phoneNumber, setPhoneNumber] = useState<string>('1234567890');
    const [localImage, setLocalImage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function openLibrary() {
        const result = await launchImageLibrary({
            mediaType: 'photo',
        });

        if (result.didCancel) {
            console.log('User cancelled image picker');
        } else if (result.errorCode) {
        } else {
            setLocalImage(result?.assets?.[0]);
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
                "user_id": profile?.userId,
                "name": name == null ? '' : name,
                "email": email == null ? '' : email,
                "phone": "",
                "status": "",
                "role": "buyer",
                "profile_picture": localImage?.uri,
                "documents": [
                    {
                        "document_type": "",
                        "document_number": "",
                        "document_file": ""
                    },
                    {
                        "document_type": "",
                        "document_number": "",
                        "document_file": ""
                    }
                ]
            };

            setIsLoading(true)
            const result = await editUserProfile(params);
            setIsLoading(false);

            console.log('Update Profile Params', JSON.stringify(params));

            console.log("Update Profile Result", JSON.stringify(result));

            if (result.status) {
                await fetchProfile();
                props.navigation.goBack();
                SHOW_SUCCESS_TOAST(STRING.profile_updated_successfully);
            } else {
                SHOW_TOAST(result.error);
            }
        }
        catch (error) {
            SHOW_TOAST(error)
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
                    onPress={() => {
                        openLibrary()
                    }}>
                    <ImageBackground
                        style={[styles.profileView, { backgroundColor: COLORS.gray }]}
                        resizeMode="cover"
                        source={localImage
                            ? { uri: localImage?.uri } // if picked from library
                            : profile?.profilePicture   // if backend gives image
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
                    <View style={[styles.inputView, { marginTop: SCALE_SIZE(40) }]}>
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
                            editable={false}>
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