import React ,{useEffect} from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Screen from './srceen';
import store from './app/store'
import { MenuProvider } from 'react-native-popup-menu';
import {fcmService} from './firebase/FCMService'
import {localNotificationService} from './firebase/LocalNotificationService';
import {OnRegisterNotification,onNotification,onOpenNotification} from './notification/NotificationService';
import admob, { MaxAdContentRating } from '@react-native-firebase/admob';
export default App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(OnRegisterNotification, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification);
    admob().setRequestConfiguration({maxAdContentRating: MaxAdContentRating.PG,tagForChildDirectedTreatment: true,tagForUnderAgeOfConsent: true}).then(() => {console.log("Success Admod")}).catch((error)=>console.log("Error ADMOD"));
    return () => {
      console.log("[App] unRegister")
      fcmService.unRegister()
      localNotificationService.unregister()
    }
    
  }, [])
  return (
    <MenuProvider >
      <Provider store={store}>
        <StatusBar barStyle="default" />
        <Screen />
      </Provider>
    </MenuProvider>
  )
}