import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props:any) => {

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            profile,
            setProfile,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}