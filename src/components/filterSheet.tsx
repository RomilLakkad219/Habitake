import React, { useState } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions, Image, FlatList, TouchableOpacity, ScrollView } from 'react-native'

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../constants";

//COMPONENTS
import Text from "./text";
import Button from "./button";

//PACKAGES
import RBSheet from "react-native-raw-bottom-sheet";
import MultiSlider from '@ptomasroos/react-native-multi-slider';

interface SheetProps {
    onRef?: any,
    onOpen?: () => void,
    onClose?: () => void,
    onFinish?: () => void
}

const FilterSheet = (props: SheetProps) => {

    const [selectedPropertyItem, setSelectedPropertyItem] = useState<number>(0);
    const [selectednumbersOfBathrooms, setSelectedNumbersOfBathrooms] = useState<number>(0);
    const [selectednumbersOfBedrooms, setSelectedNumbersOfBedrooms] = useState<number>(0);
    const [priceRange, setPriceRange] = useState([100, 10000])
    const [selectedAmenities, setSelectedAmenities] = useState<{ name: string }[]>([]);

    return (
        <RBSheet ref={props.onRef}
            closeOnPressMask={true}
            onOpen={props.onOpen}
            onClose={props.onClose}
            draggable={true}
            customStyles={{
                container: {
                    backgroundColor: COLORS.white,
                    height: Dimensions.get('window').height * 0.9,
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
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={1}>
                    <Text
                        font={FONT_NAME.bold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(20)}>
                        {STRING.filter}
                    </Text>
                    <Text
                        style={{ marginTop: SCALE_SIZE(24) }}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.property_type}
                    </Text>
                    <View>
                        <FlatList
                            data={[{ name: 'Residential' }, { name: 'Commercial' }, { name: 'Rental' }, { name: 'Luxury' }]}
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
                                            font={selectedPropertyItem == index ? FONT_NAME.semiBold : FONT_NAME.medium}
                                            color={selectedPropertyItem == index ? COLORS.white : COLORS.color_545A70}>
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
                    <Text
                        style={{ marginTop: SCALE_SIZE(32) }}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.price_range}
                    </Text>
                    <MultiSlider
                        values={[priceRange[0], priceRange[1]]}
                        sliderLength={300}
                        onValuesChange={(values) => setPriceRange(values)}
                        min={100}
                        max={10000}
                        step={100}
                        allowOverlap={false}
                        snapped
                        containerStyle={{
                            marginHorizontal: SCALE_SIZE(16)
                        }}
                        selectedStyle={{
                            backgroundColor: COLORS.color_01A669,
                            height: SCALE_SIZE(5),
                        }}
                        unselectedStyle={{
                            backgroundColor: COLORS.color_F1F1F1,
                            height: SCALE_SIZE(6),
                            borderRadius: SCALE_SIZE(10),
                        }}
                        markerStyle={{
                            backgroundColor: COLORS.color_01A669,
                            height: SCALE_SIZE(20),
                            width: SCALE_SIZE(20),
                        }}
                    />
                    <View style={styles.rangeStyle}>
                        <Text
                            font={FONT_NAME.regular}
                            color={COLORS.black}
                            size={SCALE_SIZE(14)}>
                            {'$100'}
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <Text
                            font={FONT_NAME.regular}
                            color={COLORS.black}
                            size={SCALE_SIZE(14)}>
                            {'$10000'}
                        </Text>
                    </View>
                    <Text
                        style={{ marginTop: SCALE_SIZE(32) }}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.amenities}
                    </Text>
                    <View>
                        <FlatList data={[
                            { name: 'TV Set' },
                            { name: 'Washing machine' },
                            { name: 'Kitchen' },
                            { name: 'Air Conditional' },
                            { name: 'Parking' },
                            { name: 'Pool' },
                            { name: 'Refrigerator' },
                            { name: 'Drying machine' },
                            { name: 'Garden' }
                        ]}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={{ flex:1 }}
                            numColumns={3}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                const isInclude = selectedAmenities?.some(i => i.name === item.name);
                                return (
                                    <TouchableOpacity
                                        style={[styles.itemView, {
                                            marginTop: SCALE_SIZE(16),
                                        }]}
                                        onPress={() => {
                                            if (isInclude) {
                                                const updated = selectedAmenities.filter(filterItem => filterItem?.name !== item?.name);
                                                setSelectedAmenities(updated);
                                            } else {
                                                const updated = [...selectedAmenities];
                                                updated.push(item)
                                                setSelectedAmenities(updated);
                                            }
                                        }}>
                                        {isInclude ?
                                            <Image
                                                style={styles.squareImage}
                                                resizeMode="contain"
                                                source={IMAGES.green_check_bg} />
                                            :
                                            <Image
                                                style={styles.squareImage}
                                                resizeMode="contain"
                                                source={IMAGES.ic_square} />
                                        }
                                        <Text
                                            size={SCALE_SIZE(16)}
                                            align="center"
                                            font={FONT_NAME.regular}
                                            color={COLORS.color_000929}>
                                            {item.name}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            }}>
                        </FlatList>
                    </View>
                    <View style={styles.bathAndBedRoomView}>
                        <View style={{ flex: 1 }}>
                            <Text
                                font={FONT_NAME.semiBold}
                                color={COLORS.color_333A54}
                                size={SCALE_SIZE(16)}>
                                {STRING.bathrooms_capital}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                {['1', '2', '3', '+4'].map((e, index) => {
                                    return (
                                        <TouchableOpacity style={[selectednumbersOfBathrooms == index ? styles.numberSelectStyle : styles.numberUnselectStyle, { marginRight: SCALE_SIZE(18) }]}
                                            onPress={() => {
                                                setSelectedNumbersOfBathrooms(index)
                                            }}>
                                            <Text
                                                font={FONT_NAME.regular}
                                                align="center"
                                                color={selectednumbersOfBathrooms == index ? COLORS.white : COLORS.color_545A70}
                                                size={SCALE_SIZE(16)}>
                                                {e}
                                            </Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text
                                font={FONT_NAME.semiBold}
                                color={COLORS.color_333A54}
                                size={SCALE_SIZE(16)}>
                                {STRING.bedrooms_capital}
                            </Text>
                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    {['1', '2', '3', '+4'].map((e, index) => {
                                        return (
                                            <TouchableOpacity style={[selectednumbersOfBedrooms == index ? styles.numberSelectStyle : styles.numberUnselectStyle, { marginRight: SCALE_SIZE(18) }]}
                                                onPress={() => {
                                                    setSelectedNumbersOfBedrooms(index)
                                                }}>
                                                <Text
                                                    font={FONT_NAME.regular}
                                                    align="center"
                                                    color={selectednumbersOfBedrooms == index ? COLORS.white : COLORS.color_545A70}
                                                    size={SCALE_SIZE(16)}>
                                                    {e}
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text
                        style={{ marginTop: SCALE_SIZE(32) }}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}
                        size={SCALE_SIZE(16)}>
                        {STRING.property_size}
                    </Text>
                    <View style={styles.propertySizeSelectionView}>
                        <Text
                            font={FONT_NAME.regular}
                            color={COLORS.color_8A8E9D}
                            size={SCALE_SIZE(14)}>
                            {STRING.select}
                        </Text>
                        <View style={{ flex: 1 }}></View>
                        <Image
                            style={styles.nextIcon}
                            resizeMode="contain"
                            source={IMAGES.ic_next} />
                    </View>
                    <Button
                        onPress={props.onFinish}
                        style={styles.buttonStyle}
                        title={STRING.apply_filter} />
                </TouchableOpacity>
                </ScrollView>
            </View>
            <SafeAreaView />
        </RBSheet >
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: SCALE_SIZE(16)
    },
    selectedPropertyStyle: {
        backgroundColor: COLORS.color_01A669,
        borderRadius: SCALE_SIZE(17),
        paddingHorizontal: SCALE_SIZE(20),
        marginLeft: SCALE_SIZE(8),
        marginTop: SCALE_SIZE(16),
        paddingVertical: SCALE_SIZE(9),
        justifyContent: 'center',
        flexDirection: 'row'
    },
    unSelectedPropertyStyle: {
        marginTop: SCALE_SIZE(16),
        marginLeft: SCALE_SIZE(8),
        justifyContent: 'center',
        paddingHorizontal: SCALE_SIZE(20),
        paddingVertical: SCALE_SIZE(9),
        backgroundColor: '#E6E6EA80',
        borderRadius: SCALE_SIZE(17),
        flexDirection: 'row'
    },
    rangeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(6)
    },
    itemView: {
        width: (Dimensions.get('window').width )/ 3,
        flexDirection: 'row',
        alignItems: 'center',
    },
    squareImage: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(8)
    },
    bathAndBedRoomView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SCALE_SIZE(32)
    },
    buttonStyle: {
        marginTop: SCALE_SIZE(36),
        marginBottom: SCALE_SIZE(40)
    },
    numberUnselectStyle: {
        height: SCALE_SIZE(26),
        width: SCALE_SIZE(27),
        backgroundColor: COLORS.color_EBE9F0,
        borderRadius: SCALE_SIZE(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCALE_SIZE(16),
        flexDirection: 'row'
    },
    numberSelectStyle: {
        height: SCALE_SIZE(26),
        width: SCALE_SIZE(27),
        backgroundColor: COLORS.color_01A669,
        borderRadius: SCALE_SIZE(6),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCALE_SIZE(16),
        flexDirection: 'row'
    },
    propertySizeSelectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.color_E6E6EA66,
        borderRadius: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(16),
        height: SCALE_SIZE(60),
        paddingHorizontal: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(30)
    },
    nextIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center'
    }
})

export default FilterSheet;