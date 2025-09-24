import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, TextInput, FlatList, ImageBackground, SafeAreaView, Platform, Dimensions, ActivityIndicator } from "react-native"

//ASSETS
import { IMAGES } from "../../assets";

//CONSTANTS
import { COLORS, SCALE_SIZE, FONT_NAME, USE_STRING, SHOW_TOAST } from "../../constants";

//COMPONENTS
import { Header, LanguageSelector, List, Text } from "../../components";

//SCREENS
import { SCREENS } from "..";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { debounce } from "lodash";

//API
import { getHomeProperty, propertyIncrementViews } from "../../api";

//LOADER
import ProgressView from "../progressView";

const Home = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    useEffect(() => {
        getPropertyList()
    }, [])

    const [selectedPropertyItem, setSelectedPropertyItem] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<Property[]>([]);
    const [likedProperties, setLikedProperties] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("");
    const [filterType, setFilterType] = useState<"city" | "state" | "approvalStatus">("city");
    const [isSearching, setIsSearching] = useState(false); // for search
    const [lastKeyword, setLastKeyword] = useState<string | undefined>(undefined);

    const propertyTypes = [
        { name: STRING.all, image: '', apiTypes: [] },
        { name: STRING.residential, image: IMAGES.house_residential, apiTypes: ['Residential'] },
        { name: STRING.commercial, image: IMAGES.house_commercial, apiTypes: ['Commercial'] },
        { name: STRING.rental, image: IMAGES.house_rental, apiTypes: ['Rental'] },
        { name: STRING.luxury, image: IMAGES.luxury_img, apiTypes: ['Luxury'] },
    ];

    const filteredProperties = React.useMemo(() => {
        const selected = propertyTypes[selectedPropertyItem];
        if (!selected || selected.apiTypes.length === 0) {
            return properties; // All
        }
        return properties.filter(p =>
            selected.apiTypes.includes(p.propertyType)
        );
    }, [selectedPropertyItem, properties]);

    // const searchHandler = useCallback(
    //     debounce((text: string, filterType?: "city" | "state" | "approvalStatus") => {
    //         getPropertyList(selectedPropertyItem, text, filterType);
    //     }, 1000),
    //     [selectedPropertyItem]
    // );

    const searchHandler = useCallback(
        debounce((text: string, filterType?: "city" | "state" | "approvalStatus") => {
            if (text !== lastKeyword) {
                getPropertyList(selectedPropertyItem, text, filterType, true);
                setLastKeyword(text);
            }
        }, 800), // reduced delay for better UX
        [selectedPropertyItem, lastKeyword]
    );

    async function getPropertyList(
        index?: number,
        keyword?: string,
        filterType?: "city" | "state" | "approvalStatus",
        isSearch = false
    ) {
        try {
            if (isSearch) {
                setIsSearching(true);
            } else {
                setIsLoading(true);
            }

            const selectedIndex = index ?? selectedPropertyItem;
            const selectedType =
                propertyTypes[selectedIndex]?.apiTypes?.[0] ?? null;

            const params: any = {
                limit: null,
                propertyType: selectedType,
            };

            if (keyword) {
                const approvalMap: Record<string, string> = {
                    approved: "APPROVED",
                    pending: "PENDING",
                    rejected: "REJECTED",
                    underreview: "UNDER_REVIEW",
                    "under review": "UNDER_REVIEW",
                };

                const lower = keyword.toLowerCase();
                if (approvalMap[lower]) {
                    //Pass Status
                    params.approvalStatus = approvalMap[lower];
                }
                else {
                    //Pass state and city
                    params.city = keyword;
                    params.state = keyword;
                }
            }

            console.log("API CALL PARAMS:", params);

            const result: any = await getHomeProperty(params);

            if (result?.listProperties?.success) {
                setProperties(result.listProperties.data ?? []);
            } else {
                SHOW_TOAST(result?.listProperties?.message);
            }
        } catch (err) {
            SHOW_TOAST(err ?? String(err));
        } finally {
            if (isSearch) {
                setIsSearching(false);
            } else {
                setIsLoading(false);
            }
        }
    }

    async function onPropertyLike(propertyID: string) {
        const alreadyLiked = likedProperties.includes(propertyID);

        //If already like property then nothing to do
        if (alreadyLiked) {
            return;
        }

        setLikedProperties(prev => [...prev, propertyID]);

        try {
            setIsLoading(true);
            const result: any = await propertyIncrementViews({ propertyId: propertyID });
            setIsLoading(false);

            if (!result?.incrementPropertyViews?.success) {
                SHOW_TOAST(result?.incrementPropertyViews?.message);

                // Revert if API failed
                setLikedProperties(prev => prev.filter(id => id !== propertyID));
            }
        } catch (err) {
            setIsLoading(false);
            SHOW_TOAST(err);

            // Revert if API failed
            setLikedProperties(prev => prev.filter(id => id !== propertyID));
        }
    }

    return (
        <View style={[styles.container, { marginTop: Platform.OS === 'android' ? insets.top : 0 }]}>
            <SafeAreaView />
            <View style={{ alignSelf: 'flex-end' }}>
                <LanguageSelector />
            </View>
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
                            value={searchText}
                            placeholder={STRING.search_here}
                            placeholderTextColor={COLORS.color_B0B3BD}
                            onChangeText={(text) => {
                                setSearchText(text);
                                if (text.length > 0) {
                                    searchHandler(text, filterType)
                                } else {
                                    searchHandler.cancel();
                                    getPropertyList(selectedPropertyItem)
                                }
                            }}>
                        </TextInput>
                    </TouchableOpacity>
                </View>
                {/* <TouchableOpacity>
                    <Image
                        style={styles.filterIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_filter} />
                </TouchableOpacity> */}
            </View>
            <FlatList
                data={['', '', '', '']}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={() => (
                    <View>
                        <FlatList
                            data={propertyTypes}
                            horizontal
                            scrollEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity
                                    onPress={() => {
                                        setSelectedPropertyItem(index)
                                        getPropertyList(index);
                                    }}
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
                        {filteredProperties.length <= 0 ? (
                            <View style={styles.errorStyle}>
                                <Text
                                    font={FONT_NAME.medium}
                                    size={SCALE_SIZE(14)}
                                    align="center"
                                    color={COLORS.color_545A70}>
                                    {STRING.no_property_found}
                                </Text>
                            </View>
                        ) : (
                            <FlatList
                                data={filteredProperties}
                                horizontal
                                scrollEnabled={true}
                                showsHorizontalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => (
                                    <PropertyCard
                                        item={item}
                                        key={index}
                                        onPress={() => {
                                            props.navigation.navigate(SCREENS.PropertyDetail.name);
                                        }}
                                        liked={likedProperties.includes(item.id)}
                                        onLike={(id) => onPropertyLike(id)}
                                    />
                                )}
                            />
                        )}
                        <View style={styles.nearByView}>
                            <Text
                                size={SCALE_SIZE(20)}
                                font={FONT_NAME.semiBold}
                                color={COLORS.color_333A54}>
                                {STRING.nearby_listing}
                            </Text>
                            <View style={{ flex: 1 }} />
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate(SCREENS.NearByProperty.name)
                            }}>
                                <Text
                                    size={SCALE_SIZE(14)}
                                    font={FONT_NAME.medium}
                                    color={COLORS.color_01A669}>
                                    {STRING.more}
                                </Text>
                            </TouchableOpacity>
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
            {isLoading && <ProgressView />}
            {isSearching && (
                <View style={styles.searchLoader}>
                    <ActivityIndicator size="small" color={COLORS.black} />
                </View>
            )}
        </View>
    )
}

