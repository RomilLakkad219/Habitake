import React, { useRef, useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions, SafeAreaView, Platform } from "react-native"

//ASSETS
import { IMAGES } from "../../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../../constants";

//COMPONENT
import { FavouritePropertyRemoveSheet, Header, Text } from "../../components";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Favourite = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const onFavouriteRef = useRef<any>(null)

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
        {
            id: '3',
            image: IMAGES.ic_commercial,
            title: 'Tranquil Haven in the Woods',
            location: 'Jakarta, Indonesia',
            price: '$340',
            status: 'Available',
        }
    ];

    return (
        <View style={[styles.container, { marginTop: Platform.OS === 'android' ? insets.top : 0 }]}>
            <SafeAreaView />
            <Header title={STRING.favourite_property} />
            <View>
                <FlatList
                    data={[
                        { name: 'All' },
                        { name: 'Residential' },
                        { name: 'Commercial' },
                        { name: 'Rental' },
                        { name: 'Luxury' },]}
                    horizontal
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedPropertyItem(index)
                                }}
                                style={selectedPropertyItem == index ? styles.selectedPropertyStyle : styles.unSelectedPropertyStyle}>
                                <Text
                                    size={SCALE_SIZE(12)}
                                    font={FONT_NAME.medium}
                                    color={selectedPropertyItem == index ? COLORS.color_01A669 : COLORS.color_545A70}>
                                    {item.name}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    ListFooterComponent={() => {
                        return <View style={{ marginRight: SCALE_SIZE(16) }}></View>;
                    }}>
                </FlatList>
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={listings}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <PropertyCard item={item} onPress={() => {
                            onFavouriteRef?.current?.open()
                        }} />}
                >
                </FlatList>
            </View>
            <FavouritePropertyRemoveSheet onRef={onFavouriteRef} onCancel={() => {
                onFavouriteRef?.current?.close()
            }} />
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
    selectedPropertyStyle: {
        backgroundColor: COLORS.color_E3FFF5,
        borderRadius: SCALE_SIZE(17),
        paddingHorizontal: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(8),
        marginTop: SCALE_SIZE(28),
        paddingVertical: SCALE_SIZE(9),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    unSelectedPropertyStyle: {
        marginTop: SCALE_SIZE(28),
        marginLeft: SCALE_SIZE(8),
        justifyContent: 'center',
        paddingHorizontal: SCALE_SIZE(20),
        paddingVertical: SCALE_SIZE(9),
        backgroundColor: '#E6E6EA80',
        borderRadius: SCALE_SIZE(17),
        flexDirection: 'row'
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

})

export default Favourite;