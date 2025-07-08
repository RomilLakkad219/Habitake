import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, Dimensions, ScrollView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constants";

//COMPONENTS
import { Header, Text } from "../components";

//PACKAGES
import { BlurView } from "@react-native-community/blur";

//SCREENS
import { SCREENS } from ".";

const PropertyDetail = (props: any) => {

    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [comment, setComment] = useState('')

    const imageList = [
        IMAGES.ic_luxury,
        IMAGES.ic_commercial,
        IMAGES.ic_rental,
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ImageBackground
                    style={styles.propertyImage}
                    resizeMode="cover"
                    source={IMAGES.luxury_bg}>
                    <View style={{ flex: 1 }}>
                        <Header
                            type="favourite"
                            onBack={() => {
                                props.navigation.goBack()
                            }}
                        />
                    </View>
                    <View style={styles.bottomView}>
                        <View style={styles.propertyTypeTag}>
                            <Text
                                size={SCALE_SIZE(16)}
                                align="center"
                                font={FONT_NAME.semiBold}
                                color={COLORS.white}>
                                {STRING.luxury}
                            </Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.rightImageStack}>
                            {imageList &&
                                <>
                                    {imageList.map((img, index) => (
                                        <View key={index} style={styles.sideImageContainer}>
                                            <Image source={img} style={styles.sideImage} />
                                            {index === 2 && (
                                                <View style={styles.overlay}>
                                                    <Text size={SCALE_SIZE(18)}
                                                        align="center"
                                                        font={FONT_NAME.medium}
                                                        color={COLORS.color_ECEDF3}>+3</Text>
                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </>
                            }
                        </View>
                    </View>
                </ImageBackground>
                <Text
                    style={styles.propertyName}
                    size={SCALE_SIZE(24)}
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}>
                    {'Tranquil Haven in the Woods'}
                </Text>
                <View style={styles.likeChatShareView}>
                    <View style={styles.rowView}>
                        <Image
                            style={styles.likeChatShareIcons}
                            resizeMode="contain"
                            source={IMAGES.thumb} />
                        <Text
                            size={SCALE_SIZE(16)}
                            align="center"
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {'200'}
                        </Text>
                    </View>
                    <View style={styles.verticalLineFirst}></View>
                    <View style={styles.rowView}>
                        <Image
                            style={styles.likeChatShareIcons}
                            resizeMode="contain"
                            source={IMAGES.chat} />
                        <Text
                            size={SCALE_SIZE(16)}
                            align="center"
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {'04'}
                        </Text>
                    </View>
                    <View style={styles.verticalLineSecond}></View>
                    <View style={styles.rowView}>
                        <Image
                            style={styles.likeChatShareIcons}
                            resizeMode="contain"
                            source={IMAGES.share} />
                        <Text
                            size={SCALE_SIZE(16)}
                            align="center"
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {STRING.share}
                        </Text>
                    </View>
                </View>
                <TextInput style={styles.commentInput}
                    placeholder={STRING.write_comment}
                    value={comment}
                    placeholderTextColor={COLORS.color_545A70}
                    onChangeText={(text) => {
                        setComment(text)
                    }}>
                </TextInput>
                <View style={styles.optionContainer}>
                    <Option title={STRING.description}
                        selected={selectedIndex == 0}
                        onPress={() => {
                            setSelectedIndex(0)
                        }} />
                    <Option title={STRING.gallery}
                        selected={selectedIndex == 1}
                        onPress={() => {
                            setSelectedIndex(1)
                        }} />
                </View>
                {selectedIndex == 0 &&
                    <>
                        <View>
                            <FlatList
                                data={[
                                    { name: '2 Bedroom', image: IMAGES.ic_bedroom },
                                    { name: '1 Bathroom', image: IMAGES.ic_bathroom },
                                    { name: '2 Bedroom', image: IMAGES.ic_bedroom },
                                    { name: '1 Bathroom', image: IMAGES.ic_bathroom }
                                ]}
                                horizontal
                                scrollEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={[styles.itemView, {
                                                paddingHorizontal: SCALE_SIZE(25),
                                                paddingVertical: SCALE_SIZE(15),
                                                marginTop: SCALE_SIZE(24),
                                                marginLeft: SCALE_SIZE(10)
                                            }]}>
                                            {item.image &&
                                                <Image
                                                    style={styles.itemImage}
                                                    resizeMode="contain"
                                                    source={item.image} />
                                            }
                                            <Text
                                                size={SCALE_SIZE(16)}
                                                align="center"
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_333A54}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    );
                                }}
                                ListFooterComponent={() => {
                                    return <View style={{ marginRight: SCALE_SIZE(16) }}></View>;
                                }}>
                            </FlatList>
                        </View>
                        <Text
                            style={styles.facilityStyle}
                            size={SCALE_SIZE(16)}
                            font={FONT_NAME.semiBold}
                            color={COLORS.color_333A54}>
                            {STRING.facilities}
                        </Text>
                        <View>
                            <FlatList data={[
                                { name: 'Car Parking', image: IMAGES.ic_bedroom },
                                { name: 'Swimming', image: IMAGES.ic_bathroom },
                                { name: 'Gym & Fit', image: IMAGES.ic_bedroom },
                                { name: 'Restaurant', image: IMAGES.ic_bathroom },
                                { name: 'Wi-Fi', image: IMAGES.ic_bathroom },
                                { name: 'Laundry', image: IMAGES.ic_bathroom }
                            ]}
                                showsVerticalScrollIndicator={false}
                                numColumns={3}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View
                                            style={[styles.itemView, {
                                                // paddingHorizontal: SCALE_SIZE(19),
                                                // paddingVertical: SCALE_SIZE(10),
                                                marginTop: index == 0 || index == 1 || index == 2 ? SCALE_SIZE(16) : SCALE_SIZE(14),
                                                marginLeft: SCALE_SIZE(14),
                                                width: Dimensions.get('window').width / 3 - SCALE_SIZE(19),
                                                height: SCALE_SIZE(40)
                                            }]}>
                                            {item.image &&
                                                <Image
                                                    style={styles.itemImage}
                                                    resizeMode="contain"
                                                    source={item.image} />
                                            }
                                            <Text
                                                size={SCALE_SIZE(12)}
                                                align="center"
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_333A54}>
                                                {item.name}
                                            </Text>
                                        </View>
                                    );
                                }}
                                ListFooterComponent={() => {
                                    return <View style={{ marginRight: SCALE_SIZE(16) }}></View>;
                                }}>
                            </FlatList>
                        </View>
                        <View style={styles.profileView}>
                            <View style={styles.profileIcon}></View>
                            <View style={styles.userNameView}>
                                <Text
                                    size={SCALE_SIZE(16)}
                                    font={FONT_NAME.semiBold}
                                    color={COLORS.color_333A54}>
                                    {'Anderson'}
                                </Text>
                                <Text
                                    style={{ marginTop: SCALE_SIZE(4) }}
                                    size={SCALE_SIZE(10)}
                                    font={FONT_NAME.light}
                                    color={COLORS.color_333A54}>
                                    {'Real Estate Agent'}
                                </Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <Image
                                style={styles.chatIconStyle}
                                resizeMode="contain"
                                source={IMAGES.chat_icon} />
                        </View>
                        <Text
                            style={{
                                marginHorizontal: SCALE_SIZE(16)
                            }}
                            size={SCALE_SIZE(18)}
                            font={FONT_NAME.semiBold}
                            color={COLORS.color_333A54}>
                            {STRING.location_and_public_facility}
                        </Text>
                        <View style={styles.locationView}>
                            <Image
                                style={styles.locationIcon}
                                resizeMode="contain"
                                source={IMAGES.ic_locate_finder} />
                            <Text
                                font={FONT_NAME.regular}
                                color={COLORS.color_333A54}
                                size={SCALE_SIZE(16)}>
                                {'St. Cikoko Timur, Kec. Pancoran, Jakarta\nSelatan, Indonesia 12770'}
                            </Text>
                        </View>
                        <View style={styles.nearByLocationView}>
                            <Image
                                style={styles.locateGreenIcon}
                                resizeMode="contain"
                                source={IMAGES.ic_location_green} />
                            <Text
                                font={FONT_NAME.bold}
                                color={COLORS.color_333A54}
                                size={SCALE_SIZE(16)}>
                                {'2.5 km '}
                                <Text
                                    font={FONT_NAME.regular}
                                    color={COLORS.color_333A54}
                                    size={SCALE_SIZE(16)}>
                                    {STRING.from_your_location}
                                </Text>
                            </Text>
                        </View>
                        <View style={styles.mapContainer}>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity style={styles.viewOnMapStyle}>
                                <Text
                                    font={FONT_NAME.regular}
                                    align="center"
                                    color={COLORS.color_333A54}
                                    size={SCALE_SIZE(16)}>
                                    {STRING.view_all_on_map}
                                </Text>
                            </TouchableOpacity>
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
                        <View style={styles.requestMoreInfoView}>
                            <Text
                                font={FONT_NAME.regular}
                                color={COLORS.color_FF0000}
                                align="center"
                                size={SCALE_SIZE(16)}>
                                {STRING.request_more_info}
                            </Text>
                        </View>
                    </>
                }
                {selectedIndex == 1 &&
                    <View>
                        <Text
                            style={styles.galleryText}
                            size={SCALE_SIZE(16)}
                            font={FONT_NAME.semiBold}
                            color={COLORS.color_333A54}>
                            {STRING.gallery}
                            <Text
                                style={styles.galleryText}
                                size={SCALE_SIZE(16)}
                                font={FONT_NAME.semiBold}
                                color={COLORS.color_01A669}>
                                {' (10)'}
                            </Text>
                        </Text>
                        <FlatList
                            data={['Living', 'Living', 'Kitchen', 'Bathroom', 'Dining room', 'Bedroom']}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <ImageBackground
                                        style={styles.galleryItem}
                                        resizeMode="contain"
                                        source={IMAGES.ic_static_home}>
                                        <View style={styles.directionView}>
                                            <View style={styles.galleryType}>
                                                <Text
                                                    align="center"
                                                    size={SCALE_SIZE(12)}
                                                    font={FONT_NAME.medium}
                                                    color={COLORS.color_333A54}>
                                                    {item}
                                                </Text>
                                            </View>
                                            <Image
                                                style={styles.lightIcon}
                                                resizeMode="contain"
                                                source={IMAGES.ic_light} />
                                        </View>
                                    </ImageBackground>
                                );
                            }}
                        ></FlatList>
                    </View>}
                <View style={styles.footerView}>
                    <View>
                        <Text
                            font={FONT_NAME.semiBold}
                            color={COLORS.color_2A2B3F}
                            size={SCALE_SIZE(16)}>
                            {STRING.total_price}
                        </Text>
                        <Text
                            style={{ marginTop: SCALE_SIZE(6) }}
                            font={FONT_NAME.medium}
                            color={COLORS.color_01A669}
                            size={SCALE_SIZE(24)}>
                            {'$350'}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={styles.availableButton} onPress={() => {
                        props.navigation.navigate(SCREENS.AiInterior.name)
                    }}>
                        <Text
                            size={SCALE_SIZE(18)}
                            align="center"
                            font={FONT_NAME.semiBold}
                            color={COLORS.white}>
                            {STRING.available}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const Option = (props) => {
    return (
        <TouchableOpacity style={styles.optionItem}
            onPress={props.onPress}
            key={props.onKey}>
            <Text
                size={props.selected ? SCALE_SIZE(16) : SCALE_SIZE(16)}
                align="center"
                color={props.selected ? COLORS.color_01A669 : COLORS.color_333A54}
                font={props.selected ? FONT_NAME.medium : FONT_NAME.medium}>
                {props.title}
            </Text>
            <View style={[styles.activeLine, { backgroundColor: props.selected ? COLORS.color_01A669 : '#E6E6EA', }]}></View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    propertyImage: {
        height: ((Dimensions.get('window').width - SCALE_SIZE(8)) * SCALE_SIZE(560)) / SCALE_SIZE(428),
        width: Dimensions.get('window').width - SCALE_SIZE(8),
        alignSelf: 'center',
        paddingLeft: SCALE_SIZE(26),
    },
    bottomView: {
        position: 'absolute',
        bottom: SCALE_SIZE(26),
        left: SCALE_SIZE(26),
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    propertyTypeTag: {
        paddingHorizontal: SCALE_SIZE(24),
        paddingVertical: SCALE_SIZE(12),
        backgroundColor: '#FFFFFF50',
        borderRadius: SCALE_SIZE(16),
        justifyContent: 'center',
        alignItems: 'center',
    },
    rightImageStack: {
        flexDirection: 'column',
        gap: 5,
    },
    sideImageContainer: {
        position: 'relative',
        marginRight: SCALE_SIZE(26),
    },
    sideImage: {
        height: SCALE_SIZE(60),
        width: SCALE_SIZE(60),
        borderRadius: SCALE_SIZE(18),
        borderWidth: 2,
        borderColor: '#fff',
        backgroundColor: 'gray'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SCALE_SIZE(18),
    },
    likeChatShareView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.color_F6F6F6,
        borderRadius: SCALE_SIZE(10),
        paddingVertical: SCALE_SIZE(14),
        marginTop: SCALE_SIZE(16),
        marginHorizontal: SCALE_SIZE(16)
    },
    rowView: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center'
    },
    likeChatShareIcons: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(6)
    },
    verticalLineFirst: {
        position: 'absolute',
        left: '32.5%',
        top: 0,
        bottom: 0,
        backgroundColor: '#E6E6EA',
        width: 2,
    },
    verticalLineSecond: {
        position: 'absolute',
        left: '69.5%',
        top: 0,
        bottom: 0,
        backgroundColor: '#E6E6EA',
        width: 2,
    },
    optionContainer: {
        marginTop: SCALE_SIZE(34),
        flexDirection: 'row',
        height: SCALE_SIZE(20)
    },
    optionItem: {
        flex: 1.0,
        justifyContent: 'center',
    },
    itemView: {
        justifyContent: 'center',
        backgroundColor: COLORS.color_F1F1F3,
        borderRadius: SCALE_SIZE(100),
        flexDirection: 'row',
        alignItems: 'center'
    },
    itemImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    profileView: {
        backgroundColor: COLORS.color_E6E6EA80,
        borderRadius: SCALE_SIZE(20),
        paddingVertical: SCALE_SIZE(17),
        paddingHorizontal: SCALE_SIZE(20),
        marginTop: SCALE_SIZE(36),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SCALE_SIZE(28),
        marginHorizontal: SCALE_SIZE(16)
    },
    profileIcon: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        alignSelf: 'center',
        backgroundColor: 'gray',
        borderRadius: SCALE_SIZE(25),
        marginRight: SCALE_SIZE(22)
    },
    userNameView: {
        flexDirection: 'column'
    },
    chatIconStyle: {
        height: SCALE_SIZE(32),
        width: SCALE_SIZE(32),
        alignSelf: 'center'
    },
    locationView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(24),
        marginHorizontal: SCALE_SIZE(16)
    },
    locationIcon: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(16)
    },
    nearByLocationView: {
        backgroundColor: '#FFF',
        borderRadius: SCALE_SIZE(25),
        height: SCALE_SIZE(50),
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: SCALE_SIZE(16),
        elevation: 2,
        shadowColor: '#FFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginTop: SCALE_SIZE(32),
        marginHorizontal: SCALE_SIZE(16),
        borderWidth:1,
        borderColor:'#ECEDF3'
    },
    locateGreenIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    mapContainer: {
        height: SCALE_SIZE(309),
        width: SCALE_SIZE(396),
        borderRadius: SCALE_SIZE(25),
        alignSelf: 'center',
        backgroundColor: 'gray',
        marginTop: SCALE_SIZE(28),
        overflow: 'hidden',
    },
    viewOnMapStyle: {
        paddingVertical: SCALE_SIZE(15),
        paddingHorizontal: SCALE_SIZE(30),
        alignItems: 'center',
        backgroundColor: "#FFFFFF80",
    },
    requestMoreInfoView: {
        backgroundColor: COLORS.color_E6E6EA80,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SCALE_SIZE(28),
        paddingVertical: SCALE_SIZE(14),
    },
    facilityStyle: {
        marginTop: SCALE_SIZE(24),
        marginHorizontal: SCALE_SIZE(16)
    },
    propertyName: {
        marginTop: SCALE_SIZE(36),
        marginHorizontal: SCALE_SIZE(16)
    },
    footerView: {
        backgroundColor: '#FFFFFF',
        elevation: 4,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: SCALE_SIZE(16),
        paddingVertical: SCALE_SIZE(20),
        marginTop: SCALE_SIZE(28)
    },
    availableButton: {
        paddingVertical: SCALE_SIZE(15),
        paddingHorizontal: SCALE_SIZE(40),
        borderRadius: SCALE_SIZE(55),
        backgroundColor: COLORS.color_01A669,
        alignItems: 'center',
        justifyContent: 'center'
    },
    activeLine: {
        height: SCALE_SIZE(3),
        width: '100%',
        marginTop: SCALE_SIZE(6),
        borderRadius: SCALE_SIZE(2),
    },
    galleryText: {
        marginTop: SCALE_SIZE(24),
        marginHorizontal: SCALE_SIZE(16)
    },
    commentInput: {
        backgroundColor: COLORS.color_F6F6F6,
        height: SCALE_SIZE(48),
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(16),
        marginHorizontal: SCALE_SIZE(16),
        paddingVertical: SCALE_SIZE(14),
        paddingHorizontal: SCALE_SIZE(16),
        fontFamily: FONT_NAME.regular
    },
    galleryItem: {
        width: (Dimensions.get('window').width - SCALE_SIZE(42)) / 2,
        height: (Dimensions.get('window').width - SCALE_SIZE(42)) / 2,
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(16),
    },
    lightIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: "center"
    },
    directionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SCALE_SIZE(10),
        alignItems: 'center'
    },
    galleryType: {
        borderRadius: SCALE_SIZE(12),
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCALE_SIZE(68),
        height: SCALE_SIZE(19)
    }
})

export default PropertyDetail;