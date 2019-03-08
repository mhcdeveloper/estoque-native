import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../styles/Colors';

const ComprovanteItem = ({ item, remove }) => (
    <View style={styles.wrapper}>
        <Image source={{ uri: item.img }} style={styles.img} resizeMode="cover" />
        <TouchableOpacity onPress={() => remove(item)}>
            <Icon name="trash" size={40} color={Colors.lightRed} />
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
    },
    img: {
        width: 400,
        height: 500,
    },    
});

export default ComprovanteItem;