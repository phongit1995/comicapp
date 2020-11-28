import React from 'react'
import { View, TextInput, StyleSheet, Text } from 'react-native'
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SIZE = 20
export default function TextInputs({
    icon,
    name,
    placeholder,
    errors,
    touched,
    onChange,
    onBlur,
    value,
    secureTextEntry,
    onPress,
    isView,
    autoCompleteType,
    returnKeyLabel,
    returnKeyType,
    ...props
}) {
    const color = !touched ? "#6c757d" : errors ? "#e63946" : "#2CB9B0";
    return (
        <View style={[
            styles.container,
            {
                borderColor: color
            }
        ]}>
            <View style={{ padding: 10 }}>
                <Feather
                    name={icon}
                    size={20}
                    {...{ color }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor={color}
                    placeholder={placeholder}
                    onChangeText={onChange}
                    secureTextEntry={secureTextEntry}
                    {...props}
                ></TextInput>
            </View>
            {
                name === "password" && (
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={onPress}
                    >
                        <View
                            style={{
                                height: SIZE,
                                width: SIZE,
                                backgroundColor: "#2CB9B0",
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15,
                                marginRight: 10
                            }}
                        >
                            <FontAwesome
                                name={isView ? "eye-slash" : "eye"}
                                size={15}
                                color="#fff"
                            />
                        </View>
                    </TouchableOpacity>
                )
            }
            {
                touched && (
                    <View style={{
                        height: SIZE,
                        width: SIZE,
                        backgroundColor: color,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 15,
                        marginRight: 10
                    }}>
                        <Feather
                            name={errors ? "x" : "check"}
                            size={15}
                            color="#fff"
                        />
                    </View>
                )
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
    },
})