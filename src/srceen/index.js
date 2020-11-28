import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator ,TransitionPresets } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as SCREEN from './../constants/screen';
import Home from './Home/index';
import History from './History';
import Category from './Category';
import Follow from './Follow';
import Info from './Info';
import Login from './Login'
import DetialComic from './DetialComic';
import PageComic from './PageComic';
import Search from './Search';
import Setting from './Setting';
import analytics from '@react-native-firebase/analytics';
const TabBottom = createBottomTabNavigator();
const Stack = createStackNavigator();
const Screen=()=>{
    const routeNameRef = React.useRef();
    const navigationRef = React.useRef();
    return(
        <NavigationContainer 
        ref={navigationRef}
        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name
          if (previousRouteName !== currentRouteName) {
            analytics().logScreenView({
                screen_name: currentRouteName,
              });
          }
          routeNameRef.current = currentRouteName;
        }}
        >
             <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name={SCREEN.MAIN_SCREEN} component={BottomTab} />
                <Stack.Screen name={SCREEN.LOGIN_SCREEN} component={Login} options={{...TransitionPresets.SlideFromRightIOS}}/>
                <Stack.Screen name={SCREEN.DETIAL_COMIC_SCREEN} component={DetialComic} options={{...TransitionPresets.SlideFromRightIOS}}/>
                <Stack.Screen name={SCREEN.PAGE_COMIC_SCREEN} component={PageComic} 
                    options={({route})=>({
                        title:route.params.type==1?"Truyện Mới Nhất":"Truyện Hot Nhất",
                        headerShown:true,...TransitionPresets.SlideFromRightIOS
                })}/>
                <Stack.Screen name={SCREEN.SEARCH_SCREEN} component={Search} options={{...TransitionPresets.SlideFromRightIOS}}/>
             </Stack.Navigator>
        </NavigationContainer>
    )
}
const BottomTab = ()=>{
    return (
        <TabBottom.Navigator tabBarOptions={{style:{paddingBottom:5}}} initialRouteName={SCREEN.HOME_SCREEN} >
            <TabBottom.Screen 
                name={SCREEN.HOME_SCREEN} 
                component={Home}
                options={{ title: 'Trang Chủ',
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <Ionicons name={"ios-home-outline"} size={25}/>
                    }
                    else {
                        return <Ionicons name={"ios-home-outline"} size={20}/>
                    }
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.CATEGORY_SCREEN} 
                component={Category}
                options={{ title: 'Thể Loại' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <IconFather name={"layers"} size={25}/>
                    }
                    else {
                        return <IconFather name={"layers"} size={20}/>
                    }
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.FOLLOW_SCREEN} 
                component={Follow}
                options={{ title: 'Theo Dõi' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <Icon name={"wifi"} size={25}/>
                    }
                    else {
                        return <Icon name={"wifi"} size={20}/>
                    }
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.HISTORY_SCREEN} 
                component={History}
                options={{ title: 'Lịch Sử',
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <FontAwesome name={"calendar"} size={25}/>
                    }
                    else {
                        return <FontAwesome name={"calendar"} size={20}/>
                    } 
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.SETTING_SCREEN} 
                component={Setting}
                options={{ title: 'Cài Đặt' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <IconFather name={"settings"} size={25}/>
                    }
                    else {
                        return <IconFather name={"settings"} size={20}/>
                    } 
                }}} 
            />
        </TabBottom.Navigator>
    )
}
export default Screen ;