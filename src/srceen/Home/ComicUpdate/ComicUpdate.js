import React ,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator ,TouchableOpacity} from 'react-native';
import RenderItem from '../RenderItem';
import {getListCommicNew} from './../../../api/comic';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../../constants/screen';
const { width } = Dimensions.get('window');
const ComicUpdate = () => {
    const [loading,setLoading]= useState(true);
    const [listComic,setListComic] = useState([]);
    const navigation = useNavigation();
    useEffect(()=>{
        getListCommicNew(1,12).then(result=>{
            if(result.status==201||result.data?.code==200){
                setLoading(false);
                setListComic(result.data?.data)
            }
        })
    },[])
    return (
        <View style={{marginBottom:10}}>
            <View>
                <View style={styles.titlComicUpdae}>
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>TRUYỆN MỚI CẬP NHẬT</Text>
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
                <TouchableOpacity style={styles.btnViewsAll} onPress={()=>navigation.navigate(SCREEN.PAGE_COMIC_SCREEN,{type:1})}>
                    <Text style={{color:"#FFFFFF"}}>Xem Tất Cả Truyện Mới</Text>
                </TouchableOpacity>
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
    btnViewsAll:{
        alignItems:"center",
        padding:3,
        backgroundColor:"#F2BE33",
        marginTop:5,
        borderRadius:3
    }
})