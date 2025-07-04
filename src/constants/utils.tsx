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
  return Math.ceil((size * scale))
}

const STORAGE_KEY = {
  USER_DETAILS: 'user_details_json',
}

export { SCALE_SIZE, STORAGE_KEY }