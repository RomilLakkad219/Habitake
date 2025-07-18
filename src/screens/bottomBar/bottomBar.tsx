import React from "react"

//COMPONENT
import TabBar from "../../components/tabBar";

//PACKAGES
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//SCREENS
import { SCREENS } from "..";

const BottomBar = (props: any) => {

    const Tab = createBottomTabNavigator()

    return (
        <>
            <Tab.Navigator screenOptions={{
                headerShown: false,
            }}
                tabBar={props =>
                    <TabBar
                        {...props}
                    />
                }>
                <Tab.Screen name={SCREENS.Home.name} component={SCREENS.Home.component} />
                <Tab.Screen name={SCREENS.Search.name} component={SCREENS.Search.component} />
                <Tab.Screen name={SCREENS.Chat.name} component={SCREENS.Chat.component} />
                <Tab.Screen name={SCREENS.Favourite.name} component={SCREENS.Favourite.component} />
            </Tab.Navigator>
        </>
    )
}

export default BottomBar;