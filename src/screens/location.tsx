import React, { useState } from "react";
import { StyleSheet, Image, View, TouchableOpacity, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components";

//PACKAGES
import { BlurView } from '@react-native-community/blur';

//SCREENS
import { SCREENS } from ".";

const Location = (props: any) => {

    const [locationDetails, setLocationDetails] = useState('');

    return (
        <View style={styles.container}>
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
                {STRING.add}
                <Text
                    font={FONT_NAME.regular}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.your}
                    <Text
                        font={FONT_NAME.bold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(28)}>
                        {STRING.location}
                    </Text>
                </Text>
            </Text>
            <Text
                style={{ marginTop: SCALE_SIZE(10) }}
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}
                size={SCALE_SIZE(16)}>
                {STRING.you_can_edit_this_later_on_your_account_setting}
            </Text>
            <View style={styles.mapContainer}>
                {/* <BlurView
                    style={styles.blurContent}
                    blurType="light"
                    blurAmount={15}
                    reducedTransparencyFallbackColor="white"
                >
                    <TouchableOpacity style={styles.selectOnMapButton}>
                        <Text
                            font={FONT_NAME.regular}
                            align="center"
                            color={COLORS.color_252B5C}
                            size={SCALE_SIZE(16)}>
                            {STRING.select_on_map}
                        </Text>
                    </TouchableOpacity>
                </BlurView> */}
            </View>
            <Text
                style={{ marginTop: SCALE_SIZE(36) }}
                font={FONT_NAME.regular}
                color={COLORS.color_545A70}
                size={SCALE_SIZE(16)}>
                {STRING.select_your_location_to_find_relevant_properties_near_you}
            </Text>
            <Input
                style={styles.locationDetailView}
                value={locationDetails}
                isLocation={IMAGES.ic_location}
                isNext={IMAGES.ic_next}
                placeholder={STRING.location_detail}
                autoCapitalize='none'
                placeholderTextColor={COLORS.color_8A8E9D}
                onChangeText={(text) => {
                    setLocationDetails(text)
                }} />
            <View style={{ flex: 1 }}></View>
            <Button
                onPress={() => {
                    props.navigation.navigate(SCREENS.LocationSearch.name)
                }}
                style={styles.nextButtonStyle}
                title={STRING.next} />
            <TouchableOpacity>
                <Text
                    onPress={() => {
                        props.navigation.navigate(SCREENS.LocationSearch.name)
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: COLORS.white,
        paddingHorizontal: SCALE_SIZE(16)
    },
    mapContainer: {
        height: SCALE_SIZE(309),
        width: SCALE_SIZE(396),
        borderRadius: SCALE_SIZE(34),
        alignSelf: 'center',
        backgroundColor: 'gray',
        marginTop: SCALE_SIZE(46),
        overflow: 'hidden',
    },
    blurContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectOnMapButton: {
        paddingVertical: SCALE_SIZE(50),
        paddingHorizontal: SCALE_SIZE(30),
        alignItems: 'center',
        backgroundColor: "#FFFFFF80",
    },
    nextButtonStyle: {
        marginBottom: SCALE_SIZE(24),
    },
    locationDetailView: {
        marginTop: SCALE_SIZE(14)
    }
})

export default Location;