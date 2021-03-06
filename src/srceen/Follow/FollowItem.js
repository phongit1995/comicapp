import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Dimensions,Image} from 'react-native';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/screen';
const FollowItem=({data})=>{
    const navigation = useNavigation();
    const _OnClick =()=>{
        navigation.navigate(SCREEN.DETIAL_COMIC_SCREEN,{id:data.manga_id})
    }
    return (
        <TouchableOpacity  style={styles.contaiItem} onPress={_OnClick}>
            <View style={{ justifyContent: 'center', height: '75%', marginBottom: 10 }}>
                <Image source={{ uri: data.image }} style={styles.imageRecommend}></Image>
            </View>
            <View style={{ justifyContent: 'space-between', height: '20%', marginHorizontal: 10}}>
                <Text numberOfLines={2} style={styles.nameComic}>{data.name}</Text>
            </View>
        </TouchableOpacity>
    )
}
export default React.memo( FollowItem );
const styles = StyleSheet.create({
    contaiItem: {
        width: (width /3) - 5,
        height: (width * 0.6),
        marginBottom: 5,
        paddingVertical: 2,
        paddingHorizontal:5
    },
    imageRecommend: {
        resizeMode: "stretch",
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },
    nameComic: {
        paddingVertical: 0,
        textAlign: "center",
        fontSize: 12
    },
})
