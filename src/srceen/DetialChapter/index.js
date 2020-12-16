import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, ActivityIndicator ,Animated ,FlatList ,StatusBar } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("window");
import { getDetailChapter } from './../../api/comic'
import {makeUserName} from './../../common/stringHelper';
import AdmodService from "./../../firebase/Admod";
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'

export default function DetialComic({ route }) {
    const { id } = route.params
    const navigation = useNavigation();
    const [name, setName] = useState("Chi Tiết");
    const [imagesList, setImagesList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [beforeChapter,setBeforeChapter]=useState(null);
    const [afterChapter,setAfterChapter]=useState(null);
    const scrollY = new Animated.Value(0);
    const scrollYFooter = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY,0,height / 9.5)
    const translateY = diffClamp.interpolate({
        inputRange:[0,height / 9.5],
        outputRange:[0,-(height / 9.5)]
    })
    const diffClampFooter = Animated.diffClamp(scrollYFooter,0,height / 12)
    const translateYFooter = diffClampFooter.interpolate({
        inputRange:[0,height / 12],
        outputRange:[0,height / 12]
    })
    useEffect(() => {
        getDetailChapter(id).then((resultData)=>{
            if (resultData?.data?.status == "success") {
                setName("Chương : " + resultData.data.data.index);
                console.log(resultData.data?.data);
                setAfterChapter(resultData.data?.data?.after);
                setBeforeChapter(resultData.data?.data?.before);
                setImagesList(resultData.data?.data?.images);
                setIsLoading(false)
            }
        })
        ShowAdsChapter();
    }, [])
    const ViewImagesALl =()=>{
        return imagesList.map((item)=>{
            return <ImageFullWith key={makeUserName(4)} url={item}/>
        })
    }
    if (isLoading) {
        return (
            <View style={styles.containers}>
                <ActivityIndicator
                    animating={isLoading}
                    color='#bc2b78'
                    size="large"
                    style={styles.activityIndicator} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <StatusBar  translucent backgroundColor="transparent" />
                <Animated.View style={[styles.Header,{
                    transform:[
                        {translateY:translateY}
                    ]
                }]}>
                    <TouchableOpacity onPress={() => {navigation.goBack();console.log("Phong")}}>
                        <Entypo name="chevron-thin-left" color="#fff" size={20} style={{ paddingLeft: 5 }} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{ flexBasis: 20 }}></View>
                </Animated.View>
                {/* <ScrollView style={styles.content} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                onScroll={(e)=>{
                    scrollY.setValue(e.nativeEvent.contentOffset.y) 
                }}
                >
                    {ViewImagesALl()}
                </ScrollView> */}
                <View style={styles.content}>
                    <FlatList
                    style={{ paddingTop:height/12}}
                    showsHorizontalScrollIndicator={false} 
                    initialNumToRender={10}
                    showsVerticalScrollIndicator={false}
                    data={imagesList}
                    keyExtractor={(item,index) =>item+index}
                    renderItem={({item})=><ImageFullWith url={item}/>}
                    onScroll={(e)=>{
                        scrollY.setValue(e.nativeEvent.contentOffset.y);
                        scrollYFooter.setValue(e.nativeEvent.contentOffset.y)
                    }}
                    />
                </View>
                <Animated.View style={[styles.Footer,{
                    transform:[
                        {translateY:translateYFooter}
                    ]
                }]}>
                    <View style={{flex:1,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
                        <View >
                            {beforeChapter!=null?
                                <TouchableOpacity onPress={()=>{console.log(beforeChapter)}} style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <FontAwesome5 name={"angle-left"} size={35} color={"#ffffff"}/>
                                    <Text style={[{marginLeft:7},styles.textChapter]}>Chương Trước</Text>
                                </TouchableOpacity>:null
                            }
                        </View>
                        <View >
                            {afterChapter!=null?
                                <TouchableOpacity style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
                                    <Text style={[{marginRight:7},styles.textChapter]}>Chương Sau</Text>
                                <FontAwesome5 name={"angle-right"} size={35} color={"#ffffff"}/>
                                </TouchableOpacity>:null
                            }
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }
}
const ImageFullWith=React.memo(({url})=>{
    const [heightImage,setHeightImage]=useState((width * 3) / 2.5);
    useEffect(()=>{
        Image.getSizeWithHeaders(url,{
            Referer:"https://www.nettruyen.com/"
        },(withdata,heightdata)=>{
            setHeightImage(width*(heightdata/withdata))
        },(error)=>{})
    },[])
    return <Image style={{ width: "100%", height: heightImage,flex:1 }}
        source={{ uri: url ,
        headers:{
            Referer:"https://www.nettruyen.com/"
        }
     }} resizeMode="stretch" />
})
const  ShowAdsChapter=async()=>{
    const KEY_VIEWS="VIEWS_CHAPTER";
    let numberShow = await AsyncStorage.getItem(KEY_VIEWS);
    if(!numberShow){
        await AsyncStorage.setItem(KEY_VIEWS,"1");
        AdmodService.showFull();
        return ;
    }
    numberShow=parseInt(numberShow);
    if(numberShow==3){
        AdmodService.showFull();
        numberShow=0;
    }
    await AsyncStorage.setItem(KEY_VIEWS,`${numberShow+1}`);
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    Header: {
        position:"absolute",
        top:0,
        left:0,
        elevation:1,
        width:width,
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
        height: height / 9.5,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#404042',
        backgroundColor: '#404042',
        paddingTop:30,
        zIndex:10
    },
    name: {
        textTransform: 'uppercase',
        fontSize: 15,
        flex: 1,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1
    },
    Img: {
        width: "100%",
        alignSelf: "center",
        flexDirection: "row",
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 5,
    },
    endchap: {
        textAlign: 'center'
    },
    Footer:{
        position:"absolute",
        bottom:0,
        left:0,
        height:height/13,
        paddingHorizontal:10,
        elevation:6,
        width:width,
        backgroundColor: '#404042',
        justifyContent: "center",
        opacity:0.8,
        zIndex:10
    },
    textChapter:{
        fontSize:14,
        color:"#b8b4b4"
    }
})
