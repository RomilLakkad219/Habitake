import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as RNLocalize from "react-native-localize";
import i18n from "../translation/i18n";
import { AppState } from "react-native";

export const LaungageContext = createContext<any>(null);

export const LanguageProvider = ({ children }: any) => {

    const [language, setLanguage] = useState<string>("en");

    const loadLanguage = async () => {
        try {
            const savedLang = await AsyncStorage.getItem("APP_LANGUAGE");
            const isUserSelected = await AsyncStorage.getItem("APP_LANGUAGE_SELECTED");

            if (!savedLang || !isUserSelected) {
                //First install → use system language
                const locales = RNLocalize.getLocales();
                let deviceLang = locales[0]?.languageCode || "en";

                if (deviceLang !== "en" && deviceLang !== "es") {
                    deviceLang = "en";
                }

                console.log("First launch - using system language:", deviceLang);
                setLanguage(deviceLang);
                i18n.changeLanguage(deviceLang);

                await AsyncStorage.setItem("APP_LANGUAGE", deviceLang);
                await AsyncStorage.setItem("APP_LANGUAGE_SELECTED", "false");
            } else if (isUserSelected === "true" && savedLang) {
                // User manually selected language → always respect it
                console.log("Loaded user selected language:", savedLang);
                setLanguage(savedLang);
                i18n.changeLanguage(savedLang);
            } else {
                // System language fallback (when user has not selected manually)
                const locales = RNLocalize.getLocales();
                let deviceLang = locales[0]?.languageCode || "en";

                if (deviceLang !== "en" && deviceLang !== "es") {
                    deviceLang = "en";
                }

                console.log("Using system language:", deviceLang);
                setLanguage(deviceLang);
                i18n.changeLanguage(deviceLang);

                await AsyncStorage.setItem("APP_LANGUAGE", deviceLang);
                await AsyncStorage.setItem("APP_LANGUAGE_SELECTED", "false");
            }
        } catch (e) {
            console.log("Error loading language:", e);
        }
    };


    useEffect(() => {
        loadLanguage();

        // Watch app foreground → reload system lang if not overridden
        const subscription = AppState.addEventListener("change", async (nextState) => {
            if (nextState === "active") {
                const isUserSelected = await AsyncStorage.getItem("APP_LANGUAGE_SELECTED");
                if (isUserSelected !== "true") {
                    loadLanguage();
                }
            }
        });

        return () => subscription.remove();
    }, []);

    //User manually selects language
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
