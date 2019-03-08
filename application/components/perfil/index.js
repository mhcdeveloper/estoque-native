import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Loader from '../loader';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import { signOut } from '../../services/auth';
import { api } from '../../helpers/constants';

const Perfil = ({ user, navigation }) => (
    <View style={styles.wrapper}>
        {user
            ?
            <View>
                <View style={styles.containerLogout}>
                    <TouchableOpacity
                        onPress={async () => await signOut(navigation)}
                        style={styles.btn} >
                        <Icon name="sign-out" size={30} color={Colors.brown} />
                        <Text style={styles.textBtn}>Sair</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Image
                        source={{ uri: `${api}/avatars/${user.foto_perfil}` }}
                        style={styles.image}>
                    </Image>
                    <Text style={styles.name}>{user.nome}</Text>
                    <View style={styles.containerBtn}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={async () => navigation.navigate('FluxoCaixa')}
                            style={[styles.btn, { margin: 10 }]} >
                            <Text style={styles.textBtn}>Fluxo de Caixa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={async () => navigation.navigate('Stories')}
                            style={[styles.btn, { margin: 10 }]} >
                            <Text style={styles.textBtn}>Storie Cliente</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            :
            <Loader />
        }
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: Colors.brown,
        borderBottomWidth: 1,
        borderColor: Colors.lighter,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerLogout: {
        zIndex: 9,
        position: 'absolute',
        top: 0,
        right: 0,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        borderWidth: 2,
        borderColor: Colors.white,
    },
    name: {
        fontSize: Fonts.big,
        fontWeight: '500',
        color: Colors.white,
        marginTop: 5,
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 10,
    },
    textBtn: {
        fontSize: Fonts.big,
        fontWeight: '700',
        color: Colors.brown,
        textAlign: 'center',
    }
});

export default Perfil;