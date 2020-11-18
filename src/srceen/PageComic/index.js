import React from 'react';
import {View,Text} from 'react-native';
import { useRoute  ,useNavigation} from '@react-navigation/native';
const PageComic =()=>{
    const router = useRoute();
    const {type} = router.params;
    const navigation = useNavigation();
    // if(type){
    //     navigation.setOptions({title:"Truyện Xem Nhiều Nhất"});
    // }else {
    //     navigation.setOptions({title:"Truyện Mới Nhât"})
    // }
    return(
        <View>
            <Text>Page Comic</Text>
        </View>
    )
}
export default PageComic ;