import React from 'react';
import {View,StyleSheet ,SafeAreaView,StatusBar,TextInput,Dimensions,TouchableOpacity,Text} from 'react-native';
const {width}=Dimensions.get("window");
const SearchPage = ()=>{
    const searchSubmit=()=>{
        console.log("Search");
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.viewSearch}>
                <TextInput
                    placeholder={"Nhập tên..."}
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    onSubmitEditing={searchSubmit}
                    style={styles.inputSearch}
                />
                <TouchableOpacity style={{justifyContent:"center"}}>
                    <Text>Hủy</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default SearchPage;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        paddingTop:5
    },
    viewSearch:{
        paddingHorizontal:20,
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