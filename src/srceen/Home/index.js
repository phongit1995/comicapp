import React from 'react';
import { Text, View, SafeAreaView, StyleSheet, ScrollView, FlatList } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ComicRecommend from './ComicRecommend/ComicRecommend';
import ComicUpdate from './ComicUpdate/ComicUpdate';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListComic } from '../../api/ListComic'
import { unwrapResult } from '@reduxjs/toolkit';
const Home = () => {
    const dispatch = useDispatch();
    const [DATA, setData] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const listComic = useSelector(state => state.playListComic);
    const params = {
        "page": 1,
        "numberItem": 10,
        "type": 1
    }
    React.useEffect(() => {
        const fetchDAta = (async () => {
            const list = await dispatch(fetchListComic(params));
            const datalist = unwrapResult(list);
            if (datalist?.status === "success") {
                setLoading(() => listComic.loading)
                setData(() => datalist?.data)
            }
        })
        fetchDAta();
        return () => fetchDAta();
    }, [])
    return (
        <View style={styles.container}>
            <HomeHeader />
            <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
                <View>
                    <View >
                        <Text style={{ paddingVertical: 10, fontWeight: 'bold', fontSize: 15 }}>TRUYỆN ĐỀ CỬ</Text>
                        <ComicRecommend DATA={DATA} loading={loading}></ComicRecommend>
                    </View>
                </View>
                <View>
                    <View>
                        <View style={styles.titlComicUpdae}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>TRUYỆN MỚI CẬP NHẬT</Text>
                            <View style={styles.comicSeeMore}>
                                <Text style={styles.comicnameSee}>Xem Thêm</Text>
                                <Feather name="chevron-down" size={20} style={{ marginLeft: 5 }}></Feather>
                            </View>
                        </View>
                        <ComicUpdate DATA={DATA} loading={loading}></ComicUpdate>
                    </View>
                </View>
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