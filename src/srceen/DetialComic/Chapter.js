import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { getListChapter } from './../../api/comic';
const { height, width } = Dimensions.get("window");
function Chapter({ id }) {

    const [loading, setLoading] = React.useState(true);
    const [dataChap, setDataChap] = React.useState();
    const dataChapMemo = React.useMemo(() => dataChap, [dataChap])

    React.useEffect(() => {
        (async () => {
            const resultChap = await getListChapter(id);
            if (resultChap?.data?.status == "success") {
                await setDataChap(resultChap?.data?.data)
                setLoading(false);
            }
        })()
    }, [])
    const showChap = () => {
        return dataChapMemo.map((item) => {
            return (
                <RectButton key={item._id} >
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
                    <ActivityIndicator size="large" color="#bf0603" />
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
        marginTop: height / 4,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


