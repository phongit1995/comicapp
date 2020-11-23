import React ,{useState} from 'react';
import {Text,View,StyleSheet,Dimensions}from 'react-native';
const {height} = Dimensions.get("window");
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import CategoryPage from './CategoryPage';
const Category = ()=>{
    const [listPage,setListPage]=useState(["Game"]);
    const [index, setIndex] = React.useState(0);
    const renderScene = ({ route }) => {
        return <Text>Phong</Text>
    };
    return (
        <View style={{}}>
            <CategoryHeader/>
            <TabView 
                style={{flex:1}}
                initialLayout={{ width: Dimensions.get('window').width ,height:500}}
                navigationState={{ index,routes:listPage.map(item=>{return{key: item, title: item}}) }}
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

export default Category ;
const CategoryHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={{ textTransform: "uppercase", fontSize: 14, fontWeight: "bold" ,textAlign:"center"}}>Thể Loại</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column"
    },
    header:{
        fontFamily: "Nunito-SemiBold",
        borderBottomWidth: 0.5,
        paddingVertical:10,
        borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation:1
    }
})
