import React ,{useEffect,useState} from 'react';
import { useRoute  } from '@react-navigation/native';
import { SafeAreaView , View, FlatList, StyleSheet ,ActivityIndicator} from 'react-native';
import ItemComic from './../../Components/ItemComic';
import {getListComicByType} from './../../api/comic';
const NUMBER_ITEM_PAGE=12;
const PageComic =()=>{
    const router = useRoute();
    const {type} = router.params;
    const [listComic,setListComic]=useState([]);
    const [page,setPage]=useState(1);
    const [loading,setLoading]= useState(true);
    const [footerLoading,setFooterLoading]= useState(false);
    useEffect(()=>{
        getListComicByType(page,NUMBER_ITEM_PAGE,type).then(result=>{
            if(result.data.status=="success"){
                setListComic(state=>[...state,...result.data.data]);
                setLoading(false);
            };
        })
    },[])
    const onLoadMore=()=>{
        setFooterLoading(true);
        getListComicByType(page+1,NUMBER_ITEM_PAGE,type).then(result=>{
            if(result.data.status=="success"){
                setFooterLoading(true);
                setListComic(state=>[...state,...result.data.data]);
                setPage(page=>page+1);
            };
        })
    }
    const onFreshList =()=>{
        setLoading(true);
        getListComicByType(1,NUMBER_ITEM_PAGE,type).then(result=>{
            if(result.data.status=="success"){
                setListComic([...result.data.data]);
                setLoading(false);
                setPage(1);
            };
        })
    }
    const _renderFooterList=()=>{
        if(!footerLoading)return null ;
        return (
            <View style={{paddingVertical:20,borderTopWidth:0.7,backgroundColor:"#CEDOCE"}}>
                <ActivityIndicator size="large" color="#00ff00" animating />
            </View>
        )
    }
    return(
        <SafeAreaView  style={styles.container}>
            {loading?
            <View style={styles.ContainerLoading}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View> :
            <View style={styles.containerItem}>
                <FlatList
                    numColumns={3}
                    data={listComic}
                    keyExtractor={(item, index) =>item._id+index}
                    renderItem={({item})=><ItemComic item={item}/>}
                    onEndReachedThreshold={1}
                    onEndReached={onLoadMore}
                    onRefresh={onFreshList}
                    refreshing={false}
                    contentContainerStyle={{justifyContent: "space-between",alignItems:"center"}}
                    ListFooterComponent={_renderFooterList}
                />
            </View> }
        </SafeAreaView>
    )
}
export default React.memo( PageComic) ;
const styles = StyleSheet.create({
    ContainerLoading:{
        flex:1,
        justifyContent:"center"
    },
    container:{
        flex:1,
        marginTop:5
    },
    containerItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})