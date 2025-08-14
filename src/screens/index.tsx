//ONBOARDING SCREENS
import Splash from "./splash";
import LoginIntroduction from "./loginIntroduction";
import Login from "./login";
import SignUp from "./signUp";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";
import Location from "./location";
import PropertyType from "./propertyType";
import AddProfile from "./addProfile";
import LocationSearch from "./locationSearch";
import Loader from "./loader";
import ProgressView from "./progressView";
import Otp from "./otp";

//BOTTOMBAR SCREENS
import BottomBar from "./bottomBar/bottomBar";
import Home from "./bottomBar/home";
import Search from "./bottomBar/search";
import Chat from "./bottomBar/chat";
import Favourite from "./bottomBar/favourite";
import PropertyDetail from "./propertyDetail";
import AiInterior from "./aiInterior";
import Messaging from "./messaging";
import Notification from "./notification";
import UserProfile from "./userProfile";
import EditProfile from "./editProfile";

export const SCREENS = {
    Splash: {
        name: 'Splash',
        component: Splash
    },
    LoginIntroduction: {
        name: 'LoginIntroduction',
        component: LoginIntroduction
    },
    Login: {
        name: 'Login',
        component: Login
    },
    SignUp: {
        name: 'SignUp',
        component: SignUp
    },
    ForgotPassword: {
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    ResetPassword: {
        name: 'ResetPassword',
        component: ResetPassword
    },
    Location: {
        name: 'Location',
        component: Location
    },
    PropertyType: {
        name: 'PropertyType',
        component: PropertyType
    },
    AddProfile: {
        name: 'AddProfile',
        component: AddProfile
    },
    LocationSearch: {
        name: 'LocationSearch',
        component: LocationSearch
    },
    BottomBar: {
        name: 'BottomBar',
        component: BottomBar
    },
    Home: {
        name: 'Home',
        component: Home
    },
    Search: {
        name: 'Search',
        component: Search
    },
    Chat: {
        name: 'Chat',
        component: Chat
    },
    Favourite: {
        name: 'Favourite',
        component: Favourite
    },
    PropertyDetail: {
        name: 'PropertyDetail',
        component: PropertyDetail
    },
    AiInterior: {
        name: 'AiInterior',
        component: AiInterior
    },
    Messaging: {
        name: 'Messaging',
        component: Messaging
    },
    Notification: {
        name: 'Notification',
        component: Notification
    },
    UserProfile: {
        name: 'UserProfile',
        component: UserProfile
    },
    EditProfile: {
        name: 'EditProfile',
        component: EditProfile
    },
    Loader: {
        name: 'Loader',
        component: Loader
    },
    ProgressView: {
        name: 'ProgressView',
        component: ProgressView
    },
    Otp: {
        name: 'Otp',
        component: Otp
    }
}