type Property = {
    id: string;
    images: string[];
    title: string;
    address: string;
    price: string;
    status: string;
    propertyType: string;
};

type PropertyCardProps = {
    item: Property;
    onPress?: () => void;
    onLike?: (propertyId: string) => void;
    liked?: boolean;
}

const PropertyCard = ({ item, onPress, onLike, liked }: PropertyCardProps) => {

    const { width: screenWidth } = Dimensions.get("window");

    const horizontalMargin = SCALE_SIZE(16) * 2
    const spacing = SCALE_SIZE(10);
    const imagesPerRow = 2;

    const availableWidth = screenWidth - horizontalMargin - (imagesPerRow - 1) * spacing;
    const imageWidth = availableWidth / imagesPerRow;
    const aspectRatio = SCALE_SIZE(155) / SCALE_SIZE(223)
    const imageHeight = imageWidth * aspectRatio;

    return (
        <TouchableOpacity
            style={[styles.card, {
                width: imageWidth,
                overflow: Platform.OS === "ios" ? "visible" : "hidden",
            }]}
            onPress={onPress}>
            <View style={[styles.imageWrapper, { height: SCALE_SIZE(155) }]}>
                {/* {item.images && item.images.length > 0 &&
                    <FlatList
                        data={item.images}
                        horizontal
                        pagingEnabled
                        keyExtractor={(img, idx) => idx.toString()}
                        renderItem={({ item: img }) => (
                            <Image
                                source={{ uri: img }}
                                style={{
                                    width: imageWidth,
                                    height: imageHeight,
                                    borderRadius: SCALE_SIZE(15),
                                }}
                                resizeMode="cover"
                            />
                        )}
                        showsHorizontalScrollIndicator={false}
                    ></FlatList>
                    */}
                <Image source={IMAGES.ic_commercial}
                    resizeMode="cover"
                    style={{ height: '100%', width: '100%' }} />
                {/* } */}
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => {
                        if (onLike) {
                            onLike(item.id);
                        }
                    }}>
                        <Image
                            style={styles.heartBg}
                            resizeMode="contain"
                            source={liked ? IMAGES.ic_square_red_heart : IMAGES.ic_un_heart} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                        <Image
                            style={styles.thumbIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_thumb} />
                    </TouchableOpacity> */}
                    <TouchableOpacity>
                        <Image
                            style={styles.chatIcon}
                            resizeMode="contain"
                            source={IMAGES.chat_bg} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={styles.shareIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_share} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.propertyNameView}>
                <Text
                    style={{ marginTop: SCALE_SIZE(9) }}
                    size={SCALE_SIZE(14)}
                    numberOfLines={1}
                    ellipsizeMode="tail"
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
                        {item.address}
                    </Text>
                </View>
                <View style={styles.bottomView}>
                    <Text
                        size={SCALE_SIZE(11)}
                        align="center"
                        numberOfLines={2}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_01A669}>
                        {`$${item.price}`}
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
        marginTop: Platform.OS == 'android' ? SCALE_SIZE(25) : SCALE_SIZE(35),
        marginBottom: SCALE_SIZE(20)
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
        overflow: 'hidden',
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    image: {
        // width: '100%',
        // height: SCALE_SIZE(155),
        // borderRadius: SCALE_SIZE(15),
    },
    actions: {
        position: 'absolute',
        right: SCALE_SIZE(8),
        top: SCALE_SIZE(9),
        alignItems: 'center',
    },
    bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(8),
        marginBottom: SCALE_SIZE(8)
    },
    heartBg: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
    },
    thumbIcon: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(6)
    },
    chatIcon: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(6)
    },
    shareIcon: {
        height: SCALE_SIZE(25),
        width: SCALE_SIZE(25),
        marginTop: SCALE_SIZE(6)
    },
    errorStyle: {
        marginTop: SCALE_SIZE(30),
        marginBottom: SCALE_SIZE(20)
    },
    propertyNameView: {
        paddingHorizontal: SCALE_SIZE(8),
        minHeight: SCALE_SIZE(100)
    },
    searchLoader: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999
    },
})

export default Home;