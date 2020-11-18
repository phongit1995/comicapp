import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
const { width, height } = Dimensions.get('window');
const RenderItem = ({ item }) => {

    return (
        <RectButton style={styles.contaiItem}>
            <View style={{ justifyContent: 'center', height: '70%', marginBottom: 10 }}>
                <Image source={{ uri: item.image }} style={styles.imageRecommend}></Image>
            </View>
            <View style={{ justifyContent: 'space-between', height: '30%'}}>
                <Text numberOfLines={2} style={styles.nameComic}>{item.name}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 5 }}>
                    <Feather name="eye" size={10} style={{ marginRight: 5 }}></Feather>
                    <Text style={styles.nameChap}>{item.views}</Text>
                </View>
            </View>
        </RectButton>
    )
}
export default React.memo(RenderItem)
const styles = StyleSheet.create({
    contaiItem: {
        width: (width / 3) - 10,
        height: (width * 0.5),
        marginBottom: 5,
        paddingVertical: 10,
    },
    imageRecommend: {
        resizeMode: 'contain',
        width: "100%",
        height: "100%",
        borderRadius:5,
    
    },
    nameComic: {
        paddingVertical: 0,
        textAlign: "center",
        fontSize:12
    },
    nameChap: {
        textAlign: "center",
        fontSize:11
    }
})