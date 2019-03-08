import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

import Colors from '../../styles/Colors';
import { API_IMG_STORIE } from '../../helpers/constants';

const StorieList = ({ item, remove }) => (
    <View style={styles.wrapper}>
        <Image
            source={{ uri: `${API_IMG_STORIE}${item.img}` }}
            indicator={ProgressBar}
            style={styles.img} />
        <TouchableOpacity 
            activeOpacity={0.7}
            style={styles.btn}
            onPress={() => remove(item)}>
            <Icon name="trash" size={40} color={Colors.white} />
        </TouchableOpacity>
    </View>
)

const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width,
        height: 500,
    },
    btn: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.secondary,
        padding: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default StorieList;