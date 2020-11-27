import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
const { height, width } = Dimensions.get("window");
function Chapter({ data }) {

    const [loading, setLoading] = React.useState(true);
    const showChap = () => {
        return data.map((item) => {
            return (
                <RectButton key={item._id} >
                    <View style={styles.Chapter_}>
                        <Text style={styles.name} >Chapter {item.index}</Text>
                        <Text>{item.createdAt}</Text>
                    </View>
                </RectButton>
            )
        })
    }
    React.useEffect(() => {
        const settime = setTimeout(() => {
            setLoading(false);
        }, 100);
        return () => clearTimeout(settime)
    }, [])
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
        flex: 1,

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