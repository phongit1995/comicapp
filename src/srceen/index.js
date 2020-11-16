import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFather from 'react-native-vector-icons/Feather';
import * as SCREEN from './../constants/screen';
import Home from './Home/index';
import History from './History';
import Category from './Category';
import Follow from './Follow';
import Info from './Info';
import Login from './Login'
const TabBottom = createBottomTabNavigator();
const Stack = createStackNavigator();
const Screen=()=>{
    return(
        <NavigationContainer >
             <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name={SCREEN.MAIN_SCREEN} component={BottomTab} />
                <Stack.Screen name={SCREEN.LOGIN_SCREEN} component={Login} />
             </Stack.Navigator>
        </NavigationContainer>
    )
}
const BottomTab = ()=>{
    return (
        <TabBottom.Navigator tabBarOptions={{style:{paddingBottom:5,borderRadius:10}}} initialRouteName={SCREEN.HOME_SCREEN} >
            <TabBottom.Screen 
                name={SCREEN.HOME_SCREEN} 
                component={Home}
                options={{ title: 'Trang Chủ',
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <Icon name={"home"} size={30}/>
                    }
                    else {
                        return <Icon name={"home"} size={20}/>
                    }
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.CATEGORY_SCREEN} 
                component={Category}
                options={{ title: 'Thể Loại' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <IconFather name={"layers"} size={30}/>
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
                        return <Icon name={"wifi"} size={30}/>
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
                        return <FontAwesome name={"calendar"} size={30}/>
                    }
                    else {
                        return <FontAwesome name={"calendar"} size={20}/>
                    } 
                }}}
            />
            <TabBottom.Screen 
                name={SCREEN.INFO_SCREEN} 
                component={Info}
                options={{ title: 'Tôi' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <IconEvilIcons name={"user"} size={30}/>
                    }
                    else {
                        return <IconEvilIcons name={"user"} size={20}/>
                    } 
                }}} 
            />
        </TabBottom.Navigator>
    )
}
export default Screen ;