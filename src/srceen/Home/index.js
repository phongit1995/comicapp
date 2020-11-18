import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import ComicHot from './ComicHot/ComicHot';
import ComicUpdate from './ComicUpdate/ComicUpdate';
const Home = () => {
    return (
        <View style={styles.container}>
            <HomeHeader />
            <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
                <ComicHot />
                <ComicUpdate />
            </ScrollView>
        </View>

    )
}

const HomeHeader = () => {
    return (
        <View style={styles.header}>
            <View style={{ alignContent: "center", flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="menu" size={30}></Feather>
                <Text style={{ textTransform: "uppercase", marginLeft: 10, fontSize: 16, fontWeight: "bold" }}>Manga</Text>
            </View>
            <View style={{ marginRight: 10 }} >
                <EvilIcons name={"search"} size={30} />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 50,
        flexDirection: "row",
        fontFamily: "Nunito-SemiBold",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5
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
export default Home;