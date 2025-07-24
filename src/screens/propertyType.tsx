import React, { useState } from "react";
import { StyleSheet, Image, View, FlatList, Dimensions, ScrollView, TouchableOpacity, ImageBackground, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components"

//SCREENS
import { SCREENS } from ".";

const PropertyType = (props: any) => {

    const [isSelectedProperty, setIsSelectedProperty] = useState<number>(0)
    const [budget, setBudget] = useState<any>('')

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    {STRING.select_your_preferable}
                </Text>
                <Text
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(28)}>
                    {STRING.property_type}
                </Text>
                <Text
                    style={{ marginTop: SCALE_SIZE(10) }}
                    font={FONT_NAME.regular}
                    color={COLORS.color_545A70}
                    size={SCALE_SIZE(16)}>
                    {STRING.you_can_edit_this_later_on_your_account_setting}
                </Text>
                <View >
                    <FlatList data={[
                        { propertyIcon: IMAGES.ic_residencial, name: 'Residential' },
                        { propertyIcon: IMAGES.ic_commercial, name: 'Commercial' },
                        { propertyIcon: IMAGES.ic_rental, name: 'Rental' },
                        { propertyIcon: IMAGES.ic_luxury, name: 'Luxury' }]}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => {
                                setIsSelectedProperty(index)
                            }}>
                                <ImageBackground
                                    style={[styles.propetyImages, {
                                        marginTop: index == 2 || index == 3 ? SCALE_SIZE(10) : SCALE_SIZE(46),
                                    }]}
                                    resizeMode="contain"
                                    source={item.propertyIcon}>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Image
                                            style={styles.checkMarkImage}
                                            resizeMode="contain"
                                            source={isSelectedProperty == index ? IMAGES.ic_check_green : IMAGES.ic_check_white} />
                                    </View>
                                    <View style={styles.contentWrapper}>
                                        <Text
                                            style={styles.propertyName}
                                            font={FONT_NAME.bold}
                                            color={COLORS.white}
                                            size={SCALE_SIZE(16)}>
                                            {item.name}
                                        </Text>
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        )}
                    >
                    </FlatList>
                </View>
                <Input
                    style={{ marginTop: SCALE_SIZE(27) }}
                    value={budget}
                    placeholder={STRING.add_budget}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.color_8A8E9D}
                    onChangeText={(text) => {
                        setBudget(text)
                    }} />
                <Button
                    onPress={() => {
                        props.navigation.navigate(SCREENS.AddProfile.name)
                    }}
                    style={styles.nextButtonStyle}
                    title={STRING.next} />
                <TouchableOpacity>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(SCREENS.AddProfile.name)
                        }}
                        align="center"
                        style={{ marginBottom: SCALE_SIZE(20) }}
                        font={FONT_NAME.medium}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.skip}
                    </Text>
                </TouchableOpacity>
            </ScrollView>
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
        marginTop: SCALE_SIZE(27),
        marginBottom: SCALE_SIZE(24),
    },
    propetyImages: {
        height: (Dimensions.get('window').width - SCALE_SIZE(42)) / 2,
        width: (Dimensions.get('window').width - SCALE_SIZE(42)) / 2,
        overflow: 'hidden',
        backgroundColor: 'transparent',
    },
    checkMarkImage: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        top: SCALE_SIZE(8),
        left: SCALE_SIZE(8),
        zIndex: 1,
        margin: SCALE_SIZE(8),
    },
    propertyName: {
        alignSelf: 'flex-start',
        marginLeft: SCALE_SIZE(12),
        marginBottom: SCALE_SIZE(8)
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
})

export default PropertyType;