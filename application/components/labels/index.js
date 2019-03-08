import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';
import Colors from '../../styles/Colors';

const Label = ({ title, color, fontSize }) => (
    <View style={styles.wrapper}>
        <Text style={[styles.label, { fontSize:  fontSize ? fontSize : 18, color: color ? color : Colors.regular }]}>{title}</Text>
    </View>
)

export default Label;