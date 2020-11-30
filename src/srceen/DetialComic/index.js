import React, { useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet, Text, Image, ActivityIndicator, Animated } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getDetialComic } from './../../api/comic';
import Header from './HeaderDetial';
import Chapter from './Chapter'
import TouchableScale from 'react-native-touchable-scale';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import SqlHelper from './../../common/SQLHelper';
const { height, width } = Dimensions.get("window");
const initialLayout = { width: Dimensions.get('window').width };
import Detail from './Detail';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
const HEADER_MIN_HEIGHT = 50;
const Space = 35;
const HEADER_HEIGHT = 0;
const DetialComic = (props) => {
    const router = useRoute();
    const { id } = router.params;
    const [routes] = React.useState([
        { key: 'first', title: 'Chi tiết' },
        { key: 'second', title: 'Chapter' },
    ]);
    const [index, setIndex] = React.useState(0);
    const [data, setData] = React.useState();

    const [loading, setLoading] = useState(true);
    const dataMemo = React.useMemo(() => data, [data])


    const scrollY = React.useRef(new Animated.Value(0)).current;
    const translateY = scrollY.interpolate({
        inputRange: [0, HEADER_MIN_HEIGHT, HEADER_MIN_HEIGHT + Space, height],
        outputRange: [HEADER_MIN_HEIGHT, 15, 15, 15,
        ],
    });
    const translateY_ = scrollY.interpolate({
        inputRange: [0, height],
        outputRange: [0, 0],
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
        getDetialComic(id).then(result=>{
            if (result?.data?.status == "success") {
            setData(result?.data?.data);
            SqlHelper.addHistoryManga(result.data.data._id,result.data.data.name,result.data.data.image);
            setLoading(false);
            }
        })
    }, [])
    const Detail_ = React.useCallback(() => {
        return <Detail data={dataMemo.description}></Detail>
    }, [dataMemo])

    const Chap_ = React.useCallback(() => {
        return <Chapter id={id}></Chapter>
    }, [])

    const renderScene = SceneMap({
        first: Detail_,
        second: Chap_,
    });

    const showCategory = React.useCallback(() => {
        return dataMemo.category.map((item, index) => {
            return (
                <Text key={index} style={styles.normal}>{item} - </Text>
            )

        })
    }, [dataMemo])

    const translateY__ = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: "clamp",
    });

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
                    // stickyHeaderIndices={[1]}
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
                    <View>
                        <Animated.View
                            style={[
                                {
                                    marginTop: HEADER_HEIGHT,
                                    flex: 1,
                                    marginBottom: -HEADER_HEIGHT,
                                },
                                { transform: [{ translateY: translateY__ }] },
                            ]}
                        >
                            <TabView
                                navigationState={{ index, routes }}
                                renderScene={renderScene}
                                onIndexChange={setIndex}
                                renderTabBar={renderTabBar}
                                initialLayout={initialLayout}
                                lazy={true}
                                lazyPreloadDistance={1}
                            />
                        </Animated.View>
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
                <Animated.View style={[styles.contai_, { transform: [{ translateY: translateY_ }] }]}>
                    <View style={{
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 10,
                        flexDirection: 'row',
                        width: '100%'
                    }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <EvilIcons name="heart" size={25} color="#e63946" />
                            <Text style={{ fontSize: 12, color: '#b7b7a4' }}>Theo dõi</Text>
                        </View>
                        <TouchableScale
                            activeScale={0.9}
                            onPress={() => true}
                            useNativeDriver
                            style={styles.appButtonContainer_}>
                            <Text style={styles.appButtonText_}>Đọc Truyện</Text>
                        </TouchableScale>
                    </View>
                </Animated.View>
            </View>
        )
    }

}

export default React.memo(DetialComic);
const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: 'white' }}
        style={{ backgroundColor: '#e63946' }}
    />
);
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
        backgroundColor: '#e63946',
        paddingTop: Space,

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
        color: "#e63946",
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
        backgroundColor: '#e63946'
    },
    contai_: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 999,
        backgroundColor: '#fff',
        elevation: 999,
        alignSelf: "center",
        borderTopColor: '#f1faee',
        justifyContent: 'center',
        borderTopWidth: 1
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
    },

    appButtonContainer_: {
        elevation: 2,
        backgroundColor: "#e63946",
        borderRadius: 150,
        paddingVertical: 10,
        width: width / 1.5
    },
    appButtonText_: {
        fontSize: 12,
        color: "#fff",
        textAlign: 'center',
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
})


