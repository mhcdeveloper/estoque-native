import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const CompraItem = ({ item, handleDetalhe, handleEstoqueMassa, removeCompra }) => (
    <View style={styles.wrapper}>
        {item.situacaoCotacao !== 1
            ?
            null
            :
            <TouchableOpacity
                onPress={() => removeCompra(item.id)}
                style={styles.icon}>
                <Icon name="trash" size={30} color={Colors.lightRed} />
            </TouchableOpacity>
        }
        <View style={styles.containerInfo}>
            <View style={styles.container}>
                <Text style={styles.label}>Código:</Text>
                <Text style={styles.flatListText}>{item.idCotacao}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Fornecedor:</Text>
                <Text style={styles.flatListText}>{item.fantasia}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Situação:</Text>
                <Text style={[styles.labelSituacao, item.situacaoCotacao === 1 ? { backgroundColor: Colors.lightRed } : { backgroundColor: Colors.primary, color: Colors.thirth }]}>{item.situacaoCotacao === 1 ? 'Em andamento' : 'Recebido'}</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Data da Compra</Text>
                <Text style={styles.flatListText}>{item.dtReserva}</Text>
            </View>
        </View>
        <View style={styles.containerBtn}>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => handleDetalhe(item)}
                activeOpacity={0.7}
            >
                <Text style={styles.txtBtn}>Receber</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btn, { backgroundColor: Colors.thirth }]}
                onPress={() => handleEstoqueMassa(item)}
                activeOpacity={0.7}
            >
                <Text style={styles.txtBtn}>Estoque Massa</Text>
            </TouchableOpacity>
        </View>
    </View>
)

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderColor: Colors.lighter,
        borderWidth: 2,
        padding: 5,
        margin: 3,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    containerBtn: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'column',
    },
    containerIcon: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: Colors.secondary,
        fontWeight: '600',
        fontSize: Fonts.big,
        padding: 4,
    },
    flatListText: {
        color: Colors.regular,
        padding: 4,
        fontSize: Fonts.big
    },
    labelSituacao: {
        backgroundColor: Colors.red,
        textAlign: 'center',
        color: Colors.white,
        borderRadius: 10,
        padding: 4,
        fontSize: Fonts.big
    },
    btn: {
        margin: 7,
        backgroundColor: Colors.thirth,
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 5,
    },
    txtBtn: {
        fontSize: Fonts.big,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    },
    icon: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
        padding: 5,
    }
});

export default CompraItem;