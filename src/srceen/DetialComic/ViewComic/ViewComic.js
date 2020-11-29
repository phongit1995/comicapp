import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image, Dimensions, ActivityIndicator, } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const { height, width } = Dimensions.get("screen");
import { getDetailChapter } from '../../../api/comic'
export default function ViewComic({ route }) {
    const { id } = route.params

    const navigation = useNavigation();
    const [name, setName] = useState("Chi Tiết");
    const [imagesList, setImagesList] = useState()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const resultData = await getDetailChapter(id)

            if (resultData?.data?.status == "success") {
                // setName(resultData.data?.data.name)
                setImagesList(resultData.data?.data?.images)
            }
            setIsLoading(false)
        })()
    }, [])

    if (isLoading) {
        return (
            <View style={styles.containers}>
                <ActivityIndicator
                    animating={isLoading}
                    color='#bc2b78'
                    size="large"
                    style={styles.activityIndicator} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <View style={styles.Header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <Entypo name="chevron-thin-left" color="#fff" size={20} style={{ paddingLeft: 5 }} />
                    </TouchableOpacity>
                    <Text style={styles.name}>{name}</Text>
                    <View style={{ flexBasis: 20 }}></View>
                </View>
                <View style={styles.content}>
                    <FlatList
                        data={imagesList}
                        keyExtractor={(item) => `${item}`}
                        renderItem={({ item }) =>
                            (
                                <View style={styles.Img}>
                                    <Image style={{ width: '100%', height: (width * 3) / 2 }}
                                        source={{ uri: item }}
                                    >
                                    </Image>
                                </View>
                            )
                        }
                    />
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    containers: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    Header: {
        flexDirection: "row",
        paddingVertical: 10,
        justifyContent: "center",
        height: height / 12,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d90429',
        backgroundColor: '#e63946',
    },
    name: {
        textTransform: 'uppercase',
        fontSize: 15,
        flex: 1,
        // paddingLeft: 50,
        textAlign: "center",
        fontWeight: 'bold',
        color: '#fff',
    },
    content: {
        flex: 1,
    },
    Img: {
        width: "95%",
        alignSelf: "center",
        flexDirection: "row",
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 0.9,
        elevation: 5,
    },
    endchap: {
        textAlign: 'center'
    },
})
