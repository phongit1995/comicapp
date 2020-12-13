import React, { useEffect } from 'react';
import { StatusBar, Alert, BackHandler, Linking } from 'react-native';
import { Provider } from 'react-redux';
import Screen from './srceen';
import store from './app/store'
import { MenuProvider } from 'react-native-popup-menu';
import { fcmService } from './firebase/FCMService'
import { localNotificationService } from './firebase/LocalNotificationService';
import { OnRegisterNotification, onNotification, onOpenNotification } from './notification/NotificationService';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
import Splash from './srceen/Splash';
import SplashScreen from 'react-native-splash-screen'
const supportedURL = "https://play.google.com/store/apps/details?id=com.phongnguyendev.vipmanga";
export default App = () => {
  useEffect(() => {
    Splash().then(result => {
      if (!result) {
        return (
          Alert.alert(
            "Manga Vip",
            "Chúng tôi ngừng hỗ trợ ứng dụng này, vui lòng cài đặt phiên bản ứng dụng mới",
            [
              {
                text: "Thoát",
                onPress: () => BackHandler.exitApp(),
                style: "cancel"
              },
              {
                text: "Cài đặt ngay", onPress: async () => {
                  setTimeout(() => {
                    Linking.openURL(supportedURL)
                  }, 100)
                  BackHandler.exitApp()
                }
              }
            ],
            { cancelable: false }
          )
        )
      }
      SplashScreen.hide()
    })
    fcmService.registerAppWithFCM()
    fcmService.register(OnRegisterNotification, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification);
    admob().setRequestConfiguration({ maxAdContentRating: MaxAdContentRating.PG, tagForChildDirectedTreatment: true, tagForUnderAgeOfConsent: true }).then(() => { console.log("Success Admod") }).catch((error) => console.log("Error ADMOD"));
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }

  }, [])
  return (
    <MenuProvider>
      <Provider store={store}>
        <StatusBar barStyle="default" />
        <Screen />
      </Provider>
    </MenuProvider>
  )
}