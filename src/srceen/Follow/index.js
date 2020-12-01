import React ,{useState } from 'react';
import {Text,View,StyleSheet,FlatList } from 'react-native';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
import FollowItem from './FollowItem';
const Follow = ()=>{
    const [listComic,setListComic]=useState([]);
    useFocusEffect(
        React.useCallback(()=>{
            SqlHelper.GetListFollower()
            .then(result=>{
                setListComic(result);
            })
        },[])
    )
    return (
        <View style={styles.container}>
            <HeaderFollow />
            {
                listComic.length==0?
                <View style={{justifyContent:"center",flex:1}}>
                    <Text style={{textAlign:"center"}}>Bạn Chưa Follow Truyện Nào...</Text>
                </View>:
                <View style={styles.containerList}>
                    <FlatList
                    data={listComic}
                    numColumns={3}
                    keyExtractor={(item, index) =>item.id}
                    renderItem={({item})=><FollowItem data={item}/>}
                    contentContainerStyle={{justifyContent: "space-between",alignItems:"center"}}
                    onEndReachedThreshold={0.5}
                    refreshing={false}
                    refreshing={false}
                    />
                </View>
            }
        </View>
    )
}
export default Follow ;
const HeaderFollow=()=>{
    return(
        <View style={styles.header}>
            <Text style={styles.titleHeader}>Danh Sách Theo Dõi</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height: 50,
        fontFamily: "Nunito-SemiBold",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1.5,
        },
        shadowRadius: 20,
        elevation:2
    },
    titleHeader:{
        textTransform: "uppercase", 
        fontSize: 16, 
        fontWeight: "bold",
        textAlign:"center"
    },
    containerList:{
        marginTop:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex:1
    }
})
