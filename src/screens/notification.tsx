import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, SCALE_SIZE, FONT_NAME, STRING } from "../constants";

//COMPONENTS
import { Header, Text } from "../components";

//PACKAGES
import { SwipeListView } from 'react-native-swipe-list-view';

//SCREENS
import { SCREENS } from ".";

const Notification = (props: any) => {

    const todayList = [{
        id: '1',
        name: 'Velma Cole',
        profileImage: '',
        message: 'Just messaged you. Check the message in message tab.',
        time: '10 mins ago'
    },
    {
        id: '2',
        name: 'Emmett Perry',
        profileImage: '',
        message: 'Just messaged you. Check the message in message tab.',
        time: '16 mins ago'
    },
    {
        id: '3',
        name: 'Walter Lindsey',
        profileImage: '',
        message: 'Just messaged you. Check the message in message tab.',
        time: '2 hours ago'
    }]

    const [swipedRow, setSwipedRow] = useState<any>(null);
    const [olderNotificationList, setOlderNotificationList] = useState([{
        id: '1',
        name: 'Exclusive Offers Inside',
        profileImage: '',
        message: 'Lorem Ipsum is simply dummy text of the printing\nand typesetting industry.',
        time: '1 day ago'
    },
    {
        id: '2',
        name: 'Walter Lindsey',
        profileImage: '',
        message: 'Just messaged you. Check the message in message tab.',
        time: '7 days ago'
    },
    {
        id: '3',
        name: 'Velma Cole',
        profileImage: '',
        message: 'Just messaged you. Check the message in message tab.',
        time: '10 days ago'
    }])

    const deleteRow = (rowKey: any) => {
        const newData = [...olderNotificationList];
        const prevIndex = olderNotificationList.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setOlderNotificationList(newData);
        setSwipedRow(null);
    };

    const renderHiddenItem = (data: any, rowMap: any) => (
        <View style={styles.rowBack}>
            {swipedRow === data.item.id && (
                <TouchableOpacity style={styles.deleteBtn} onPress={() =>
                    deleteRow(data.item.id)}>
                    <Image
                        style={styles.deleteIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_trash}>
                    </Image>
                </TouchableOpacity>
            )}
        </View>
    )

    return (
        <View style={styles.container}>
            <SafeAreaView />
            <Header
                type="home"
                locationText={'1012 Ocean avanue, New yourk, USA'}
                profileIcon={''}
                onProfile={() => {
                    props.navigation.navigate(SCREENS.UserProfile.name)
                }} />
            <Text
                style={{ marginTop: SCALE_SIZE(35) }}
                size={SCALE_SIZE(18)}
                font={FONT_NAME.semiBold}
                color={COLORS.color_252B5C}>
                {STRING.today}
            </Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <FlatList data={todayList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.notificationView, {
                                    backgroundColor: index == 0 ? COLORS.color_C0BAD1 : COLORS.color_E6E6EA66,
                                    marginTop: index == 0 ? SCALE_SIZE(20) : SCALE_SIZE(10)
                                }]}>
                                    <View style={styles.profileView}></View>
                                    {index == 2 ?
                                        <>
                                            <View>
                                                <Text
                                                    style={{ marginTop: SCALE_SIZE(6) }}
                                                    size={SCALE_SIZE(16)}
                                                    font={FONT_NAME.bold}
                                                    color={COLORS.color_333A54}>
                                                    {item.name}
                                                    <Text
                                                        size={SCALE_SIZE(14)}
                                                        font={FONT_NAME.regular}
                                                        color={COLORS.color_545A70}>
                                                        {' is added a new\nproperty near by your location.'}
                                                    </Text>
                                                </Text>
                                                <Text
                                                    style={{ marginTop: SCALE_SIZE(6) }}
                                                    size={SCALE_SIZE(10)}
                                                    font={FONT_NAME.regular}
                                                    color={COLORS.color_8A8E9D}>
                                                    {item.time}
                                                </Text>
                                            </View>
                                            <View style={{ flex: 1 }}></View>
                                            <View style={styles.propertyImage}></View>
                                        </>
                                        :
                                        <View>
                                            <Text
                                                style={{ marginTop: SCALE_SIZE(6) }}
                                                size={SCALE_SIZE(16)}
                                                font={FONT_NAME.semiBold}
                                                color={COLORS.color_333A54}>
                                                {item.name}
                                            </Text>
                                            <Text
                                                size={SCALE_SIZE(14)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_545A70}>
                                                {STRING.just_messaged_you}
                                                <Text
                                                    size={SCALE_SIZE(14)}
                                                    font={FONT_NAME.regular}
                                                    color={COLORS.color_545A70}>
                                                    {STRING.check_the_message_in}
                                                </Text>
                                                <Text
                                                    size={SCALE_SIZE(14)}
                                                    font={FONT_NAME.bold}
                                                    color={COLORS.color_333A54}>
                                                    {STRING.message}
                                                </Text>
                                                <Text
                                                    size={SCALE_SIZE(14)}
                                                    font={FONT_NAME.regular}
                                                    color={COLORS.color_545A70}>
                                                    {STRING.tab}
                                                </Text>
                                            </Text>
                                            <Text
                                                style={{ marginTop: SCALE_SIZE(6) }}
                                                size={SCALE_SIZE(10)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_8A8E9D}>
                                                {item.time}
                                            </Text>
                                        </View>
                                    }
                                </View>
                            )
                        }}>
                    </FlatList>
                </View>
                <Text
                    style={{ marginTop: SCALE_SIZE(34) }}
                    size={SCALE_SIZE(18)}
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_252B5C}>
                    {STRING.older_notifications}
                </Text>
                <SwipeListView
                    data={olderNotificationList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <NotificationItem
                            item={item}
                            index={index}
                            onPress={() => { }}
                        />
                    )}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    disableRightSwipe
                    onRowOpen={(rowKey) => setSwipedRow(rowKey)}
                    onRowClose={(rowKey) => {
                        if (swipedRow === rowKey) setSwipedRow(null)
                    }}
                />
            </ScrollView>
        </View>
    )
}

