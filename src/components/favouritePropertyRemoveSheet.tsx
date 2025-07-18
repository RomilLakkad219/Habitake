import React from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native'

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import Text from "./text";

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";

interface SheetProps {
    onRef?: any,
    onOpen?: () => void,
    onClose?: () => void,
    onFinish?: () => void,
    onRemove?: () => void,
    onCancel?: () => void
}

const FavouritePropertyRemoveSheet = (props: SheetProps) => {
    return (
        <RBSheet ref={props.onRef}
            closeOnPressMask={true}
            onOpen={props.onOpen}
            onClose={props.onClose}
            draggable={true}
            customStyles={{
                container: {
                    backgroundColor: COLORS.white,
                    height: Dimensions.get('window').height * 0.4,
                    borderTopLeftRadius: SCALE_SIZE(40),
                    borderTopRightRadius: SCALE_SIZE(40),
                },
                wrapper: {
                    backgroundColor: 'rgba(0,0,0,0.3)'
                },
                draggableIcon: {
                    backgroundColor: COLORS.color_545A70,
                    height: 3,
                    width: SCALE_SIZE(68)
                }
            }}>
            <View style={{ marginHorizontal: SCALE_SIZE(16) }}>
                <Text
                    style={{ marginTop: SCALE_SIZE(28) }}
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(20)}>
                    {STRING.remove_from_favourite}
                </Text>
                <FlatList
                    data={['']}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={[styles.propertyItemView, { marginBottom: SCALE_SIZE(40) }]}>
                                <ImageBackground
                                    style={styles.propertyImages}
                                    resizeMode="contain"
                                    source={IMAGES.ic_residencial}>
                                    <Image
                                        style={styles.heartIcon}
                                        resizeMode="contain"
                                        source={index == 0 ? IMAGES.ic_square_red_heart : IMAGES.ic_un_heart} />
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
                                        <View style={{ flex: 1 }}></View>
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
                                            source={IMAGES.ic_location}>
                                        </Image>
                                        <Text
                                            font={FONT_NAME.medium}
                                            color={COLORS.color_545A70}
                                            size={SCALE_SIZE(10)}>
                                            {'1012 Ocean avanue, New yourk, USA'}
                                        </Text>
                                    </View>
                                    <View style={styles.bathAndBedRoomView}>
                                        <Image
                                            style={styles.bathroomIcon}
                                            resizeMode="contain"
                                            source={IMAGES.ic_bathroom}></Image>
                                        <Text
                                            size={SCALE_SIZE(10)}
                                            align="center"
                                            font={FONT_NAME.medium}
                                            color={COLORS.color_545A70}>
                                            {'02 bathrooms'}
                                        </Text>
                                        <View style={{ marginLeft: SCALE_SIZE(12) }}></View>
                                        <Image
                                            style={styles.bedroomIcon}
                                            resizeMode="contain"
                                            source={IMAGES.ic_bedroom}></Image>
                                        <Text
                                            size={SCALE_SIZE(10)}
                                            align="center"
                                            font={FONT_NAME.medium}
                                            color={COLORS.color_545A70}>
                                            {'03 bedrooms'}
                                        </Text>
                                        <View style={{ flex: 1 }}></View>
                                        <TouchableOpacity style={styles.soldButton}>
                                            <Text
                                                size={SCALE_SIZE(10)}
                                                align="center"
                                                font={FONT_NAME.medium}
                                                color={COLORS.color_545A70}>
                                                {STRING.sold}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                    ListFooterComponent={() => {
                        return <View style={{ marginBottom: SCALE_SIZE(10) }}></View>;
                    }}>
                </FlatList>
                <View style={styles.buttonDirectionView}>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity
                            style={styles.removeButton}
                            activeOpacity={1}
                            onPress={props.onRemove}>
                            <Text
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.bold}
                                color={COLORS.white}>
                                {STRING.yes_remove}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: SCALE_SIZE(12) }}></View>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.cancelButton}
                            activeOpacity={1}
                            onPress={props.onCancel}>
                            <Text
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.regular}
                                color={COLORS.color_333A54}>
                                {STRING.cancel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <SafeAreaView />
        </RBSheet>
    )
}

const styles = StyleSheet.create({
    buttonDirectionView: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(12),
        alignItems: 'center',
    },
    removeButton: {
        paddingVertical: SCALE_SIZE(18),
        // paddingHorizontal: SCALE_SIZE(51),
        backgroundColor: COLORS.color_34216B,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(32),
    },
    cancelButton: {
        paddingVertical: SCALE_SIZE(18),
        // paddingHorizontal: SCALE_SIZE(71),
        backgroundColor: COLORS.color_E6E6EA,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(32),
    },
    propertyItemView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: SCALE_SIZE(15),
        padding: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(24),
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
        height: SCALE_SIZE(21),
        width: SCALE_SIZE(44),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.color_E6E6EA80,
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

export default FavouritePropertyRemoveSheet;