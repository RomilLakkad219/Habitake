import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constants";

//COMPONENTS
import { Text } from "../components";

const AiInterior = (props: any) => {

    const categories = ['Modern', 'Classic', 'Industrial', 'Style'];
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<number>(0);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}>
                <Image
                    style={styles.backIcon}
                    resizeMode="contain"
                    source={IMAGES.ic_back} />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {/* <Image
                        style={styles.image}
                        resizeMode="cover"

                    /> */}
                {/* Back Arrow */}
                <View style={{ flex: 0.5 }}></View>
                <TouchableOpacity>
                    <Image
                        style={styles.leftBackButton}
                        resizeMode="contain"
                        source={IMAGES.ic_move_left}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.rightBackButton}
                        resizeMode="contain"
                        source={IMAGES.ic_move_right}
                    />
                </TouchableOpacity>
                <View style={styles.markerWrapper}>
                    <View style={styles.markerWhiteView}>
                        <View style={styles.markerDot} />
                    </View>
                    <View style={styles.markerLabel}>
                        <Text
                            size={SCALE_SIZE(14)}
                            font={FONT_NAME.semiBold}
                            color={COLORS.color_333A54}>
                            {'Jati dining table'}
                        </Text>
                        <Text style={styles.labelSubtitle}
                            size={SCALE_SIZE(10)}
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {'6 people capacity'}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.categoryContainer}>
                {categories.map((cat, index) => (
                    <TouchableOpacity key={index} style={selectedIndex == index ? styles.categoryButtonSelect : styles.categoryButtonUnselect}
                        onPress={() => {
                            setSelectedIndex(index)
                            if (index == 0) {
                                setModalVisible(true)
                            }
                            else {
                                setModalVisible(false)
                            }
                        }}>
                        <Text
                            size={SCALE_SIZE(15)}
                            align="center"
                            font={selectedIndex == index ? FONT_NAME.bold : FONT_NAME.medium}
                            color={selectedIndex == index ? COLORS.white : COLORS.color_333A54}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {modalVisible && (
                <View style={styles.modalContainer}>
                    <View style={styles.modalBox}>
                        <TouchableOpacity style={selectedOptions == 0 ? styles.optionSelected : styles.option}
                            onPress={() => {
                                setSelectedOptions(0)
                            }}>
                            <Text
                                size={SCALE_SIZE(15)}
                                align="center"
                                font={FONT_NAME.semiBold}
                                color={selectedOptions == 0 ? COLORS.color_01A669 : COLORS.white}>
                                {STRING.style}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={selectedOptions == 1 ? styles.optionSelected : styles.option} onPress={() => {
                            setSelectedOptions(1)
                        }}>
                            <Text
                                size={SCALE_SIZE(15)}
                                align="center"
                                font={FONT_NAME.semiBold}
                                color={selectedOptions == 1 ? COLORS.color_01A669 : COLORS.white}>
                                {STRING.colour}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={selectedOptions == 2 ? styles.optionSelected : styles.option} onPress={() => {
                            setSelectedOptions(2)
                        }}>
                            <Text
                                size={SCALE_SIZE(15)}
                                align="center"
                                font={FONT_NAME.semiBold}
                                color={selectedOptions == 2 ? COLORS.color_01A669 : COLORS.white}>
                                {STRING.furniture}
                            </Text>
                        </TouchableOpacity>
                        <View style={styles.arrowDown} />
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray',
    },
    backIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        marginLeft: SCALE_SIZE(10),
        marginTop: SCALE_SIZE(40)
    },
    imageContainer: {
        flex: 1
    },
    image: {
        width: '100%',
        height: '100%',
    },
    leftBackButton: {
        height: SCALE_SIZE(83),
        width: SCALE_SIZE(40),
        alignSelf: 'center',
        position: 'absolute',
        top: -10,
        left: 5,
    },
    rightBackButton: {
        height: SCALE_SIZE(83),
        width: SCALE_SIZE(40),
        alignSelf: 'center',
        position: 'absolute',
        top: -10,
        right: 5,
    },
    markerWrapper: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    markerWhiteView: {
        width: SCALE_SIZE(35),
        height: SCALE_SIZE(35),
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(18),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SCALE_SIZE(7)
    },
    markerDot: {
        width: SCALE_SIZE(16),
        height: SCALE_SIZE(16),
        borderRadius: SCALE_SIZE(9),
        backgroundColor: COLORS.color_01A669,
        alignSelf: 'center'
    },
    markerLabel: {
        backgroundColor: COLORS.white,
        paddingTop: SCALE_SIZE(12),
        paddingBottom: SCALE_SIZE(14),
        paddingHorizontal: SCALE_SIZE(14),
        borderRadius: SCALE_SIZE(15),
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    labelSubtitle: {
        marginTop: SCALE_SIZE(4)
    },
    categoryContainer: {
        flexDirection: 'row',
        marginHorizontal: SCALE_SIZE(23),
        marginBottom: SCALE_SIZE(40)
    },
    categoryButtonUnselect: {
        paddingVertical: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(20),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        flexDirection: 'row',
        flexGrow: 1,
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    categoryButtonSelect: {
        paddingVertical: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(20),
        backgroundColor: COLORS.color_01A669,
        borderRadius: SCALE_SIZE(20),
        marginRight: SCALE_SIZE(10),
        flexDirection: 'row',
        flexGrow: 1,
        gap: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        position: 'absolute',
        bottom: 80,
        left: 20,
    },
    modalBox: {
        width: SCALE_SIZE(119),
        height: SCALE_SIZE(164),
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: SCALE_SIZE(16),
        padding: SCALE_SIZE(16),
        justifyContent: 'space-between'
    },
    option: {
        paddingVertical: 4,
    },
    optionSelected: {
        height: SCALE_SIZE(39),
        backgroundColor: COLORS.white,
        elevation: 2,
        borderRadius: SCALE_SIZE(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrowDown: {
        position: 'absolute',
        bottom: -10,
        left: '50%',
        marginLeft: -2,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'rgba(255,255,255,0.5)',
    },
})

export default AiInterior;