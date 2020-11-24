import React ,{useState,useEffect} from 'react';
import {Text,View,StyleSheet,Dimensions,ActivityIndicator}from 'react-native';
const {width} = Dimensions.get("window");
import { TabView, SceneMap ,TabBar} from 'react-native-tab-view';
import CategoryPage from './CategoryPage';
import {getListCategory} from './../../api/category';
const Category = ()=>{
    const [listPage,setListPage]=useState([]);
    const [index, setIndex] = React.useState(0);
    const [loading,setLoading]=React.useState(true);
    const renderScene = ({ route }) => {
        return <CategoryPage type={route?.key}/>
    };
    useEffect(()=>{
        getListCategory().then(result=>{
            if(result.data.status=="success"){
                let listCategory = result.data.data.map(item=>item.name);
                setListPage([...listCategory]);
                setLoading(false);
                
            }
        })
    },[])
    const _renderLabel =({ route, focused, color })=>{
        if(focused){
            return <Text style={styles.labelStyleActive}>{route.title.toUpperCase()}</Text>
        }
        return <Text style={styles.labelStyle}>{route.title.toUpperCase()}</Text>
    }
    return (
        <View style={styles.container}>
            {/* <CategoryHeader/> */}
            {loading?
            <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>:
            <TabView 
                initialLayout={{ width: Dimensions.get('window').width }}
                lazy={true}
                scrollEnabled={true}
                navigationState={{ index,routes:listPage.map(item=>{return{key: item, title: item}}) }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                lazyPreloadDistance={1}
                style={{backgroundColor:"white"}}
                
                renderTabBar={props=>{
                    return(
                        <TabBar 
                        {...props}
                        tabStyle={{minHeight: 10,backgroundColor:"white",width: 'auto',padding:0,margin:0}}
                        scrollEnabled = {true}
                        renderLabel= {_renderLabel}
                        style={{
                            shadowOffset: { height: 0, width: 0 }, 
                            shadowColor: 'transparent',
                            shadowOpacity: 0,
                            elevation: 1 
                        }}
                        />
                    )
                }}
            />}
        </View>
    )
}

export default Category ;
const CategoryHeader = () => {
    return (
        <View style={styles.header}>
            <Text style={{ textTransform: "uppercase", fontSize: 15, fontWeight: "bold" ,textAlign:"center"}}>Thể Loại</Text>
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
        paddingVertical:13,
        //borderBottomColor:"#A6ACA3",
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowRadius: 10,
        elevation:1
    },
    labelStyle:{
        fontSize:12,
        color:"#c9c2ad",
        fontFamily: "Nunito-SemiBold",
        paddingHorizontal:13,
        paddingVertical:10,
        borderBottomWidth:2,
        borderBottomColor:"white"
        
    },
    labelStyleActive:{
        fontSize:12,
        color:"#c9c2ad",
        fontFamily: "Nunito-SemiBold",
        paddingHorizontal:13,
        paddingVertical:10,
        color:"red",
        borderBottomWidth:2,
        borderBottomColor:"red"
    }
})
