import React from "react";
import { View, StyleSheet, ImageBackground, SafeAreaView, TouchableOpacity, Image } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANS
import { COLORS, SCALE_SIZE } from "../constants";

const TabBar = (props: any) => {

    function onPress(name: any, index: number) {
        props.navigation.emit(
            {
                type: 'onPress',
                target: name,
                canPreventDefault: true
            }
        )
        props.navigation.navigate(name)
    }

    return (
        <View style={{ backgroundColor: COLORS.color_FDFDFD, }}>
            <View
                style={styles.tabbarImage}>
                <View style={styles.tabContainer}>
                    {props.state.routes.map((route: any, index: number) => {
                        return (
                            <Item
                                key={index}
                                onPress={() => onPress(route.name, index)}
                                title={route.name}
                                index={index}
                                selected={props.state.index == index}
                                unreadCount={props.unreadCount}
                                image={images[index]} />
                        )
                    })}
                </View>
            </View>
            <SafeAreaView />
        </View>
    )
}

const images = [IMAGES.ic_home, IMAGES.ic_tab_search, IMAGES.ic_chat, IMAGES.ic_favourite];
const selectedGreenImages = [IMAGES.ic_home_green, IMAGES.ic_tab_search, IMAGES.ic_chat_green, IMAGES.ic_heart_fill];

const Item = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress}
            style={styles.itemContainer}>
            {props.selected ? (
                <View>
                    <Image
                        style={styles.itemImageSelected}
                        resizeMode="contain"
                        source={selectedGreenImages ? selectedGreenImages[props.index] : images[props.index]}
                    />
                </View>
            ) : (
                <Image
                    style={styles.itemImage}
                    resizeMode="contain"
                    source={images[props.index]}
                />
            )}
            {/* <Image style={props.selected ? styles.itemImageSelected : styles.itemImage}
                    resizeMode="contain"
                    source={images[props.index]} /> */}
            {props.selected &&
                <View
                    style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: COLORS.color_01A669,
                        marginTop: 4,
                    }}
                />
            }
        </TouchableOpacity >
    )
}

const styles = StyleSheet.create({
    tabbarImage: {
        marginTop: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(28),
        backgroundColor: COLORS.color_000929,
        borderRadius: SCALE_SIZE(24),
        marginHorizontal: SCALE_SIZE(16)
    },
    tabContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: SCALE_SIZE(55),
        paddingHorizontal: SCALE_SIZE(64),
        justifyContent: 'space-between',
    },
    itemContainer: {
        flex: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemImageSelected: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        tintColor: COLORS.color_01A669
    },
    itemImage: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        alignSelf: 'center'
    },
})

export default TabBar;