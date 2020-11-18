import React ,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import RenderItem from '../RenderItem';
import {getListHotCommic} from './../../../api/comic';
const { width } = Dimensions.get('window');
const ComicHot = () => {
    const [loading,setLoading]= useState(true);
    const [listComic,setListComic] = useState([]);
    useEffect(()=>{
        getListHotCommic(1,12).then(result=>{
            if(result.status==201||result.data?.code==200){
                setLoading(false);
                setListComic(result.data?.data)
            }
        })
    },[])
    return (
        <View>
            <View >
                <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 15 }}>TRUYỆN XEM NHIỀU NHẤT</Text>
                <View style={styles.containerItem}>
                    {
                        loading ?
                        <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#0000ff" />
                        </View>:
                        listComic.map((item) =>
                                <RenderItem item={item} key={item._id}></RenderItem>
                        ) 
                    }
                </View>
            </View>
        </View>
        
    )
}
export default React.memo(ComicHot)
const styles = StyleSheet.create({
    containerItem: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loading: {
        flex: 1,
        height: width,
        alignItems: 'center',
        justifyContent: 'center',
    }
})