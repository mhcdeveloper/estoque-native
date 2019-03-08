import React from 'react';
import { View, StyleSheet } from 'react-native';

const BarCodeFinder = ({ width, height, borderColor, borderWidth }) => (
    <View style={styles.container}>
        <View style={[styles.finder, { width, height }]}>
            <View
                style={[
                    { borderColor: borderColor },
                    styles.topLeftEdge,
                    { borderLeftWidth: borderWidth, borderTopWidth: borderWidth }
                ]}
            />
            <View
                style={[
                    { borderColor: borderColor },
                    styles.topRightEdge,
                    { borderRightWidth: borderWidth, borderTopWidth: borderWidth }
                ]}
            />
            <View
                style={[
                    { borderColor: borderColor },
                    styles.bottomLeftEdge,
                    { borderLeftWidth: borderWidth, borderBottomWidth: borderWidth }
                ]}
            />
            <View
                style={[
                    { borderColor: borderColor },
                    styles.bottomRightEdge,
                    { borderRightWidth: borderWidth, borderBottomWidth: borderWidth }
                ]}
            />
        </View>
    </View>
)

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    finder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    topLeftEdge: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 20,
    },
    topRightEdge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 20,
    },
    bottomLeftEdge: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 40,
        height: 20,
    },
    bottomRightEdge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 20,
    }
});

export default BarCodeFinder;