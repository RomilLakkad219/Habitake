import React, { createContext, JSX, useEffect, useState } from 'react';

//CONSTANTS
import { STORAGE_KEY } from '../constants';

//PACKAGES
import i18n from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LanguageContextType = {
    children: JSX.Element;
};

export const LaungageContext = createContext<any>(null);

export function LanguageProvider(props: LanguageContextType) {
    const [language, setLang] = useState('en');

    useEffect(() => {
        const loadLanguage = async () => {
            const storedLang = await AsyncStorage.getItem(STORAGE_KEY.USER_LANGLUAGE);

            const initialLang = storedLang || 'en';
            i18n.changeLanguage(initialLang);
            setLang(initialLang);
        };

        loadLanguage();
    }, []);

    const setLanguage = async (lang: string) => {
        try {
            let data = await AsyncStorage.setItem(STORAGE_KEY.USER_LANGLUAGE, JSON.stringify(lang));
            await i18n.changeLanguage(lang);
            setLang(lang);
        } catch (e) {
        }
    };

    return (
        <LaungageContext.Provider
            value={{
                language,
                setLanguage,
            }}>
            {props.children}
        </LaungageContext.Provider>
    );
}