type NotificationProps = {
    item: {
        id: string;
        profileImage: any;
        name: string;
        message: string;
        time: string;
    };
    index: number;
    onPress?: () => void
}

const NotificationItem = ({ item, onPress, index }: NotificationProps) => {
    return (
        <View style={[styles.notificationView, {
            backgroundColor: COLORS.color_E6E6EA66,
            marginTop: index == 0 ? SCALE_SIZE(20) : SCALE_SIZE(10),
            marginBottom: index == 2 ? SCALE_SIZE(15) : 0
        }]}>
            <View style={styles.profileView}></View>
            {index == 0 &&
                <View>
                    <Text
                        style={{ marginTop: SCALE_SIZE(6) }}
                        size={SCALE_SIZE(16)}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}>
                        {item.name}
                    </Text>
                    <Text
                        size={SCALE_SIZE(14)}
                        font={FONT_NAME.regular}
                        color={COLORS.color_545A70}>
                        {item.message}
                    </Text>
                    <Text
                        style={{ marginTop: SCALE_SIZE(6) }}
                        size={SCALE_SIZE(10)}
                        font={FONT_NAME.regular}
                        color={COLORS.color_8A8E9D}>
                        {item.time}
                    </Text>
                </View>
            }
            {index == 1 &&
                <>
                    <View>
                        <Text
                            style={{ marginTop: SCALE_SIZE(6) }}
                            size={SCALE_SIZE(16)}
                            font={FONT_NAME.bold}
                            color={COLORS.color_333A54}>
                            {'Walter Lindsey'}
                            <Text
                                size={SCALE_SIZE(14)}
                                font={FONT_NAME.regular}
                                color={COLORS.color_545A70}>
                                {' is changed the price of\nthe property.'}
                            </Text>
                        </Text>
                        <Text
                            style={{ marginTop: SCALE_SIZE(6) }}
                            size={SCALE_SIZE(10)}
                            font={FONT_NAME.regular}
                            color={COLORS.color_8A8E9D}>
                            {item.time}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.propertyImage}></View>
                </>
            }
            {index == 2 &&
                <View>
                    <Text
                        style={{ marginTop: SCALE_SIZE(6) }}
                        size={SCALE_SIZE(16)}
                        font={FONT_NAME.semiBold}
                        color={COLORS.color_333A54}>
                        {item.name}
                    </Text>
                    <Text
                        size={SCALE_SIZE(14)}
                        font={FONT_NAME.regular}
                        color={COLORS.color_545A70}>
                        {STRING.just_messaged_you}
                        <Text
                            size={SCALE_SIZE(14)}
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {STRING.check_the_message_in}
                        </Text>
                        <Text
                            size={SCALE_SIZE(14)}
                            font={FONT_NAME.bold}
                            color={COLORS.color_333A54}>
                            {STRING.message}
                        </Text>
                        <Text
                            size={SCALE_SIZE(14)}
                            font={FONT_NAME.regular}
                            color={COLORS.color_545A70}>
                            {STRING.tab}
                        </Text>
                    </Text>
                    <Text
                        style={{ marginTop: SCALE_SIZE(6) }}
                        size={SCALE_SIZE(10)}
                        font={FONT_NAME.regular}
                        color={COLORS.color_8A8E9D}>
                        {item.time}
                    </Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16),
    },
    notificationView: {
        borderRadius: SCALE_SIZE(25),
        padding: SCALE_SIZE(10),
        flexDirection: 'row'
    },
    profileView: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        borderRadius: SCALE_SIZE(25),
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        elevation: 2,
        marginRight: SCALE_SIZE(14),
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    propertyImage: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(60),
        borderRadius: SCALE_SIZE(10),
        alignSelf: 'center',
        backgroundColor: COLORS.white,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        marginTop: SCALE_SIZE(10),
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    deleteBtn: {
        backgroundColor: COLORS.color_34216B,
        width: SCALE_SIZE(100),
        height: SCALE_SIZE(100),
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: SCALE_SIZE(25),
        borderBottomRightRadius: SCALE_SIZE(25),
    },
    deleteIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(17),
        alignSelf: 'center'
    }
})

export default Notification;