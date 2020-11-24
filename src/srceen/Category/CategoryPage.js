import React from 'react';
import {View,Text} from 'react-native';
const CategoryPage =({type})=>{
    console.log(type);
    return(
        <View>
            <Text>{type}</Text>
        </View>
    )
}
export default React.memo(CategoryPage);