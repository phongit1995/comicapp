import React from 'react';
import { Text, View, StyleSheet, ScrollView ,TouchableOpacity ,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { BannerAd, TestIds ,BannerAdSize } from '@react-native-firebase/admob';
import ComicHot from './ComicHot/ComicHot';
import ComicUpdate from './ComicUpdate/ComicUpdate';
import * as SCREEN from './../../constants/screen';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2866880782165460/5830231394';
const Home = () => {
    return (
        <View style={styles.container}>
            <HomeHeader />
            <BannerAd unitId={adUnitId} size={BannerAdSize.FULL_BANNER}
             onAdFailedToLoad={(error)=>{console.log(error)}}
             />
            <ScrollView style={{ paddingHorizontal: 10, flex: 1 }}>
                <ComicHot />
                <ComicUpdate />
            </ScrollView>
        </View>
    )
}

const HomeHeader = () => {
    const navigation= useNavigation();
    const onClickSearch=()=>{
        navigation.navigate(SCREEN.SEARCH_SCREEN);
    }
    return (
        <View style={styles.header}>
            <View style={{ alignContent: "center", flexDirection: 'row', alignItems: 'center' }}>
                {/* <Feather name="menu" size={30}></Feather> */}
                <Image source={require("./../../assets/image/logo.png")} style={{width:25,height:25}}/>
                <Text style={{ textTransform: "uppercase", marginLeft: 20, fontSize: 16, fontWeight: "bold",textAlign:"center" }}>Manga Vip</Text>
            </View>
            <View style={{ marginRight: 10 }} >
                <TouchableOpacity onPress={onClickSearch}>
                    <EvilIcons name={"search"} size={30} />
                </TouchableOpacity>
                
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
        borderBottomWidth: 0.5,
        borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation:1
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