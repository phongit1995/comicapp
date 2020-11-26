import React ,{useState} from 'react';
import {View,StyleSheet ,Dimensions,TouchableOpacity,Text,Image,ScrollView} from 'react-native';
import {formatViews} from '../../common/stringHelper';
import Feather from 'react-native-vector-icons/Feather';
import { v4 as uuidv4 } from 'uuid';
const {width,height} = Dimensions.get("window");

const SearchItem=({data})=>{
    const showCategory=()=>{
        return data.category.map((item)=>{
            return (
                <Text style={styles.categoryText} key={uuidv4()}>{item}</Text>
            )
        })
    }
    return(
        <View style={styles.containerItem}>
            <View>
                <Image  source={{uri:data.image}} style={styles.Image}/>
            </View>
            <View style={{paddingHorizontal:10,justifyContent:"space-around",flex:1}}>
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
                <View>
                <ScrollView style={{flexDirection:"row"}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    {showCategory()}
                </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:5}}>
                    <Feather name="eye" size={12} style={{ marginRight: 7}} color={"red"}/>
                    <Text style={{fontSize:12,fontStyle:"italic"}}>{formatViews(data.views)}</Text>
                </View>
            </View>
        </View>
    )
}
export default React.memo( SearchItem );
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
        fontWeight:"bold",
        flex:1
    },
    textEndComic:{
        fontSize:10,
        backgroundColor:"#ffa202",
        paddingHorizontal:7,
        paddingVertical:3,
        borderRadius:3,
        fontWeight:"bold",
        color:"white"
    },
    categoryText:{
        fontSize:9,
        paddingVertical:3,
        paddingHorizontal:5,
        backgroundColor:"#d8e889",
        color:"white",
        marginRight:3,
        borderRadius:5
    }
})