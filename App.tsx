import React, { JSX } from 'react';
import { View, StyleSheet, LogBox, StatusBar } from 'react-native'

//PACKAGES
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _ from 'lodash';
import Toast, {
  BaseToast,
  ErrorToast,
  InfoToast,
} from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';

//SCREENS
import { SCREENS } from './src/screens';

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from './src/constants';

//CONTEXT
import { AuthProvider } from './src/context';

LogBox.ignoreAllLogs()

const { Navigator, Screen } = createStackNavigator()

const toastConfig = {
  success: (props: any) => (
    <BaseToast {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: SCALE_SIZE(15) }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light
      }}>
    </BaseToast>
  ),
  error: (props: any) => (
    <ErrorToast  {...props}
      text1NumberOfLines={5}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light,
        flexWrap: 'wrap'
      }}
    >
    </ErrorToast>
  ),
  info: (props: any) => (
    <InfoToast {...props}
      style={{ borderLeftColor: COLORS.gray }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light
      }}>
    </InfoToast>
  )
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <AuthProvider>
          <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} translucent={false} backgroundColor={COLORS.white} />
            <NavigationContainer>
              <Navigator
                initialRouteName={SCREENS.Splash.name}
                screenOptions={{ headerShown: false, gestureEnabled: false }}>
                {_.toArray(SCREENS).map((item: any) => {
                  return item.component ? (
                    <Screen
                      key={item.name}
                      name={item.name}
                      component={item.component}
                    />
                  ) : null;
                })}
              </Navigator>
            </NavigationContainer>
            <Toast config={toastConfig} />
          </View>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0
  }
})

export default App;
