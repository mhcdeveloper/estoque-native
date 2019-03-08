import React from 'react';
import { View, Text } from 'react-native';
import {
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator,
    createAppContainer
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../styles/Colors'
import { transparentHeaderStyle } from './HeaderStyle';
import Welcome from '../screens/welcome';
import Produtos from '../screens/produtos';
import Compras from '../screens/compras';
import Mercados from '../screens/mercados';
import AuthLoadingScreen from '../components/loadingScreen';
import Login from '../screens/login/Login';
import Scanner from '../components/camera';
import Comprovante from '../components/camera/Comprovante';
import ReceberCompras from '../screens/compras/ReceberCompras';
import EstoqueMassa from '../screens/compras/EstoqueMassa';
import FluxoCaixa from '../screens/fluxoCaixa';
import Stories from '../screens/stories';
import StorieCamera from '../components/camera/StorieCamera';

const AuthStackNavigator = createStackNavigator({
    Welcome: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
    },
});

const AppTabNavigator = createBottomTabNavigator(
    {
        Inicio: Welcome,        
        Produtos: Produtos,        
        Compras: Compras,        
        Mercado: Mercados,        
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Inicio') {
                    iconName = 'home';
                }
                if (routeName === 'Produtos') {
                    iconName = 'qrcode';
                }
                if (routeName === 'Compras') {
                    iconName = 'list-alt';
                }
                if (routeName === 'Mercado') {
                    iconName = 'shopping-cart';
                }
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: Colors.secondary,
            inactiveTintColor: Colors.thirth,
            style: {
                backgroundColor: Colors.primary
            },                      
        },
    }
)

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
    },
    Scanner: {
        screen: Scanner,
    },
    SignedOut: {
        screen: AuthLoadingScreen,
    },
    ReceberCompras: {
        screen: ReceberCompras,
    },
    EstoqueMassa: {
        screen: EstoqueMassa,
    },
    ComprasFiltradas: {
        screen: Compras,
    },
    FluxoCaixa: {
        screen: FluxoCaixa,
    },
    Stories: {
        screen: Stories,
    },
    Comprovante: {
        screen: Comprovante,
    },
    StorieCamera: {
        screen: StorieCamera,
    },
}, {
        defaultNavigationOptions: {
            headerTitle: (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Estoque Melk</Text>
                </View>),
            headerStyle: transparentHeaderStyle,
            headerTintColor: Colors.thirth,                
        }
    });

export default AppContainer = createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreen,
        Auth: AuthStackNavigator,
        App: AppStackNavigator
    })
)