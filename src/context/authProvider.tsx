import React, { createContext, useState, Dispatch, SetStateAction, useEffect } from "react";

//API
import { getUserProfile } from "../api";

//CONSTANTS
import { STORAGE_KEY } from "../constants";

//PACKAGES
import AsyncStorage from "@react-native-async-storage/async-storage";
interface AuthContextType {
    user: any;
    setUser: Dispatch<SetStateAction<any>>;
    profile: any;
    setProfile: Dispatch<SetStateAction<any>>;
    fetchProfile: (userId?: string | number) => Promise<any>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
    profile: null,
    setProfile: () => { },
    fetchProfile: async () => null
});

export const AuthProvider = (props: any) => {

    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        if (user?.userId) {
            fetchProfile(user.userId);
        }
    }, [user]);

    async function fetchProfile(userId?: string | number) {
        try {
            let finalUserId = userId;

            if (!finalUserId) {
                const storedUser = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS);
                if (storedUser) {
                    const parsed = JSON.parse(storedUser);
                    finalUserId = parsed?.userId;
                }
            }

            if (!finalUserId) {
                console.warn("No userId found for fetching profile.");
                return null;
            }

            const result: any = await getUserProfile({ userId: finalUserId });
            console.log("Fetching profile for userId:", finalUserId, "RESULT", JSON.stringify(result));

            if (result?.getUser?.success) {
                setProfile(result?.getUser?.data);
                return result?.getUser?.data;
            }

            return null;
        } catch (error) {
            console.error("Error fetching profile:", error);
            return null;
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                profile,
                setProfile,
                fetchProfile
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
