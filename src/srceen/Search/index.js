import React ,{useState,useRef} from 'react';
import {View,StyleSheet ,SafeAreaView,StatusBar,TextInput,Dimensions,TouchableOpacity,Text,ActivityIndicator,FlatList} from 'react-native';
import SearchItem from './SearchItem';
import { useNavigation  } from '@react-navigation/native';
import {searchComicByName} from './../../api/comic';
const {width}=Dimensions.get("window");
const NUMBER_ITEM_PAGE=10;
const SearchPage = ()=>{
    const [text,setText]=useState("");
    const [loading,setLoading] = useState(false);
    const [listComic,setListComic]=useState([]);
    const [footerLoading,setFooterLoading]= useState(false);
    const [page,setPage]= useState(1);
    const textRef = useRef();
    const navigation = useNavigation();
    const searchSubmit=()=>{
        if(text==""){
            return null ;
        }
        setLoading(true);
        searchComicByName(1,NUMBER_ITEM_PAGE,text)
        .then((result)=>{
                if(result.data.code==200 || result.data.status=="success"){
                    setListComic([...result.data.data]);
                    setLoading(false);
                }
        }).catch(error=>{
            console.log(error);
        })
    }
    const _onLoadMore=()=>{
        if(text==""){
            return null ;
        }
        setFooterLoading(true);
        searchComicByName(page+1,NUMBER_ITEM_PAGE,text)
        .then((result)=>{
                if(result.data.code==200 || result.data.status=="success"){
                    setListComic([...listComic, ...result.data.data]);
                    setPage(page=>page+1);
                }
        }).catch(error=>{
            console.log(error);
        })
    }
    const _renderFooterList=()=>{
        if(!footerLoading)return null ;
        return (
            <View style={{paddingVertical:20,backgroundColor:"#CEDOCE"}}>
                <ActivityIndicator size="large" color="#e84d35" animating />
            </View>
        )
    }
    const _onCancelText=()=>{
        if(text!=""){
            textRef.current.clear();
            setText("");
        }else {
            navigation.goBack();
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.viewSearch}>
                <TextInput
                    ref={textRef}
                    placeholder={"Nhập Tên Tác Phẩm..."}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    onChangeText={text=>setText(text)}
                    onSubmitEditing={searchSubmit}
                    style={styles.inputSearch}
                />
                <TouchableOpacity style={{justifyContent:"center"}} onPress={_onCancelText} >
                    <Text>Hủy</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:4,flex:1,paddingHorizontal:10,paddingTop:10}}>
                {loading?
                <LoadingViews/>:
                <View style={{flex:1}}>
                    {
                        listComic.length==0?
                        <View>
                            <Text style={{textAlign:"center"}}>Không Có Kết Quả Tìm Kiếm</Text>
                        </View>
                        :
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            data={listComic}
                            keyExtractor={(item, index) =>item._id+index}
                            renderItem={({item})=><SearchItem data={item}/>}
                            onEndReachedThreshold={1}
                            onEndReached={_onLoadMore}
                            ListFooterComponent={_renderFooterList}
                        />
                    }
                </View>
                }
            </View>
        </SafeAreaView>
    )
}
export default SearchPage;
const LoadingViews  =()=>{
    return (
        <View style={{flex:1,paddingTop:15}}>
            <ActivityIndicator size="small" color="#e84d35" />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop:5,
        paddingHorizontal:10
    },
    viewSearch:{
        paddingHorizontal:10,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    inputSearch:{
        backgroundColor:"#f4f4f4",
        paddingVertical:3,
        paddingHorizontal:10,
        borderRadius:5,
        width:(width/4)*3
    }
})