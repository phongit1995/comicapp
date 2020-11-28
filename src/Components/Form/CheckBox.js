import React from 'react'
import { View, TextInput, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { RectButton } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';

const SIZE = 20
export default function CheckBox({ label }) {
    const [isChecked, setChecked] = React.useState(false)

    return (
        <RectButton onPress={() => {
            setChecked((c) => !c)
        }}>
            <View style={{
                flexDirection: 'row'
            }}
            >
                <View style={{
                    borderRadius: 5,
                    backgroundColor: isChecked ? '#fff' : '#2CB9B0',
                    height: SIZE,
                    width: SIZE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: "#2CB9B0",
                    marginRight: 10
                }}
                >

                    <Feather
                        name="check"
                        color="#fff"
                    >
                    </Feather>

                </View>
                <TouchableOpacity>
                    <Text style={{color: '#6c757d'}}>{label}</Text>
                </TouchableOpacity>
            </View>
        </RectButton >
    )
}
