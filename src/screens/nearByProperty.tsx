import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, ImageBackground, FlatList, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import { Header, Text } from "../components";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NearByProperty = (props: any) => {

    const insets = useSafeAreaInsets();

    const STRING = USE_STRING();

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <Header
                type="basic"
                onBack={() => {
                    props.navigation.goBack()
                }}
                title={STRING.near_by_property_list} />
            <FlatList
                data={['', '', '']}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View style={[styles.propertyItemView, {
                        marginBottom: SCALE_SIZE(10),
                        marginTop: index == 0 ? SCALE_SIZE(20) : 0
                    }]}>
                        <ImageBackground
                            style={styles.propertyImages}
                            resizeMode="contain"
                            source={IMAGES.ic_residencial}>
                            <Image
                                style={styles.heartIcon}
                                resizeMode="contain"
                                source={
                                    index == 0 ? IMAGES.ic_square_red_heart : IMAGES.ic_un_heart
                                }
                            />
                        </ImageBackground>
                        <View style={{ flex: 1 }}>
                            <View style={styles.headerPropertyNameView}>
                                <Text
                                    size={SCALE_SIZE(17)}
                                    align="center"
                                    font={FONT_NAME.semiBold}
                                    color={COLORS.color_333A54}>
                                    {'Woodland Apartment'}
                                </Text>
                                <View style={{ flex: 1 }} />
                                <Text
                                    size={SCALE_SIZE(11)}
                                    align="center"
                                    font={FONT_NAME.semiBold}
                                    color={COLORS.color_01A669}>
                                    {'$340'}
                                </Text>
                            </View>
                            <View style={[styles.locationView, { marginTop: SCALE_SIZE(10) }]}>
                                <Image
                                    style={styles.locationIcon}
                                    resizeMode="contain"
                                    source={IMAGES.ic_location}
                                />
                                <Text
                                    font={FONT_NAME.medium}
                                    color={COLORS.color_545A70}
                                    size={SCALE_SIZE(10)}>
                                    {'1012 Ocean avenue, New York, USA'}
                                </Text>
                            </View>
                            <View style={styles.bathAndBedRoomView}>
                                <Image
                                    style={styles.bathroomIcon}
                                    resizeMode="contain"
                                    source={IMAGES.ic_bathroom}
                                />
                                <Text
                                    size={SCALE_SIZE(10)}
                                    align="center"
                                    font={FONT_NAME.medium}
                                    color={COLORS.color_545A70}>
                                    {'02 bathrooms'}
                                </Text>
                                <View style={{ marginLeft: SCALE_SIZE(12) }} />
                                <Image
                                    style={styles.bedroomIcon}
                                    resizeMode="contain"
                                    source={IMAGES.ic_bedroom}
                                />
                                <Text
                                    size={SCALE_SIZE(10)}
                                    align="center"
                                    font={FONT_NAME.medium}
                                    color={COLORS.color_545A70}>
                                    {'03 bedrooms'}
                                </Text>
                                <View style={{ flex: 1 }} />
                                {index === 0 ? (
                                    <TouchableOpacity style={styles.soldButton}>
                                        <Text
                                            size={SCALE_SIZE(10)}
                                            align="center"
                                            font={FONT_NAME.medium}
                                            color={COLORS.color_545A70}>
                                            {STRING.sold}
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={styles.availableButton}>
                                        <Text
                                            size={SCALE_SIZE(10)}
                                            align="center"
                                            font={FONT_NAME.medium}
                                            color={COLORS.white}>
                                            {STRING.available}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>
                    </View>
                )}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16)
    },
    propertyItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: SCALE_SIZE(15),
        padding: SCALE_SIZE(10),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    propertyImages: {
        height: SCALE_SIZE(89),
        width: SCALE_SIZE(89),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(12)
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationIcon: {
        height: SCALE_SIZE(10),
        width: SCALE_SIZE(8),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(3)
    },
    bathAndBedRoomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(10),
    },
    bathroomIcon: {
        height: SCALE_SIZE(14),
        width: SCALE_SIZE(14),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(4)
    },
    bedroomIcon: {
        height: SCALE_SIZE(14),
        width: SCALE_SIZE(14),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(4)
    },
    soldButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(66),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.color_E6E6EA80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    availableButton: {
        height: SCALE_SIZE(31),
        width: SCALE_SIZE(88),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.color_34216B,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerPropertyNameView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    heartIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        position: 'absolute',
        top: 6,
        right: 5,
        zIndex: 1,
    },
})

export default NearByProperty;