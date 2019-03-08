import React from 'react';
import { View, Image } from 'react-native';

const logo = require('../../images/logo.png');
export default Logo = () => (
    <View style={{ flex: 1, alignItems: 'center' }}>
        <Image source={logo} style={{ width: 250, height: 250 }} />
    </View>
)