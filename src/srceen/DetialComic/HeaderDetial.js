import React ,{useRef} from 'react';
import {View,StyleSheet,TouchableOpacity,Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = ()=>{
    const moreRef = useRef();
    const showMenu=()=>{
        console.log("Phong");
    }
    const showLog=()=>{
        console.log("Log")
    }
    return (
        <View style={styles.headerContainer}>
            <View>
                <AntDesign name="arrowleft" size={25} onPress={showMenu} />
            </View>
            <View>
                <MaterialCommunityIcons  name="dots-vertical" size={25}/>
            </View>
                
        </View>
    )
}
export default Header ;
const styles= StyleSheet.create({
    headerContainer:{
        height:20,
        paddingHorizontal:15,
        paddingVertical:10,
        justifyContent:"space-between",
        flexDirection:"row"
    }
})