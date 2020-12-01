import {localNotificationService} from './../firebase/LocalNotificationService';
import * as NotificationType from './../constants/notification.type';
import * as RootNavigation from './../srceen/RefNavigation';
import * as SCREEN from './../constants/screen';
export const OnRegisterNotification=(token)=>{
    console.log("[App] onRegister: ", token)
}
export const  onNotification=(notify)=> {
    console.log("[App] onNotification: ", notify)
    const options = {
      soundName: 'default',
      playSound: true //,
      // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
      // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
    }
    localNotificationService.showNotification(
      0,
      notify.notification.title,
      notify.notification.body,
      notify,
      options
    )
}
export const onOpenNotification=(notify)=> {
    //console.log(notify);
    if(notify.data?.type==NotificationType.NEW_CHAPTER ||notify.type==NotificationType.NEW_CHAPTER){
        let id = notify.data.id||notify.id;
        RootNavigation.navigate(SCREEN.DETIAL_COMIC_SCREEN,{id:id})
    }
}