import React ,{useState ,useEffect} from 'react';
import {Text,View,StyleSheet ,TouchableOpacity,Linking ,Switch ,Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from './../../constants/screen';

const Setting =()=>{
    const [notification,Setnotification] = useState(true);
    const navigation = useNavigation();
    useEffect(()=>{
        AsyncStorage.getItem("NOTIFICATION_KEY")
        .then(data=>{
            if(data){
                Setnotification(false);
            }
        })
    },[])
    const _goToEmail =()=>{
        Linking.openURL("mailto:phongdev1995@gmail.com'")
    }
    const _OnChangeNotification =()=>{
        if(notification){
            AsyncStorage.setItem("NOTIFICATION_KEY","1").then(()=>Setnotification(value=>!value))
        }else{
            AsyncStorage.removeItem("NOTIFICATION_KEY").then(()=>Setnotification(value=>!value))
        }
    }
    const _ShareApp=()=>{
        Share.open({message:"Ứng Dụng Đọc truyện miễn phí"}).then((res) => {
            console.log(res);
        }).catch(error=>console.log(error));
    }
    return(
        <View style={styles.container}>
            <HeaderSetting />
            <View style={styles.containerContent}>
                <TouchableOpacity  style={styles.userView} onPress={()=>navigation.navigate(SCREEN.LOGIN_SCREEN)} >
                    <Image source={require('./../../assets/image/default.png')} style={styles.userAvatar} />
                    <Text style={{fontSize:17,fontWeight:"bold",fontFamily: "Nunito-SemiBold",}}>Nhấn Để Đăng Nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={_goToEmail}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign name="mail" size={18}/>
                        <Text style={{fontSize:17 ,marginLeft:8}}>
                            Hộp Thư Hỗ Trợ
                        </Text>
                    </View>
                    <Text style={{fontSize:13,color:"#c4b6b1",marginTop:5}}>
                        Phongdev@gmail.com
                    </Text>
                </TouchableOpacity>
                <View style={{marginTop:20}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center",flex:1}}>
                            <Ionicons name="notifications" size={18}/>
                            <Text style={{fontSize:17,marginLeft:8}} >Cài Đặt Thông Báo</Text>
                        </View>
                        <Switch
                            value={notification}
                            onValueChange={_OnChangeNotification}
                            style={{marginRight:10}}
                            trackColor={{ false: "#4cf54c", true: "#81b0ff" }}
                            thumbColor={notification ? "#ed683b" : "#fae019"}
                        />
                    </View>
                    <Text style={{fontSize:13,color:"#c4b6b1",marginTop:5}}>
                        Bật Để Nhận Thông Báo Mới Nhất
                    </Text>
                </View>
                <TouchableOpacity onPress={_ShareApp} style={{marginTop:20}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign name="sharealt" size={18}/>
                        <Text style={{fontSize:17 ,marginLeft:8}}>
                            Chia Sẻ Ứng Dụng
                        </Text>
                    </View>
                    <Text style={{fontSize:13,color:"#c4b6b1",marginTop:5}}>
                        Hãy Chia Sẻ Ứng Dụng Cho Bạn Bè Ngay
                    </Text>
                </TouchableOpacity>
                <View  style={{marginTop:20}}>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <AntDesign name="exclamationcircleo" size={16}/>
                        <Text style={{fontSize:17 ,marginLeft:8}}>
                            Phiên Bản
                        </Text>
                    </View>
                    <Text style={{fontSize:13,color:"#c4b6b1",marginTop:5}}>
                        1.1.0
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default Setting ;
const HeaderSetting=()=>{
    return(
        <View style={styles.header}>
            <Text style={styles.titleHeader}>Cài Đặt</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height: 50,
        fontFamily: "Nunito-SemiBold",
        justifyContent: "center",
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
    titleHeader:{
        textTransform: "uppercase", 
        fontSize: 16, 
        fontWeight: "bold",
        textAlign:"center"
    },
    containerContent:{
        marginTop:10,
        paddingHorizontal:15,
        fontFamily: "Nunito-SemiBold"
    },
    userView:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 2,
        marginBottom:10,
        borderRadius:20,
        // borderWidth:1,
        padding:12
    },
    userAvatar:{
        width:60,
        height:60,
        borderRadius:50,
        marginRight:20
    }
})
