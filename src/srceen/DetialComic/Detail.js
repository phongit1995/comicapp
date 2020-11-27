import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
const { height, width } = Dimensions.get("window");
function Detail({ data }) {
 
    return (
        <View style={styles.container}>
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