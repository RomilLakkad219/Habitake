import React, { useState } from "react";
import { StyleSheet, Image, View, FlatList, Dimensions, TouchableOpacity, ImageBackground, SafeAreaView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import { Button, Header, Input, Text } from "../components"

//SCREENS
import { SCREENS } from ".";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const PropertyType = (props: any) => {

    const name = props?.route?.params?.name;
    const email = props?.route?.params?.email;
    const password = props?.route?.params?.password

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const [isSelectedProperty, setIsSelectedProperty] = useState<number | null>(null)
    const [selectedPropertyName, setSelectedPropertyName] = useState<string | null>(null);
    const [budget, setBudget] = useState<any>('')

    async function onValidateProperty() {
        if (!isSelectedProperty && isSelectedProperty !== 0) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_select_property_type,
                position: 'bottom',
            });
        }
        else if (!budget) {
            Toast.show({
                type: 'smallError',
                text1: STRING.please_add_property_budget,
                position: 'bottom',
            });
        }
        else {
            props.navigation.navigate(SCREENS.AddProfile.name, {
                name: name,
                password: password,
                email: email,
                propertyType: selectedPropertyName,
                budget: budget
            })
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
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={80}   // scrolls a bit more when focusing
                extraHeight={100}
            >
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
                                setSelectedPropertyName(item.name);
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
                                            source={isSelectedProperty === index ? IMAGES.ic_check_green : IMAGES.ic_check_white} />
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
                    style={styles.budgetInput}
                    value={budget}
                    placeholder={STRING.add_budget}
                    keyboardType="numeric"
                    placeholderTextColor={COLORS.color_8A8E9D}
                    onChangeText={(text) => {
                        setBudget(text)
                    }} />
                <Button
                    onPress={() => {
                        onValidateProperty()
                    }}
                    style={styles.nextButtonStyle}
                    title={STRING.next} />
                <TouchableOpacity>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(SCREENS.AddProfile.name, {
                                name: name,
                                password: password,
                                email: email,
                                propertyType: selectedPropertyName,
                                budget: budget
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
            </KeyboardAwareScrollView>
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
    budgetInput: {
        marginTop: SCALE_SIZE(27),
        color: COLORS.black
    }
})

export default PropertyType;