import React, { useRef } from "react";
import { StyleSheet, Image, View, FlatList, TouchableOpacity, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Header, LogoutSheet, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

const UserProfile = (props: any) => {

    const onLogoutRef = useRef<any>(null)

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
            <Text
                style={{ marginTop: SCALE_SIZE(12) }}
                size={SCALE_SIZE(14)}
                align="center"
                font={FONT_NAME.semiBold}
                color={COLORS.color_333A54}>
                {'Mathew Adam'}
            </Text>
            <Text
                style={{ marginTop: SCALE_SIZE(4) }}
                size={SCALE_SIZE(10)}
                align="center"
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}>
                {'mathew@gmail.com'}
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