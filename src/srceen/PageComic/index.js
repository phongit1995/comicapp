import React ,{useEffect,useState} from 'react';
import { useRoute  } from '@react-navigation/native';
import { SafeAreaView , View, FlatList, StyleSheet } from 'react-native';
import ItemComic from './../../Components/ItemComic';
import {getListComicByType} from './../../api/comic';
const NUMBER_ITEM_PAGE=12;
const PageComic =()=>{
    const router = useRoute();
    const {type} = router.params;
    const [listComic,setListComic]=useState([]);
    const [page,setPage]=useState(1);
    useEffect(()=>{
        getListComicByType(page,NUMBER_ITEM_PAGE,type).then(result=>{
            if(result.data.status=="success"){
                setListComic(state=>[...state,...result.data.data])
            };
        })
    },[page])
    const onLoadMore=()=>{
        setPage(page=>page+1)
    }
    const onFreshList =()=>{
        setListComic([]);
        setTimeout(()=>{setPage(1);},300)
       
    }
    return(
        <SafeAreaView  style={styles.container}>
            <View style={styles.containerItem}>
                <FlatList
                    numColumns={3}
                    data={listComic}
                    keyExtractor={(item, index) =>item._id}
                    renderItem={({item})=><ItemComic item={item}/>}
                    onEndReachedThreshold={1}
                    onEndReached={onLoadMore}
                    onRefresh={onFreshList}
                    refreshing={false}
                    contentContainerStyle={{justifyContent: "space-between",alignItems:"center"}}
                />
            </View>
        </SafeAreaView>
    )
}
export default React.memo( PageComic) ;
const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:5
    },
    containerItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})