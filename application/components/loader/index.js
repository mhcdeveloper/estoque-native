import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import Colors from '../../styles/Colors';

const Loader = () => (
    <View style={styles.container}>
        <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={Colors.secondary} />
        </View>
    </View>
)

export default Loader;

const styles = StyleSheet.create({
    container: {
        zIndex: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    },
    loaderContainer: {
        width: 90,
        height: 90,
        backgroundColor: Colors.white,
        borderRadius: 15,
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: -45,
        marginTop: -45,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loaderImage: {
        width: 90,
        height: 90,
        borderRadius: 15,
    },
});

