import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, Dimensions, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constants";

//COMPONENTS
import { FilterSheet, Header, Text } from "../../components";

//PACKAGES
import MapView from 'react-native-maps';

const Search = (props: any) => {

    const filterRef = useRef<any>(null)

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
        {
            id: '3',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
        {
            id: '4',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
        {
            id: '5',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
        {
            id: '6',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        },
    ];

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                type="search"
                onBack={() => {
                    props.navigation.goBack()
                }}
                title={STRING.search_results}
                onFilter={() => {
                    filterRef?.current?.open()
                }} />
            {/* <View style={styles.headerView}>
                <View style={styles.locationWrapper}>
                    <Image
                        style={styles.locationImage}
                        resizeMode="contain"
                        source={IMAGES.ic_location} />
                    <Text
                        style={{ marginRight: SCALE_SIZE(8) }}
                        font={FONT_NAME.regular}
                        color={COLORS.color_545A70}
                        size={SCALE_SIZE(16)}>
                        {'Jakarta, Indonesia'}
                    </Text>
                    <Image
                        style={styles.downIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_down_arrow} />
                </View>
                <View style={{ flex: 1 }}></View>
                <Image
                    style={styles.filterIcon}
                    resizeMode="contain"
                    source={IMAGES.filter_bg_white}>
                </Image>
            </View> */}
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
            </View>
            <Text
                style={{ marginHorizontal: SCALE_SIZE(16) }}
                font={FONT_NAME.regular}
                color={COLORS.color_333A54}
                size={SCALE_SIZE(18)}>
                {STRING.found}
                <Text
                    font={FONT_NAME.bold}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(18)}>
                    {' 0 '}
                </Text>
                <Text
                    font={FONT_NAME.regular}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(18)}>
                    {STRING.estates}
                </Text>
            </Text>
            {/* <View style={styles.nearByYouStyle}>
                <Image
                    style={styles.alertIcon}
                    resizeMode="contain"
                    source={IMAGES.error_bg} />
                <Text
                    style={{ marginRight: SCALE_SIZE(8) }}
                    font={FONT_NAME.regular}
                    color={COLORS.color_000929}
                    size={SCALE_SIZE(16)}>
                    {STRING.near_by_you}
                </Text>
            </View>
             <View style={styles.cantFoundEstateView}>
                <Text
                    font={FONT_NAME.regular}
                    color={COLORS.color_000929}
                    size={SCALE_SIZE(16)}>
                    {STRING.cant_found_real_estate_nearby_you}
                </Text>
            </View> */}
            {/* <MapView
                style={styles.map}
                showsUserLocation={true}
                showsMyLocationButton={false}
            /> */}
            <View style={styles.searchAlertView}>
                <Image
                    style={styles.searchAlertIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_search_alert} />
                <Text
                    align="center"
                    font={FONT_NAME.regular}
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(24)}>
                    {STRING.search + " "}
                    <Text
                        font={FONT_NAME.medium}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(24)}>
                        {STRING.not_found}
                    </Text>
                </Text>
                <Text
                    style={{ marginTop: SCALE_SIZE(20) }}
                    font={FONT_NAME.regular}
                    align="center"
                    color={COLORS.color_333A54}
                    size={SCALE_SIZE(14)}>
                    {STRING.search_not_found_error}
                </Text>
            </View>
            {/* <View style={{ flex: 1 }}>
                <FlatList
                    data={listings}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <PropertyCard item={item} onPress={() => {
                        }} />}
                >
                </FlatList>
            </View> */}
            <FilterSheet onRef={filterRef} />
        </View>
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
        backgroundColor: COLORS.color_FDFDFD
    },
    searchView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(20),
        marginHorizontal: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(18)
    },
    searchStyle: {
        height: SCALE_SIZE(56),
        backgroundColor: '#FFFFFFCC',
        borderRadius: SCALE_SIZE(32),
        flexDirection: 'row',
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    searchTextStyle: {
        fontFamily: FONT_NAME.medium,
        fontSize: SCALE_SIZE(16),
        marginLeft: SCALE_SIZE(12),
        flex: 1.0
    },
    searchImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginLeft: SCALE_SIZE(16)
    },
    searchAlertView: {
        flex: 1,
        justifyContent: 'center'
    },
    searchAlertIcon: {
        height: SCALE_SIZE(142),
        width: SCALE_SIZE(142),
        alignSelf: 'center',
        marginBottom: SCALE_SIZE(50)
    },
    card: {
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        marginTop: SCALE_SIZE(20),
        width: ((Dimensions.get('window').width - SCALE_SIZE(48)) / 2),
        marginLeft: SCALE_SIZE(16)
    },
    imageWrapper: {
        borderRadius: SCALE_SIZE(15),
        backgroundColor: COLORS.white,
        alignSelf: 'center'
    },
    image: {
        width: ((Dimensions.get('window').width - SCALE_SIZE(48)) / 2),
        height: (Dimensions.get('window').width / 2) - SCALE_SIZE(42),
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
    availableButton: {
        height: SCALE_SIZE(21),
        width: SCALE_SIZE(66),
        borderRadius: SCALE_SIZE(24),
        backgroundColor: COLORS.color_34216B,
        alignItems: 'center',
        justifyContent: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject, // fills the entire screen
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SCALE_SIZE(16)
    },
    locationWrapper: {
        backgroundColor: COLORS.white,
        paddingVertical: SCALE_SIZE(12),
        paddingHorizontal: SCALE_SIZE(16),
        elevation: 2,
        borderRadius: SCALE_SIZE(24),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    locationImage: {
        height: SCALE_SIZE(15),
        width: SCALE_SIZE(15),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    downIcon: {
        height: SCALE_SIZE(10),
        width: SCALE_SIZE(10),
        alignSelf: 'center',
    },
    filterIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        alignSelf: 'center',
    },
    nearByYouStyle: {
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: SCALE_SIZE(32),
        paddingHorizontal: SCALE_SIZE(12),
        paddingVertical: SCALE_SIZE(10),
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        marginHorizontal: SCALE_SIZE(16),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    alertIcon: {
        height: SCALE_SIZE(24),
        width: SCALE_SIZE(24),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    cantFoundEstateView: {
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: SCALE_SIZE(32),
        paddingHorizontal: SCALE_SIZE(76),
        paddingVertical: SCALE_SIZE(13),
        alignItems: 'center',
        marginHorizontal: SCALE_SIZE(16),
        marginTop: SCALE_SIZE(12),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    }
})

export default Search;