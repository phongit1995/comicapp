import React ,{useState} from 'react';
import {View,StyleSheet ,Dimensions,TouchableOpacity,Text,ActivityIndicator ,Image} from 'react-native';
const {width,height} = Dimensions.get("window");
const SearchItem=({data})=>{
    console.log(data);
    return(
        <View style={styles.containerItem}>
            <View>
                <Image  source={{uri:data.image}} style={styles.Image}/>
            </View>
            <View>
            </View>
        </View>
    )
}
export default SearchItem ;
const styles = StyleSheet.create({
    containerItem:{
        flexDirection:"column",
        marginBottom:20
    },
    Image:{
        width:width/4,
        height:height/6
    }
})