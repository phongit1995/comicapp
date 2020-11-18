import React ,{useState,useEffect} from 'react';
import { Text, View, StatusBar, Image, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import RenderItem from '../RenderItem';
import {getListCommicNew} from './../../../api/comic';
import Feather from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');
const ComicUpdate = () => {
    const [loading,setLoading]= useState(true);
    const [listComic,setListComic] = useState([]);
    useEffect(()=>{
        getListCommicNew(1,12).then(result=>{
            if(result.status==201||result.data?.code==200){
                setLoading(false);
                setListComic(result.data?.data)
            }
        })
    },[])
    return (
        <View>
            <View>
                <View style={styles.titlComicUpdae}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>TRUYỆN MỚI CẬP NHẬT</Text>
                    <View style={styles.comicSeeMore}>
                        <Text style={styles.comicnameSee}>Xem Thêm</Text>
                        <Feather name="chevron-down" size={20} style={{ marginLeft: 5 }}></Feather>
                    </View>
                </View>
                <View style={styles.contaiItem}>
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
export default React.memo(ComicUpdate)
const styles = StyleSheet.create({
    contaiItem: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    loading: {
        flex: 1,
        height: width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titlComicUpdae: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    comicSeeMore: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    comicnameSee: {

    }
})