import React from "react";
import { Image, ImageBackground, Platform, SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";

//ASSETS
import { IMAGES } from "../assets";

//COMPONENTS
import Text from "./text";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

interface HeaderProps {
    style?: any
    onBack?: () => void;
    onHeart?: () => void;
    title?: string,
    type?: 'onboarding' | 'basic' | 'favourite' | 'home' | 'search';
    locationText?: any,
    onProfile?: () => void;
    onNotification?: () => void;
    profileIcon?: any,
    onFilter?: () => void;
}

const Header = (props: HeaderProps) => {
    if (props.type === 'onboarding') {
        return (
            <View>
                <SafeAreaView />
                <ImageBackground
                    style={styles.headerImage}
                    resizeMode="contain"
                    source={IMAGES.undraw_city_life}>
                    <TouchableOpacity
                        onPress={props.onBack}>
                        <Image
                            style={[styles.backIcon, {
                                marginLeft: SCALE_SIZE(25),
                                marginTop: SCALE_SIZE(10)
                            }]}
                            resizeMode="contain"
                            source={IMAGES.ic_back}>
                        </Image>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
    else if (props.type === 'basic') {
        return (
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    onPress={props.onBack}>
                    <Image
                        style={[styles.backIcon, {
                            // marginTop: SCALE_SIZE(10)
                        }]}
                        resizeMode="contain"
                        source={IMAGES.ic_back}>
                    </Image>
                </TouchableOpacity>
            </View>
        )
    }
    else if (props.type === 'favourite') {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.directionView}>
                    <TouchableOpacity
                        onPress={props.onBack}>
                        <Image
                            style={[styles.backIcon, {
                                marginTop: SCALE_SIZE(10)
                            }]}
                            resizeMode="contain"
                            source={IMAGES.ic_back}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={props.onHeart}>
                        <Image
                            style={styles.heartIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_big_red_heart}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else if (props.type === 'home') {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.homeDirectionView}>
                    <View>
                        <View style={styles.locationView}>
                            <Image
                                style={styles.locationIcon}
                                resizeMode="contain"
                                source={IMAGES.ic_location}>
                            </Image>
                            <Text
                                font={FONT_NAME.medium}
                                color={'#000929'}
                                size={SCALE_SIZE(16)}>
                                {STRING.location}
                            </Text>
                            <Image
                                style={styles.downArrow}
                                resizeMode="contain"
                                source={IMAGES.ic_down_arrow}>
                            </Image>
                        </View>
                        <Text
                            style={{ marginTop: SCALE_SIZE(4) }}
                            font={FONT_NAME.regular}
                            color={COLORS.color_8A8E9D}
                            size={SCALE_SIZE(12)}>
                            {props.locationText}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={props.onNotification}>
                        <Image
                            style={styles.notificationIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_notification}>
                        </Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={props.onProfile}>
                        <Image
                            style={styles.profileIcon}
                            resizeMode="contain"
                            source={props.profileIcon}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else if (props.type === 'search') {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.searchContainer}>
                    <TouchableOpacity
                        onPress={props.onBack}>
                        <Image
                            style={styles.backIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_back}>
                        </Image>
                    </TouchableOpacity>
                    <Text
                        size={SCALE_SIZE(16)}
                        align="center"
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}>
                        {props.title}
                    </Text>
                    <TouchableOpacity
                        onPress={props.onFilter}>
                        <Image
                            style={styles.filterIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_search_filter}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.headerContainer}>
                <Text
                    style={{ marginTop: SCALE_SIZE(20) }}
                    size={SCALE_SIZE(16)}
                    align="center"
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_333A54}>
                    {props.title}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
    },
    headerImage: {
        height: SCALE_SIZE(243)
    },
    headerContainer: {
        height: Platform.OS == 'ios' ? 44 : 56,
    },
    directionView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heartIcon: {
        height: SCALE_SIZE(84),
        width: SCALE_SIZE(84),
        alignSelf: 'center',
        marginTop: SCALE_SIZE(30)
    },
    homeDirectionView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(20),
        alignItems: 'center'
    },
    locationIcon: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    downArrow: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(8)
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    notificationIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        alignSelf: 'center'
    },
    profileIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        alignSelf: 'center',
        borderRadius: SCALE_SIZE(22),
        backgroundColor: 'gray',
        marginLeft: SCALE_SIZE(12)
    },
    searchContainer: {
        flexDirection: 'row',
        marginTop: Platform.OS == 'ios' ? 0 : SCALE_SIZE(20),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(16)
    },
    filterIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        alignSelf: 'center',
    }
})

export default Header;