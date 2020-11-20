import React ,{useEffect} from 'react';
import {View ,Dimensions ,StyleSheet,Text} from 'react-native';
import { useRoute  } from '@react-navigation/native';
import {getDetialComic} from './../../api/comic';
import Header from './HeaderDetial';
const {height} = Dimensions.get("window");
const DetialComic =()=>{
    const router = useRoute();
    const {id} = router.params;
    console.log(id);
    // useEffect(()=>{
    //     getDetialComic(id).then((result)=>{
    //         if(result.data.status=="success"){
    //             console.log(result.data.data);
    //         }
    //     })
    // },[])
    return(
        <View style={styles.container}>
            <Header/>
        </View>
    )
}
export default React.memo(DetialComic) ;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column"
    },
    imageHeader:{
        width:"100%",
        height:height/2.5
    }
})