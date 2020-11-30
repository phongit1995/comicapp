import React ,{useEffect} from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import Screen from './srceen';
import store from './app/store'
import { MenuProvider } from 'react-native-popup-menu';
import {fcmService} from './firebase/FCMService'
import {localNotificationService} from './firebase/LocalNotificationService';
export default App = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM()
    fcmService.register(onRegister, onNotification, onOpenNotification)
    localNotificationService.configure(onOpenNotification)

    function onRegister(token) {
      console.log("[App] onRegister: ", token)
    }

    function onNotification(notify) {
      console.log("[App] onNotification: ", notify)
      const options = {
        soundName: 'default',
        playSound: true //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      }
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options
      )
    }

    function onOpenNotification(notify) {
      console.log("[App] onOpenNotification: ", notify)
      alert("Open Notification: " + notify.body)
    }

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