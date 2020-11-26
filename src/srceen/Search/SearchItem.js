import React ,{useState} from 'react';
import {View,StyleSheet ,Dimensions,TouchableOpacity,Text,ActivityIndicator ,Image} from 'react-native';
import {formatViews} from '../../common/stringHelper';
import Feather from 'react-native-vector-icons/Feather';
const {width,height} = Dimensions.get("window");

const SearchItem=({data})=>{
    return(
        <View style={styles.containerItem}>
            <View>
                <Image  source={{uri:data.image}} style={styles.Image}/>
            </View>
            <View style={{paddingHorizontal:10,justifyContent:"space-between",flex:1}}>
                <View style={{flexDirection:"row",alignItems:"center"}}>
                    <View style={{marginRight:4,justifyContent:"center",alignItems:"center"}}>
                        {
                            data.manga_status==1?
                            <Text style={styles.textEndComic} >End</Text>:
                            null
                        }
                    </View>
                    <Text numberOfLines={1} style={styles.nameComic}>{data.name}</Text>
                </View>
                <Text style={{color:"#a5a5a5"}} numberOfLines={1}>{data.author}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:5}}>
                    <Feather name="eye" size={12} style={{ marginRight: 7}} color={"red"}/>
                    <Text>{formatViews(data.views)}</Text>
                </View>
            </View>
        </View>
    )
}
export default SearchItem ;
const styles = StyleSheet.create({
    containerItem:{
        flex:1,
        flexDirection:"row",
        marginBottom:20
    },
    Image:{
        width:width/3.5,
        height:height/5.5,
        borderRadius:8
    },
    nameComic:{
        marginTop:5,
        fontFamily: "Nunito-SemiBold",
        fontSize:14,
        fontWeight:"bold"
    },
    textEndComic:{
        fontSize:10,
        backgroundColor:"#ffa202",
        paddingHorizontal:7,
        paddingVertical:3,
        borderRadius:3,
        fontWeight:"bold",
        color:"white"
    }
})