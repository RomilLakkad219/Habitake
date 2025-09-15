import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Modal, FlatList, Image, StyleSheet } from "react-native";

//ASSETS
import { IMAGES } from "../assets";

//CONSTANTS
import { FONT_NAME, SCALE_SIZE } from "../constants";

//COMPONENTS
import Text from "./text";

//CONTEXT
import { LaungageContext } from "../context/languageProvider";

const LANGUAGES = [
    { code: "en", name: "English", flag: IMAGES.ic_uk },
    { code: "es", name: "Spanish", flag: IMAGES.ic_spanish },
];

export default function LanguageSelector() {

    const { language, setLang } = useContext(LaungageContext);

    const [visible, setVisible] = useState<boolean>(false);

    const selectedLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

    const handleSelect = (lang: any) => {
        setLang(lang.code);
        setVisible(false);
        console.log("Selected language:", lang.code);
    };

    return (
        <View style={[styles.container, { marginRight: SCALE_SIZE(10) }]}>
            <TouchableOpacity style={styles.button} onPress={() => setVisible(true)}>
                <Image source={selectedLang.flag} style={styles.flag} />
                <Text style={styles.text}
                    font={FONT_NAME.medium}
                    color={'#000929'}
                    size={SCALE_SIZE(16)}>{selectedLang.name}</Text>
            </TouchableOpacity>
            <Modal visible={visible} transparent animationType="fade">
                <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.dropdown}>
                        <FlatList
                            data={LANGUAGES}
                            keyExtractor={(item) => item.code}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        selectedLang.code === item.code && styles.selectedOption,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    <Image source={item.flag} style={styles.flag} />
                                    <Text
                                        style={[
                                            styles.text,
                                            selectedLang.code === item.code && styles.selectedText,
                                        ]}
                                        font={FONT_NAME.medium}
                                        color={'#000929'}
                                        size={SCALE_SIZE(16)}
                                    >
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-start",
        marginTop: SCALE_SIZE(8)
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: SCALE_SIZE(25),
        paddingVertical: SCALE_SIZE(8),
        paddingHorizontal: SCALE_SIZE(12),
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: SCALE_SIZE(4),
        elevation: 3,
    },
    flag: {
        width: SCALE_SIZE(24),
        height: SCALE_SIZE(24),
        marginRight: SCALE_SIZE(8),
        borderRadius: SCALE_SIZE(12),
    },
    text: {
        fontSize: SCALE_SIZE(16),
        color: "#333",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    dropdown: {
        position: "absolute",
        top: SCALE_SIZE(70),
        backgroundColor: "#fff",
        borderRadius: SCALE_SIZE(15),
        padding: SCALE_SIZE(10),
        width: SCALE_SIZE(200),
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 5,
        zIndex: 1000,
        right: 0,
        marginRight: SCALE_SIZE(10)
    },
    option: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: SCALE_SIZE(10),
        paddingHorizontal: SCALE_SIZE(12),
        borderRadius: SCALE_SIZE(10),
    },
    selectedOption: {
        backgroundColor: "#f0f0f0",
    },
    selectedText: {
        fontWeight: "bold",
        color: "#6a1b9a",
    },
});
