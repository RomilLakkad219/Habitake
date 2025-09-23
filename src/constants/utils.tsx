import { Dimensions, Platform } from 'react-native'

//PACKAGES
import StaticSafeAreaInsets from 'react-native-static-safe-area-insets';

const { width, height } = Dimensions.get('window')

const baseWidth = 428
const baseHeight = 926

const scaleWidth = width / baseWidth;
const scaleHeight = (height - (StaticSafeAreaInsets.safeAreaInsetsTop + StaticSafeAreaInsets.safeAreaInsetsBottom)) / baseHeight
const scale = Math.min(scaleWidth, scaleHeight)

const SCALE_SIZE = (size: number) => {
  return Math.ceil((size * scale)) + 2
}

const STORAGE_KEY = {
  USER_DETAILS: 'user_details_json',
  USER_PASSWORD: 'user_password'
}

const getAndroidInsets = (insets: any) => {
  const result = {
    paddingTop: Platform.OS === 'android' ? insets.top : 0,
    paddingBottom: Platform.OS === 'android' ? insets.bottom : 0,
  };

  console.log('Android Insets Applied:', result)
  return result
};

export { SCALE_SIZE, STORAGE_KEY, getAndroidInsets }