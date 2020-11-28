import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function Icon() {
    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.icon}>
                    <EvilIcons name="sc-facebook" size={35}></EvilIcons>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.icon}>
                    <EvilIcons name="sc-google-plus" size={35}></EvilIcons>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.icon}>
                    <EvilIcons name="sc-twitter" size={35}></EvilIcons>
                </View>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        backgroundColor: '#fff',
        margin: 10,
        height: 40,
        width: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})