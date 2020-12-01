import React ,{useRef,useState} from 'react';
import {Text,View,StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import HistoryItem from './itemHistory';
import SqlHelper from './../../common/SQLHelper';
import { useFocusEffect } from '@react-navigation/native';
const History = ()=>{
    const [listComic,setListComic]=useState([]);
    const [page,setPage]=useState(1);
    const flatListRef = useRef();
    const [footerLoading,setFooterLoading]= useState(false);
    useFocusEffect(
        React.useCallback(()=>{
            SqlHelper.GetListHistory(1,12)
            .then(result=>{
                setListComic([...result]);
                flatListRef.current.scrollToOffset({ animated: true, x: 0,y:0 })
                setPage(1);
            })
        },[])
    )
    const _OnLoadMore=()=>{
        SqlHelper.GetListHistory(page+1,12)
        .then(result=>{
            console.log(result);
            setPage(page=>page+1);
            setListComic([...listComic,...result]);
        })
    }
    const _OnFreshList =()=>{
        SqlHelper.GetListHistory(1,12)
        .then(result=>{
            setListComic([...result]);
            setPage(1);
        })
    }
    return (
        <View style={styles.container}>
            <HeaderHistory/>
            {
                listComic.length==0?
                <View style={{justifyContent:"center",flex:1}}>
                    <Text style={{textAlign:"center"}}>Chưa Có Lịch Sử Xem...</Text>
                </View>:
                <View style={styles.containerList}>
                    <FlatList
                    ref={flatListRef}
                    data={listComic}
                    numColumns={3}
                    keyExtractor={(item, index) =>item.id}
                    renderItem={({item})=><HistoryItem data={item}/>}
                    contentContainerStyle={{justifyContent: "space-between",alignItems:"center"}}
                    onEndReachedThreshold={0.5}
                    refreshing={false}
                    onEndReached={_OnLoadMore}
                    onRefresh={_OnFreshList}
                    refreshing={false}
                    />
                </View>
            }
        </View>
    )
}

export default History ;
const HeaderHistory=()=>{
    return(
        <View style={styles.header}>
            <Text style={styles.titleHeader}>Lịch Sử Đã Xem</Text>
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
