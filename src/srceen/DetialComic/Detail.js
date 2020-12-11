import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BannerAd, TestIds ,BannerAdSize } from '@react-native-firebase/admob';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2866880782165460/5830231394';
function Detail({ data }) {
    return (
        <View style={styles.container}>
            <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER}
             onAdFailedToLoad={(error)=>{console.log(error)}}
             />
            <Text style={{ fontSize: 20, color: '#5c6b73',fontWeight:'bold' }}>Tóm tắt</Text>
            <Text style={styles.name}>{data === '' ? 'Đọc sẽ rõ...' : data}</Text>
        </View>
    )
}


export default React.memo(Detail)

const styles = StyleSheet.create({
    container: {
        flex: 1,

        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    
    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    }
})