import React, { useContext, useRef, useState } from "react";
import { StyleSheet, Image, View, FlatList, TouchableOpacity, SafeAreaView, Platform, ImageBackground } from "react-native"
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

//ASSETS
import { IMAGES } from "../assets";

//API
import { logOut } from "../api";

//CONTEXT
import { AuthContext } from "../context";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import { Header, LogoutSheet, Text } from "../components";

//LOADER
import ProgressView from "./progressView";

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const UserProfile = (props: any) => {

    useFocusEffect(
        React.useCallback(() => {
            const subscription = BackHandler.addEventListener(
                "hardwareBackPress",
                () => {
                    props.navigation.goBack();
                    return true; // prevent default
                }
            );

            return () => subscription.remove();
        }, [props.navigation])
    );

    const { profile } = useContext(AuthContext)

    const STRING = USE_STRING();

    console.log("User Profile Screen", profile);

    const insets = useSafeAreaInsets()

    const onLogoutRef = useRef<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const profileItem = [
        {
            title: STRING.edit_profile,
            key: 'edit_profile'
        },
        {
            title: STRING.privacy_policy,
            key: 'privacy_policy'
        },
        {
            title: STRING.term_conditions,
            key: 'term_condition'
        },
        {
            title: STRING.support,
            key: 'support'
        },
        {
            title: STRING.logout_capital,
            key: 'logout'
        }
    ]

    async function onLogout() {

        try {
            const params = {
                "user_id": profile?.userId
            }
            setIsLoading(true);
            const result = await logOut(params);
            setIsLoading(false)

            console.log("LOGOUT RESPONSE", JSON.stringify(result));

            await AsyncStorage.clear();

            setTimeout(() => {
                setIsLoading(false);
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: SCREENS.Login.name,
                            },
                        ],
                    }),
                );
            }, 500);
        } catch (error: any) {
            setIsLoading(false);
            Toast.show({
                type: 'smallError',
                text1: error,
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
                type="home"
                locationText={'1012 Ocean avanue, New yourk, USA'}
                profileIcon={true}
                onNotification={() => {
                    props.navigation.navigate(SCREENS.Notification.name)
                }} />
            <Text
                style={{ marginTop: SCALE_SIZE(24) }}
                size={SCALE_SIZE(16)}
                align="center"
                font={FONT_NAME.semiBold}
                color={COLORS.color_333A54}>
                {STRING.profile}
            </Text>
            {profile?.profilePicture ?
                <ImageBackground
                    style={styles.profileView}
                    resizeMode="cover"
                    source={{ uri: profile?.profilePicture }}>
                </ImageBackground>
                :
                <View
                    style={[styles.profileView, { backgroundColor: COLORS.gray }]}>
                </View>
            }
            {/* <Image
                style={styles.editIcon}
                resizeMode="contain"
                source={IMAGES.ic_edit}
            /> */}
            <Text
                style={{ marginTop: SCALE_SIZE(12) }}
                size={SCALE_SIZE(14)}
                align="center"
                font={FONT_NAME.semiBold}
                color={COLORS.color_333A54}>
                {profile?.firstName ?? ''}
            </Text>
            <Text
                style={{ marginTop: SCALE_SIZE(4) }}
                size={SCALE_SIZE(10)}
                align="center"
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}>
                {profile?.email ?? ''}
            </Text>
            <FlatList data={profileItem}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={[styles.itemView, {
                            backgroundColor: item.key == 'logout' ? COLORS.color_01A669 : COLORS.color_E6E6EA66,
                            marginTop: index == 0 ? SCALE_SIZE(40) : SCALE_SIZE(10),
                        }]}
                            onPress={() => {
                                if (item.key == 'edit_profile') {
                                    props.navigation.navigate(SCREENS.EditProfile.name)
                                }
                                else if (item.key == 'privacy_policy') {
                                }
                                else if (item.key == 'term_condition') {
                                }
                                else if (item.key == 'support') {
                                }
                                else if (item.key == 'logout') {
                                    onLogoutRef?.current?.open()
                                }
                            }}>
                            <Text
                                style={styles.itemTitle}
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.medium}
                                color={item.key == 'logout' ? COLORS.white : COLORS.color_000929}>
                                {item.title}
                            </Text>
                            <Image
                                style={[styles.itemImage, { tintColor: item.key == 'logout' ? COLORS.white : COLORS.black }]}
                                resizeMode="contain"
                                source={IMAGES.ic_next} />
                        </TouchableOpacity>
                    )
                }}>
            </FlatList>
            <LogoutSheet
                onRef={onLogoutRef}
                onCancel={() => {
                    onLogoutRef?.current?.close()
                }}
                onLogout={() => {
                    onLogoutRef?.current?.close()
                    onLogout()
                }} />
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
    itemView: {
        borderRadius: SCALE_SIZE(24),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SCALE_SIZE(20),
        paddingHorizontal: SCALE_SIZE(16)
    },
    itemTitle: {
        flex: 1.0
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
    }
})

export default UserProfile;