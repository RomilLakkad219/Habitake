import React, { createContext, useState, Dispatch, SetStateAction } from "react";

//API
import { getUserProfile } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEY } from "../constants";
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

    async function fetchProfile() {

        const storedUser = await AsyncStorage.getItem(STORAGE_KEY.USER_DETAILS);
        if (storedUser) {
            var parsed = JSON.parse(storedUser)
        }

        const params = {
            user_id: parsed?.userId,
        }

        const result = await getUserProfile(params)

        console.log("Fetching profile for userId:", parsed?.userId, "RESULT", JSON.stringify(result));

        if (result.status) {
            setProfile(result?.data?.data)
            return result?.data?.data
        }

        return null
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
