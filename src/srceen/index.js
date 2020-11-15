import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import * as SCREEN from './../constants/screen';
import Home from './Home/index';
import History from './History';
import Category from './Category';
import Follow from './Follow';
import Info from './Info';
const TabBottom = createBottomTabNavigator();
const Screen=()=>{
    return(
        <NavigationContainer >
           <BottomTab></BottomTab>
        </NavigationContainer>
    )
}
const BottomTab = ()=>{
    return (
        <TabBottom.Navigator tabBarOptions={{style:{paddingBottom:5,borderRadius:10}}} initialRouteName={SCREEN.HOME_SCREEN}>
            <TabBottom.Screen 
                name={SCREEN.HOME_SCREEN} 
                component={Home}
                options={{ title: 'Trang Chu' ,
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
                options={{ title: 'The Loai' ,
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
                name={SCREEN.FOLLOW_SCREEN} 
                component={Follow}
                options={{ title: 'Theo Doi' ,
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
                name={SCREEN.HISTORY_SCREEN} 
                component={History}
                options={{ title: 'Lich Su',
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
                name={SCREEN.INFO_SCREEN} 
                component={Info}
                options={{ title: 'Toi' ,
                tabBarIcon:({focused})=>{
                    if(focused){
                        return <Icon name={"home"} size={30}/>
                    }
                    else {
                        return <Icon name={"home"} size={20}/>
                    } 
                }}} 
            />
        </TabBottom.Navigator>
    )
}
export default Screen ;