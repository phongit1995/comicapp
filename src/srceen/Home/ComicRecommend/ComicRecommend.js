import React from 'react';
import { Text, View, StatusBar, Image, StyleSheet, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import RenderItem from '../RenderItem';


const { width, height } = Dimensions.get('window');
const ComicRecommend = ({ DATA, loading }) => {
    return (
        <View style={styles.contaiItem}>
            {
                loading ?
                    DATA.map((item) =>
                        <RenderItem item={item} key={item._id}></RenderItem>
                    ) : <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
            }
        </View>
    )
}
export default React.memo(ComicRecommend)
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
    }
})