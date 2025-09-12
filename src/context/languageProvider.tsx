import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNLocalize from "react-native-localize";
import i18n from "../translation/i18n";

export const LaungageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {
    const [language, setLanguage] = useState<string>("en");

    const getSystemLanguage = () => {
        const locales = RNLocalize.getLocales();
        let deviceLang = locales[0]?.languageCode || "en";

        // Allow only supported languages
        if (!["en", "es"].includes(deviceLang)) {
            deviceLang = "en";
        }
        return deviceLang;
    };

    const loadLanguage = async () => {
        try {
            const savedLang = await AsyncStorage.getItem("APP_LANGUAGE");
            const isUserSelected = await AsyncStorage.getItem("APP_LANGUAGE_SELECTED");

            if (savedLang && isUserSelected === "true") {
                // User manually selected
                setLanguage(savedLang);
                i18n.changeLanguage(savedLang);
                console.log("Loaded user language:", savedLang);
            } else {
                // System language fallback
                const systemLang = getSystemLanguage();
                setLanguage(systemLang);
                i18n.changeLanguage(systemLang);
                console.log("Using system language:", systemLang);

                await AsyncStorage.setItem("APP_LANGUAGE", systemLang);
                await AsyncStorage.setItem("APP_LANGUAGE_SELECTED", "false");
            }
        } catch (e) {
            console.log("Error loading language:", e);
        }
    };

    useEffect(() => {
        loadLanguage();
    }, []);

    const setLang = async (lang: string) => {
        try {
            setLanguage(lang);
            i18n.changeLanguage(lang);
            await AsyncStorage.setItem("APP_LANGUAGE", lang);
            await AsyncStorage.setItem("APP_LANGUAGE_SELECTED", "true");
        } catch (e) {
            console.log("Error saving language:", e);
        }
    };

    return (
        <LaungageContext.Provider value={{ language, setLang }}>
            {children}
        </LaungageContext.Provider>
    );
};
