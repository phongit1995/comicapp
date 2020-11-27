import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, Image, ActivityIndicator, Animated, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDetialComic, getListChapter } from './../../api/comic';
import Header from './HeaderDetial';
import Chapter from './Chapter'
import TouchableScale from 'react-native-touchable-scale';
const { height, width } = Dimensions.get("window");

import Detail from './Detail';
import { RectButton } from 'react-native-gesture-handler';
const HEADER_MIN_HEIGHT = 50;
const Space = 35;
const DetialComic = (props) => {
    const router = useRoute();
    const { id } = router.params;
    const [tab, settab] = React.useState(0);
    const [data, setData] = React.useState();
    const [dataChap, setDataChap] = React.useState();
    const [loading, setLoading] = useState(true);
    const dataMemo = React.useMemo(() => data, [data])
    const dataChapMemo = React.useMemo(() => dataChap, [dataChap])

    const scrollY = React.useRef(new Animated.Value(0)).current;
    const translateY = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT + Space, height],
        outputRange: [HEADER_MIN_HEIGHT, 15, 15, 15,
        ],
    });
    const size_ = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT + Space, height],
        outputRange: [17, 13, 13,
        ],

    });
    const Wid = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT - 30, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT + Space, height],
        outputRange: [width - 20, width - 70, width - 70, width - 70, width - 70,],

    });
    const left_ = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT - 30, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT + Space, height],
        outputRange: [10, 35, 35, 35, 35],

    });
    useEffect(() => {
        (async () => {
            const [resultDetail, resultChap] = await Promise.all([getDetialComic(id), getListChapter(id)]);

            if (resultDetail?.data?.status == "success" && resultChap?.data?.status == "success") {
                await setData(resultDetail?.data?.data)
                await setDataChap(resultChap?.data?.data)
                setLoading(false);
            }
        })()

    }, [])
    const Detail_ = React.useCallback(() => {
        return <Detail data={dataMemo.description}></Detail>
    }, [dataMemo])

    const Chap_ = React.useCallback(() => {
        return <Chapter data={dataChapMemo}></Chapter>
    }, [dataChapMemo])

    const showCategory = React.useCallback(() => {
        return dataMemo.category.map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item} - </Text>
            )

        })
    }, [dataMemo])
    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#bf0603" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Header />
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    stickyHeaderIndices={[1]}
                    onScroll={Animated.event(
                        [
                            {
                                nativeEvent: {
                                    contentOffset: {
                                        y: scrollY
                                    }
                                }
                            }
                        ],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={1}
                >
                    <View style={styles.header}>
                        <View style={styles.containerInfo}>
                            <View style={styles.imageLeft}>
                                <Image source={{ uri: dataMemo.image }} style={styles.img} />
                            </View>
                            <View style={styles.contairight}>
                                <Text numberOfLines={1} style={styles.nameAuthor}>Tác Giả : <Text style={styles.normal}> {dataMemo.author}</Text></Text>
                                <Text numberOfLines={1} style={styles.status}>Trạng Thái : <Text style={styles.normal}>Hoàn Thành</Text></Text>
                                <Text numberOfLines={1} style={styles.category}>Thể Loại : {showCategory()}</Text>
                                <TouchableScale
                                    activeScale={0.9}
                                    onPress={() => true}
                                    useNativeDriver

                                    style={styles.appButtonContainer}>
                                    <Text style={styles.appButtonText}>Đọc Truyện</Text>
                                </TouchableScale>
                            </View>
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                        <View style={styles.tab_}>
                            <TouchableOpacity style={[styles.description_comic, tab === 0 && { borderBottomWidth: 2, borderBottomColor: '#fff' }]} onPress={() => settab(0)}>
                                <Text style={styles.title}>Chi tiết</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.Chap_comic, tab === 1 && { borderBottomWidth: 2, borderBottomColor: '#fff' }]} onPress={() => settab(1)}>
                                <Text style={styles.title}>Chương</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            tab === 0 && Detail_()
                        }
                    </View>
                    <View style={{ flex: 1 }}>
                        {
                            tab === 1 && Chap_()
                        }
                    </View>

                </Animated.ScrollView>
                <Animated.View style={[styles.contai, { transform: [{ translateY }], width: Wid, left: left_, }]}>
                    <Animated.Text
                        numberOfLines={2}
                        style={[
                            styles.nameComic,
                            { fontSize: size_ }
                        ]}
                    >{dataMemo.name}</Animated.Text>
                </Animated.View>
            </View>
        )
    }

}

export default React.memo(DetialComic);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
    },
    containerInfo: {
        flexDirection: "row",
        marginVertical: 10
    },
    tabs: {
        margin: 0,
        backgroundColor: 'pink'
    },
    header: {
        paddingHorizontal: 10,
        backgroundColor: '#eea71d',
        paddingTop: Space
    },
    nameComic: {
        textAlign: "center",
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    imageLeft: {
        height: height / 4,
        width: width / 3,
    },
    img: {
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
        borderRadius: 5
    },
    nameAuthor: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    status: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14
    },
    category: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    normal: {
        fontWeight: 'normal',

    },
    contairight: {
        width: width - (width / 3) - 30,
        marginLeft: 10,
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    appButtonContainer: {
        elevation: 3,
        backgroundColor: "#fff",
        borderRadius: 150,
        paddingVertical: 10,
        width: '60%'
    },
    appButtonText: {
        fontSize: 12,
        color: "#eea71d",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contai: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#eea71d'
    },
    tab_: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: '#eea71d',
        justifyContent: 'space-between'
    },
    description_comic: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    Chap_comic: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
    title: {
        fontSize: 16,
        color: '#fff'
    }
})


