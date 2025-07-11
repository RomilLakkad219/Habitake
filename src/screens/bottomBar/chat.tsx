import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, STRING } from "../../constants";

//COMPONENTS
import { ChatDeleteSheet, Text } from "../../components";

//PACKAGES
import { SwipeListView } from 'react-native-swipe-list-view';

//SCREENS
import { SCREENS } from "..";

const Chat = (props: any) => {

    const onChatDeleteRef = useRef<any>(null)

    const [swipedRow, setSwipedRow] = useState<any>(null);
    const [chatData, setChatData] = useState([
        {
            id: '1',
            name: 'Walter Lindsey',
            message: 'tempor incididunt ut labore et dolore',
            time: '1 day ago',
            image: ''
        },
        {
            id: '2',
            name: 'Velma Cole',
            message: 'tempor incididunt ut labore et dolore',
            time: '2 days ago',
            image: ''
        },
        {
            id: '3',
            name: 'Samuel Ella',
            message: 'tempor incididunt ut labore et dolore',
            time: '21:00',
            image: ''
        },
        {
            id: '4',
            name: 'Milano',
            message: 'tempor incididunt ut labore et dolore',
            time: '11:30',
            image: ''
        },
        {
            id: '5',
            name: 'Milano',
            message: 'tempor incididunt ut labore et dolore',
            time: '11:30',
            image: ''
        },
    ]);

    const deleteRow = (rowKey: any) => {
        const newData = [...chatData];
        const prevIndex = chatData.findIndex(item => item.id === rowKey);
        newData.splice(prevIndex, 1);
        setChatData(newData);
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
    );

    return (
        <View style={styles.container}>
             <SafeAreaView />
            <Text
                style={{ marginTop: SCALE_SIZE(20) }}
                font={FONT_NAME.semiBold}
                color={COLORS.color_252B5C}
                size={SCALE_SIZE(18)}>
                {STRING.all_chats}
            </Text>
            <SwipeListView
                data={chatData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ChatItem
                        item={item}
                        onPress={() =>
                            // onChatDeleteRef?.current?.open()
                            props.navigation.navigate(SCREENS.Messaging.name)
                        }
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
            <ChatDeleteSheet onRef={onChatDeleteRef} onCancel={() => {
                onChatDeleteRef?.current?.close()
            }}
                onDelete={() => {

                }} />
        </View>
    )
}

type ChatProps = {
    item: {
        id: string;
        image: any;
        name: string;
        message: string;
        time: string;
    };
    onPress?: () => void
}

const ChatItem = ({ item, onPress }: ChatProps) => {
    return (
        <TouchableOpacity style={[styles.chatView, { marginTop: SCALE_SIZE(10) }]}
            onPress={onPress}>
            <View style={styles.profileView}></View>
            <View>
                <Text
                    font={FONT_NAME.semiBold}
                    color={COLORS.color_252B5C}
                    size={SCALE_SIZE(14)}>
                    {item.name}
                </Text>
                <Text
                    style={{ marginTop: SCALE_SIZE(4) }}
                    font={FONT_NAME.regular}
                    color={COLORS.color_545A70}
                    size={SCALE_SIZE(12)}>
                    {item.message}
                </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <Text
                font={FONT_NAME.regular}
                color={COLORS.color_8A8E9D}
                size={SCALE_SIZE(10)}>
                {item.time}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16)
    },
    chatView: {
        backgroundColor: COLORS.color_E6E6EA66,
        borderRadius: SCALE_SIZE(25),
        paddingHorizontal: SCALE_SIZE(16),
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SCALE_SIZE(16)
    },
    profileView: {
        height: SCALE_SIZE(50),
        width: SCALE_SIZE(50),
        backgroundColor: 'gray',
        borderRadius: SCALE_SIZE(25),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(14)
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
        height: '100%',
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

export default Chat;