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
import { I18nextProvider } from 'react-i18next';
import i18n from './src/translation/i18n';

//SCREENS
import { SCREENS } from './src/screens';

//CONSTANT
import { COLORS, FONT_NAME, SCALE_SIZE } from './src/constants';

//CONTEXT
import { AuthProvider } from './src/context';
import { LanguageProvider } from './src/context/languageProvider';

//COMPONENTS
import { Text } from './src/components';

LogBox.ignoreAllLogs()

const { Navigator, Screen } = createStackNavigator()

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: SCALE_SIZE(15) }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light
      }}
    />
  ),

  // Small error (short messages)
  smallError: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={2}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light,
      }}
    />
  ),

  // Long error (detailed messages)
  longError: ({ text1 }: any) => (
    <View
      style={styles.longErrorToastView}>
      <Text
        style={styles.longErrorToastText}>
        {text1}
      </Text>
    </View>
  ),

  info: (props: any) => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: COLORS.gray }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: SCALE_SIZE(16),
        fontFamily: FONT_NAME.light,
      }}
    />
  ),
}

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <I18nextProvider i18n={i18n}>
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
        </I18nextProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0
  },
  longErrorToastView: {
    backgroundColor: 'white',
    borderLeftWidth: 6,
    borderLeftColor: 'red',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  longErrorToastText: {
    fontSize: SCALE_SIZE(16),
    fontFamily: FONT_NAME.light,
    lineHeight: 22,
    color: '#000',
    fontWeight: '700'
  },
})

export default App;
