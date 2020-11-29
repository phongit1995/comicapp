import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { getListChapter } from './../../api/comic';
const { height, width } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import * as SCREEN from  './../../constants/screen';
function Chapter({ id }) {

    const [loading, setLoading] = React.useState(true);
    const [dataChap, setDataChap] = React.useState();
    const dataChapMemo = React.useMemo(() => dataChap, [dataChap])
    const navigation = useNavigation();
    React.useEffect(() => {
        getListChapter(id).then(result=>{
            if (result?.data?.status == "success") {
                setDataChap(result?.data?.data)
                setLoading(false);
            }
        }).then(error=>console.log(error))
    }, [])
    const showChap = () => {
        return dataChapMemo.map((item) => {
            return (
                <RectButton key={item._id} onPress={() => navigation.navigate(SCREEN.DETIAL_CHAPTER, { id: item._id })}>
                    <View style={styles.Chapter_}>
                        <Text style={styles.name} >Chapter {item.index}</Text>
                        <Text>{item.createdAt.split(/T.*/)[0]}</Text>
                    </View>
                </RectButton>
            )
        })
    }
    return (
        <View style={styles.container}>
            {
                loading ? <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#bf0603" style={{marginTop:20}}/>
                </View> :
                    showChap()
            }
        </View>
    )
}


export default React.memo(Chapter)

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#fff'
    },
    name: {
        fontSize: 16,
        color: '#5c6b73'
    },
    Chapter_: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#5c6b73'
    },
    loading: {

        alignItems: 'center',
        justifyContent: 'center'
    }
})


