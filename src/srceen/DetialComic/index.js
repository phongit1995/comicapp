import React ,{useEffect,useState} from 'react';
import {View ,Dimensions ,StyleSheet,Text,Image} from 'react-native';
import { useRoute  } from '@react-navigation/native';
import {getDetialComic} from './../../api/comic';
import Header from './HeaderDetial';
const {height} = Dimensions.get("window");
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
const DetialComic =()=>{
    const router = useRoute();
    const {id} = router.params;
    const [image,setImage] = useState("http://st.truyenchon.com/data/comics/2/long-an-gia.jpg");
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);
    const renderScene = ({ route }) => {
        return <Text>Phong</Text>
    };
    //console.log(id);
    // useEffect(()=>{
    //     getDetialComic(id).then((result)=>{
    //         if(result.data.status=="success"){
    //             console.log(result.data.data);
    //         }
    //     })
    // },[])
    return(
        <View style={styles.container}>
            <Header/>
            <View style={{paddingHorizontal:10, height:height/3.5}}>
                <Text style={{textAlign:"center"}}>CÔ VỢ MANG THAI MỘT TẶNG MỘT</Text>
                <View style={styles.containerInfo}>
                    <View style={{flex:1}}>
                        <Image source={{uri:image}} style={{width:"100%",height:"100%",borderRadius:10}}/>
                    </View>
                    <View style={{flex:2,marginLeft:10}}>
                        <Text>Tác Giả : Phong Nguyễn</Text>
                        <Text>Trạng Thái : <Text>Hoàn Thành</Text></Text>
                        <Text>Thể Loại : <Text>Hoàn Thành</Text></Text>
                    </View>
                </View>
            </View>
            <TabView
                initialLayout={{ width: Dimensions.get('window').width }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                renderTabBar={props=>{
                    return(
                        <TabBar 
                        {...props}
                        tabStyle={{height:30,paddingHorizontal:0,paddingVertical:0}}
                        labelStyle={{padding:0,margin:0,fontSize:10}}
                        style={{paddingHorizontal:0,paddingVertical:0}}
                        contentContainerStyle={{padding:0}}
                        />
                    )
                }}
            />
        </View>
    )
}
export default React.memo(DetialComic) ;
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column"
    },
    containerInfo:{
        flexDirection:"row",
        marginTop:10
    },
    tabs:{
        margin:0,
        backgroundColor:'pink'
    }
})