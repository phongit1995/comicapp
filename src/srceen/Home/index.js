import React from 'react';
import {Text,View,StatusBar,StyleSheet} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const Home = ()=>{
    return (
        <View>
            <HomeHeader />
            <Text style={{fontFamily:"Nunito"}}>22222222</Text>
            <Text style={{fontFamily:"Nunito",fontWeight:"700"}}>Hello</Text>
            <Text style={{fontFamily:"Goldman",fontWeight:"700"}}>Hello</Text>
            <Text style={{fontFamily:"XanhMono",fontWeight:"700"}}>Hello</Text>
        </View>
        
    )
}
const HomeHeader=()=>{
    return (
        <View style={styles.header}>
            <View style={{alignContent:"center"}}>
                <Text style={{textTransform:"uppercase",fontSize:14,fontWeight:"bold"}}>Vip Truyện</Text>
            </View>
            <View style={{marginRight:10}} >
                <EvilIcons  name={"search"} size={30}/>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    header:{
        height:50,
        flexDirection:"row",
        fontFamily:"Nunito-SemiBold",
        justifyContent:"space-between",
        alignItems:"center",
        padding:5,
        borderBottomWidth:0.5
    }
})
export default Home ;