import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, SafeAreaView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../../assets";

//CONSTANTS
import { COLORS, SCALE_SIZE, FONT_NAME, USE_STRING } from "../../constants";

//COMPONENTS
import { Header, Text } from "../../components";

//SCREENS
import { SCREENS } from "..";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const [selectedPropertyItem, setSelectedPropertyItem] = useState<number>(0);

    const listings = [
        {
            id: '1',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
        {
            id: '2',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
    ];

    return (
        <View style={[styles.container, { marginTop: Platform.OS === 'android' ? insets.top : 0 }]}>
            <SafeAreaView />
            <Header
                type="home"
                locationText={'1012 Ocean avanue, New yourk, USA'}
                profileIcon={true}
                onProfile={() => {
                    props.navigation.navigate(SCREENS.UserProfile.name)
                }}
                onNotification={() => {
                    props.navigation.navigate(SCREENS.Notification.name)
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
                            placeholder={STRING.search_here}
                            placeholderTextColor={COLORS.color_B0B3BD}
                            onChangeText={(text) => {
                            }}>
                        </TextInput>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity>
                    <Image
                        style={styles.filterIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_filter} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={['', '', '', '']}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <View>
                        <FlatList
                            data={[
                                { name: 'All', image: '' },
                                { name: 'Residential', image: IMAGES.house_residential },
                                { name: 'Commercial', image: IMAGES.house_commercial },
                                { name: 'Rental', image: IMAGES.house_rental },
                                { name: 'Luxury', image: IMAGES.luxury_img },
                            ]}
                            horizontal
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => setSelectedPropertyItem(index)}
                                    style={
                                        selectedPropertyItem == index
                                            ? styles.selectedPropertyStyle
                                            : styles.unSelectedPropertyStyle
                                    }>
                                    {item.image && (
                                        <Image
                                            style={styles.iconsOfHouse}
                                            resizeMode="contain"
                                            source={item.image}
                                        />
                                    )}
                                    <Text
                                        size={SCALE_SIZE(12)}
                                        font={FONT_NAME.medium}
                                        color={
                                            selectedPropertyItem == index
                                                ? COLORS.color_01A669
                                                : COLORS.color_545A70
                                        }>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                            ListFooterComponent={() => <View style={{ marginRight: SCALE_SIZE(16) }} />}
                        />
                        <FlatList
                            data={listings}
                            horizontal
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <PropertyCard
                                    item={item}
                                    onPress={() => {
                                        props.navigation.navigate(SCREENS.PropertyDetail.name);
                                    }}
                                />
                            )}
                        />
                        <View style={styles.nearByView}>
                            <Text
                                size={SCALE_SIZE(20)}
                                font={FONT_NAME.semiBold}
                                color={COLORS.color_333A54}>
                                {STRING.nearby_listing}
                            </Text>
                            <View style={{ flex: 1 }} />
                            <Text
                                size={SCALE_SIZE(14)}
                                font={FONT_NAME.medium}
                                color={COLORS.color_01A669}>
                                {STRING.more}
                            </Text>
                        </View>
                    </View>
                )}
                renderItem={({ item, index }) => (
                    <View style={[styles.propertyItemView, { marginBottom: SCALE_SIZE(10) }]}>
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
                                {index === 0 || index === 2 ? (
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
                )}
                ListFooterComponent={() => (
                    <View style={{ marginBottom: SCALE_SIZE(10) }} />
                )}
            />
        </View >
    )
}

type PropertyCardProps = {
    item: {
        id: string;
        image: any;
        title: string;
        location: string;
        price: string;
        status: string;
    };
    onPress?: () => void
}

const PropertyCard = ({ item, onPress }: PropertyCardProps) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={styles.imageWrapper}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.actions}>
                    <Image
                        style={styles.heartBg}
                        resizeMode="contain"
                        source={IMAGES.ic_square_red_heart} />
                    <Image
                        style={styles.thumbIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_thumb} />
                    <Image
                        style={styles.chatIcon}
                        resizeMode="contain"
                        source={IMAGES.chat_bg} />
                    <Image
                        style={styles.shareIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_share} />
                </View>
            </View>
            <View style={{ paddingHorizontal: SCALE_SIZE(8) }}>
                <Text
                    style={{ marginTop: SCALE_SIZE(9) }}
                    size={SCALE_SIZE(14)}
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_333A54}>
                    {item.title}
                </Text>
                <View style={[styles.locationView, { marginTop: SCALE_SIZE(8) }]}>
                    <Image
                        style={styles.locationIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_location}>
                    </Image>
                    <Text
                        font={FONT_NAME.medium}
                        color={COLORS.color_545A70}
                        size={SCALE_SIZE(10)}>
                        {item.location}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    <Text
                        size={SCALE_SIZE(11)}
                        align="center"
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_01A669}>
                        {item.price}
                    </Text>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={styles.availableButton}>
                        <Text
                            size={SCALE_SIZE(10)}
                            align="center"
                            font={FONT_NAME.medium}
                            color={COLORS.white}>
                            {item.status}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16),
    },
    searchView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(25),
        marginBottom: SCALE_SIZE(10)
    },
    searchStyle: {
        height: SCALE_SIZE(56),
        backgroundColor: '#FFFFFF',
        borderRadius: SCALE_SIZE(32),
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    searchTextStyle: {
        fontFamily: FONT_NAME.regular,
        fontSize: SCALE_SIZE(14),
        marginLeft: SCALE_SIZE(10),
        flex: 1.0
    },
    searchImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(16)
    },
    filterIcon: {
        height: SCALE_SIZE(82),
        width: SCALE_SIZE(82),
        alignSelf: 'center',
        // marginLeft: SCALE_SIZE(10)
    },
    selectedPropertyStyle: {
        backgroundColor: COLORS.color_E3FFF5,
        borderRadius: SCALE_SIZE(17),
        paddingHorizontal: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(8),
        paddingVertical: SCALE_SIZE(9),
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.color_01A669,
        flexDirection: 'row'
    },
    unSelectedPropertyStyle: {
        marginLeft: SCALE_SIZE(8),
        justifyContent: 'center',
        paddingHorizontal: SCALE_SIZE(20),
        paddingVertical: SCALE_SIZE(9),
        backgroundColor: '#E6E6EA80',
        borderRadius: SCALE_SIZE(17),
        flexDirection: 'row'
    },
    iconsOfHouse: {
        height: SCALE_SIZE(14),
        width: SCALE_SIZE(14),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(4)
    },
    nearByView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SCALE_SIZE(18),
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
        height: SCALE_SIZE(21),
        width: SCALE_SIZE(44),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.color_E6E6EA80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    availableButton: {
        height: SCALE_SIZE(21),
        width: SCALE_SIZE(66),
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
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(15),
        marginRight: SCALE_SIZE(16),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginVertical: SCALE_SIZE(28),
    },
    imageWrapper: {
        borderRadius: SCALE_SIZE(15),
        backgroundColor: COLORS.white,
    },
    image: {
        width: '100%',
        height: SCALE_SIZE(155),
        borderRadius: SCALE_SIZE(15),
    },
    actions: {
        position: 'absolute',
        right: 8,
        top: 9,
        alignItems: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(8),
        marginBottom: SCALE_SIZE(8)
    },
    heartBg: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
    },
    thumbIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginTop: SCALE_SIZE(6)
    },
    chatIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginTop: SCALE_SIZE(6)
    },
    shareIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        marginTop: SCALE_SIZE(6)
    }
})

export default Home;