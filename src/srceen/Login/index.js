import React from 'react';
import { SafeAreaView, View, StyleSheet, Image, Dimensions, Text, Button ,StatusBar} from 'react-native'
import TextInputs from '../../Components/Form/TextInputs';
import CheckBox from '../../Components/Form/CheckBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Yup from 'yup';
const Radius = 50
const { width, height: Hheight } = Dimensions.get("window")
const height = width * (750 / 1125);
import { Formik } from 'formik';
import Icon from '../../Components/Form/Icon';
import Spinner from 'react-native-loading-spinner-overlay';
import {loginUser} from './../../api/user';
export default React.memo(function Login() {
    const [isView, setView] = React.useState(true);
    const [loading,setLoading] = React.useState(false);
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Nhập địa chỉ Email hợp lệ '@gmail.com'")
            .required("Vui lòng điền đầy đủ thông tin"),
        password: Yup.string().required("Vui lòng điền đầy đủ thông tin")
            .min(5, "Mật khẩu phải có ít nhất 5 kí tự"),
    });
    const handelLoginUser=(values)=>{
        console.log( values.email)
        loginUser(values.email,values.password).then(result=>{
            console.log(result)
        }).catch(error=>console.log(error.response.data))
    }
    return (
        <View style={styles.container} >
            <StatusBar  translucent backgroundColor="transparent" />
            <Spinner visible={loading} />
            <View style={{ flex: 1 / 3 }}>
                <Image
                    style={styles.image_Top}
                    source={{
                        uri: 'https://static.dribbble.com/users/2543587/screenshots/14004374/image.png',
                    }}>
                </Image>
            </View>
            <View style={{ flex: 1, backgroundColor: '#0C0D34', overflow: 'hidden' }}>
                <Image
                    style={styles.image_Body}
                    source={{
                        uri: 'https://static.dribbble.com/users/2543587/screenshots/14004374/image.png',
                    }}>
                </Image>
                <View style={styles.formLogin}>
                    <Text style={styles.title}>Đăng Nhập</Text>
                    <Formik
                        initialValues={{ email: 'phong@gmail.com', password: 'phong' }}
                        validationSchema={validationSchema}
                        onSubmit={handelLoginUser}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                                <View>
                                    <View style={{ marginBottom: 20 }}>
                                        <TextInputs
                                            icon="mail"
                                            name="email"
                                            placeholder="Enter your Email"
                                            onChange={handleChange("email")}
                                            onBlur={handleBlur("email")}
                                            value={values.email}
                                            touched={touched.email}
                                            errors={errors.email}
                                            autoCompleteType="email"
                                            returnKeyLabel="next"
                                            returnKeyType="next"
                                        ></TextInputs>
                                    </View>
                                    <View style={{ marginBottom: 20 }}>
                                        <TextInputs
                                            name="password"
                                            icon="lock"
                                            placeholder="Enter your Password"
                                            onChange={handleChange("password")}
                                            onBlur={handleBlur("password")}
                                            autoCompleteType="password"
                                            value={values.password}
                                            touched={touched.password}
                                            errors={errors.password}
                                            returnKeyLabel="next"
                                            returnKeyType="next"
                                            onPress={() => setView((c) => !c)}
                                            secureTextEntry={isView}
                                            isView={isView}
                                        ></TextInputs>
                                    </View>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <View>
                                            <CheckBox label="Remember me"></CheckBox>
                                        </View>
                                        <View>
                                            <TouchableOpacity activeOpacity={0.5}>
                                                <Text style={{ color: '#2CB9B0' }}>Quên mật khẩu</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            marginTop: 20
                                        }}
                                    >
                                        {/* <Button
                                            title="Đăng Nhập"
                                            color='#2CB9B0'
                                            onPress={handleSubmit}
                                        /> */}
                                        <TouchableOpacity activeOpacity={0.5} onPress={handleSubmit} style={styles.appButtonContainer}>
                                            <Text style={styles.appButtonText}>Đăng Nhập</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                    </Formik>
                </View>

            </View>
            < View style={{ flex: 1 / 3, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0C0D34' }}>
                <Icon></Icon>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Text style={{ color: '#fff', paddingRight: 5 }}>Chưa có tài khoản? </Text>
                    <TouchableOpacity activeOpacity={0.5} >
                        <Text style={{ color: '#2CB9B0' }}>Đăng kí ngay </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    title: {
        paddingVertical: 20,
        fontSize: 25,
        textAlign: 'center',
        color: '#2CB9B0',
        fontWeight: 'bold'
    },
    image_Top: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: '100%',
        borderBottomLeftRadius: Radius,
        // borderTopLeftRadius: Radius,
        // borderTopRightRadius: Radius
    },
    image_Body: {
        ...StyleSheet.absoluteFillObject,
        width: width,
        height: height,
    },
    formLogin: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopRightRadius: Radius,
        borderBottomLeftRadius: Radius,
        borderBottomRightRadius: Radius,
        paddingHorizontal: 30,
        justifyContent: 'center'
    },
    appButtonContainer: {
        elevation: 3,
        backgroundColor: "#2CB9B0",
        borderRadius: 20,
        paddingVertical: 15,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})