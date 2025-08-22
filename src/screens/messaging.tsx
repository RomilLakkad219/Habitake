import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, SectionList, Platform, TextInput, SafeAreaView } from "react-native"

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { COLORS, FONT_NAME, SCALE_SIZE, USE_STRING } from "../constants";

//COMPONENTS
import { Text } from "../components";

//PACKAGES
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Messaging = (props: any) => {

    const STRING = USE_STRING();

    const insets = useSafeAreaInsets();

    const textInputRef = useRef<any>(null)
    const [input, setInput] = useState<any>('')

    const chatSections = [
        {
            title: 'Today',
            data: [
                { id: 1, message: 'Hi dude, How are you?', time: '1:28 PM', isSender: true }
            ],
        },
    ];

    return (
        <View style={[styles.container, {
            marginTop: Platform.OS === 'android' ? insets.top : 0,
            paddingBottom: Platform.OS === 'android' ? insets.bottom : 0
        }]}>
            <SafeAreaView />
            <View style={styles.headerView}>
                <TouchableOpacity
                    onPress={() => {
                        props.navigation.goBack()
                    }}>
                    <Image
                        style={styles.backIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_back}>
                    </Image>
                </TouchableOpacity>
                <View style={styles.profileView}></View>
                <Text
                    font={FONT_NAME.bold}
                    color={COLORS.color_252B5C}
                    size={SCALE_SIZE(14)}>
                    {'Milano'}
                </Text>
            </View>
            <View style={styles.messageContainer}>
                <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : undefined}>
                    <SectionList
                        sections={chatSections}
                        inverted={true}
                        keyExtractor={(item, index) => item.id.toString() + index}
                        renderSectionFooter={({ section: { title } }) => (
                            <View style={styles.dateView}>
                                <Text
                                    align="center"
                                    size={SCALE_SIZE(10)}
                                    font={FONT_NAME.medium}
                                    color={COLORS.white}>
                                    {'December 12, 2022'}
                                </Text>
                            </View>
                        )}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <View style={styles.senderContainer}>
                                        <View style={styles.senderChatView}>
                                            <Text
                                                size={SCALE_SIZE(12)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_545A70}>
                                                {'Hi dude, How are you?'}
                                            </Text>
                                            <Text
                                                style={{ alignSelf: 'flex-end' }}
                                                size={SCALE_SIZE(8)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_545A70}>
                                                {'1:28 PM'}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.receiverProfileView}>
                                        <View style={styles.chatUserProfile}></View>
                                        <View style={[styles.receiverChatView, { maxWidth: '80%' }]}>
                                            <Text
                                                size={SCALE_SIZE(12)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_FDFDFD}>
                                                {'Thanks too. I’m also good. Both is\n going good also.'}
                                            </Text>
                                            <Text
                                                style={{ alignSelf: 'flex-end' }}
                                                size={SCALE_SIZE(8)}
                                                font={FONT_NAME.regular}
                                                color={COLORS.color_FDFDFD}>
                                                {'1:28 PM'}
                                            </Text>
                                        </View>
                                    </View>
                                </>
                            )
                        }} />
                </KeyboardAvoidingView>
                <View style={{ flex: 1 }}></View>
                <View style={styles.inputView}>
                    <Image
                        style={styles.cameraIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_camera} />
                    <Image
                        style={styles.attachmentIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_attach} />
                    <TextInput
                        ref={textInputRef}
                        style={styles.inputStyle}
                        value={input}
                        placeholder={STRING.say_something}
                        placeholderTextColor={COLORS.color_B0B3BD}
                        onChangeText={(text) => {
                            setInput(text)
                        }}>
                    </TextInput>
                    <View style={{ flex: 1 }}></View>
                    <Image
                        style={styles.sendIcon}
                        resizeMode="contain"
                        source={IMAGES.ic_send} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.color_FDFDFD,
        paddingHorizontal: SCALE_SIZE(16)
    },
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Platform.OS == 'ios' ? 0 : SCALE_SIZE(20)
    },
    backIcon: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        marginRight: SCALE_SIZE(20),
        alignSelf: 'center'
    },
    profileView: {
        height: SCALE_SIZE(44),
        width: SCALE_SIZE(44),
        borderRadius: SCALE_SIZE(22),
        backgroundColor: 'gray',
        marginRight: SCALE_SIZE(10),
        alignSelf: 'center'
    },
    messageContainer: {
        backgroundColor: COLORS.color_E6E6EA99,
        borderRadius: SCALE_SIZE(32),
        marginTop: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(20),
        flex: 1,
        paddingHorizontal: SCALE_SIZE(16),
    },
    senderContainer: {
        flexDirection: 'row',
        maxWidth: '80%',
        alignSelf: 'flex-end'
    },
    senderChatView: {
        backgroundColor: COLORS.white,
        borderRadius: SCALE_SIZE(10),
        marginLeft: SCALE_SIZE(8),
        paddingTop: SCALE_SIZE(5),
        paddingLeft: SCALE_SIZE(10),
        paddingRight: SCALE_SIZE(10),
        paddingBottom: SCALE_SIZE(5),
        marginTop: SCALE_SIZE(16),
    },
    receiverChatView: {
        backgroundColor: COLORS.color_01A669,
        borderRadius: SCALE_SIZE(10),
        marginRight: SCALE_SIZE(32),
        paddingTop: SCALE_SIZE(8),
        paddingLeft: SCALE_SIZE(10),
        paddingRight: SCALE_SIZE(10),
        paddingBottom: SCALE_SIZE(5),
        alignSelf: 'flex-start',
    },
    chatUserProfile: {
        height: SCALE_SIZE(30),
        width: SCALE_SIZE(30),
        borderRadius: SCALE_SIZE(15),
        marginRight: SCALE_SIZE(8),
        backgroundColor: COLORS.black
    },
    receiverProfileView: {
        flexDirection: 'row',
        marginTop: SCALE_SIZE(80)
    },
    dateView: {
        paddingVertical: SCALE_SIZE(6),
        paddingHorizontal: SCALE_SIZE(12),
        backgroundColor: COLORS.color_8A8E9D,
        borderRadius: SCALE_SIZE(100),
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: SCALE_SIZE(20)
    },
    inputView: {
        flexDirection: 'row',
        height: SCALE_SIZE(56),
        alignItems: 'center',
        backgroundColor: '#FFFFFFCC',
        borderRadius: SCALE_SIZE(32),
        paddingHorizontal: SCALE_SIZE(16),
        marginBottom: SCALE_SIZE(20)
    },
    inputStyle: {
        fontSize: SCALE_SIZE(15),
        color: COLORS.black,
        marginLeft: SCALE_SIZE(10),
        flex: 1.0,
        fontFamily: FONT_NAME.regular,
    },
    cameraIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
        marginRight: SCALE_SIZE(10)
    },
    attachmentIcon: {
        height: SCALE_SIZE(20),
        width: SCALE_SIZE(20),
        alignSelf: 'center',
    },
    sendIcon: {
        height: SCALE_SIZE(40),
        width: SCALE_SIZE(40),
        alignSelf: 'center',
    }
})

export default Messaging;