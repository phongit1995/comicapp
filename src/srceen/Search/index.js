import React ,{useState} from 'react';
import {View,StyleSheet ,SafeAreaView,StatusBar,TextInput,Dimensions,TouchableOpacity,Text,ActivityIndicator,FlatList} from 'react-native';
import SearchItem from './SearchItem';
import {searchComicByName} from './../../api/comic';
const {width}=Dimensions.get("window");
const NUMBER_ITEM_PAGE=10;
const SearchPage = ()=>{
    const [text,setText]=useState("");
    const [loading,setLoading] = useState(false);
    const [listComic,setListComic]=useState([]);
    const [page,setPage]= useState(1);
    const searchSubmit=()=>{
        console.log(text);
        if(text==""){
            return null ;
        }
        setLoading(true);
        searchComicByName(1,NUMBER_ITEM_PAGE,text)
        .then((result)=>{
                if(result.data.code==200 || result.data.status=="success"){
                    console.log(result.data.data);
                    setListComic([...result.data.data]);
                    setLoading(false);
                }
        }).catch(error=>{
            console.log(error);
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.viewSearch}>
                <TextInput
                    placeholder={"Nhập Tên Tác Phẩm..."}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    onChangeText={text=>setText(text)}
                    onSubmitEditing={searchSubmit}
                    style={styles.inputSearch}
                />
                <TouchableOpacity style={{justifyContent:"center"}}>
                    <Text>Hủy</Text>
                </TouchableOpacity>
            </View>
            <View style={{marginTop:4,flex:1,paddingHorizontal:5}}>
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
                            data={listComic}
                            keyExtractor={(item, index) =>item._id+index}
                            renderItem={({item})=><SearchItem data={item}/>}
                            onEndReachedThreshold={1}
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