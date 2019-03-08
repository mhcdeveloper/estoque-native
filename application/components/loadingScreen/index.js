import React, { Component } from 'react';
import { 
    View, 
    Text, 
    ActivityIndicator, 
    AsyncStorage, 
    StyleSheet, 
    Dimensions 
} from 'react-native';

import Colors from '../../styles/Colors';
import { LOGIN_KEY } from '../../helpers/constants';

const height = Dimensions.get('window').height;
class AuthLoadingScreen extends Component {

    componentDidMount() {
        this.loadApp();        
    }

    loadApp = async() => {
        const userToken = await AsyncStorage.getItem(LOGIN_KEY);
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.containerLoading}>
                    <ActivityIndicator color={Colors.secondary} size="large" />
                    <Text style={styles.textWelcome}>Carregando as informações...</Text>
                </View>            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.secondary,
    },
    containerLoading: {
        position: 'absolute',
        top: height * 0.45,
        right: 30,
        left: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 5,
        padding: 5,
    },
    textWelcome: {
        fontSize: 16,
        color: Colors.dark,
    }
});

export default AuthLoadingScreen;