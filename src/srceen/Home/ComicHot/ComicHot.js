import React ,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Dimensions, ActivityIndicator ,TouchableOpacity} from 'react-native';
import RenderItem from '../RenderItem';
import {getListHotCommic} from './../../../api/comic';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../../constants/screen';
const { width } = Dimensions.get('window');
const ComicHot = () => {
    const [loading,setLoading]= useState(true);
    const [listComic,setListComic] = useState([]);
    const navigation = useNavigation();
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
                <TouchableOpacity style={styles.btnViewsAll} onPress={()=>navigation.navigate(SCREEN.PAGE_COMIC_SCREEN,{type:0})}>
                    <Text style={{color:"#FFFFFF"}}>Xem Tất Cả Truyện Hot</Text>
                </TouchableOpacity>
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
    },
    btnViewsAll:{
        alignItems:"center",
        padding:5,
        backgroundColor:"#F2BE33",
        marginTop:5,
        borderRadius:3
    }
})