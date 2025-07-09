import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, Platform, TextInput, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//SCREENS
import { SCREENS } from ".";

const LocationSearch = (props: any) => {

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                type='basic'
                onBack={() => {
                    props.navigation.goBack()
                }} />
            <View style={styles.searchView}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={styles.searchStyle}>
                        <Image
                            style={styles.searchImage}
                            resizeMode="contain"
                            source={IMAGES.ic_search} />
                        <TextInput
                            style={styles.searchTextStyle}
                            placeholder={STRING.find_location}
                            placeholderTextColor={COLORS.color_B0B3BD}
                            onChangeText={(text) => {
                            }}>
                        </TextInput>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={styles.locationDetailView}>
                <Text
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(16)}>
                    {STRING.location_detail}
                </Text>
                <View style={styles.addressView}>
                    <Image
                        style={styles.locationIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_locate_finder} />
                    <Text
                        font={FONT_NAME.regular}
                        color={COLORS.color_545A70}
                        size={SCALE_SIZE(16)}>
                        {'Srengseng, Kembangan, West Jakarta\nCity, Jakarta 11630'}
                    </Text>
                </View>
            </View>
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.PropertyType.name)
                }}
                style={styles.nextButtonStyle}
                title={STRING.next} />
            <Text
                onPress={() => { }}
                align="center"
                style={{ marginBottom: SCALE_SIZE(20) }}
                font={FONT_NAME.medium}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(16)}>
                {STRING.skip}
            </Text>
            <SafeAreaView />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: 'gray',
        paddingHorizontal: SCALE_SIZE(16)
    },
    searchView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(13),
    },
    searchStyle: {
        height: SCALE_SIZE(56),
        backgroundColor: '#FFFFFFCC',
        borderRadius: SCALE_SIZE(32),
        flexDirection: 'row',
    },
    searchTextStyle: {
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        marginLeft: SCALE_SIZE(12),
        flex: 1.0
    },
    nextButtonStyle: {
        marginTop: SCALE_SIZE(50),
        marginBottom: SCALE_SIZE(24),
    },
    searchImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(16)
    },
    locationDetailView: {
        backgroundColor: '#FFFFFFCC',
        borderRadius: SCALE_SIZE(25),
        paddingHorizontal: SCALE_SIZE(16),
        paddingVertical: SCALE_SIZE(20)
    },
    addressView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(10)
    },
    locationIcon: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        alignSelf: 'center'
    }
})

export default LocationSearch;