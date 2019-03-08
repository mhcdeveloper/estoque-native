import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';

const ItemMercado = ({ handleRemove, produto, position }) => (
    console.log(produto),
    <View style={styles.wrapper}>
        <View style={styles.container}>
            <View style={styles.containerInfo}>
                <View style={styles.containerLabel}>
                    <Text style={styles.label}>Produto:</Text>
                    <Text style={styles.flatListText}>{produto.nome}</Text>
                </View>
                <View style={styles.containerLabel}>
                    <Text style={styles.label}>Quantidade:</Text>
                    <Text style={styles.flatListText}>{produto.quantidade}</Text>
                </View>
                <View style={styles.containerLabel}>
                    <Text style={styles.label}>Valor Total:</Text>
                    <Text style={styles.flatListText}>R${produto.subTotal}</Text>
                </View>
            </View>
            <View style={styles.containerBtn}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => handleRemove(produto, position)}
                    activeOpacity={0.7}
                >
                    <Icon name="trash" size={25} color={Colors.white}/>
                </TouchableOpacity>
            </View>
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
        justifyContent: 'space-between',
        alignItems: 'center',           
        padding: 10,     
    },
    containerLabel: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
    },
    containerBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'column',
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
    btn: {
        margin: 7,
        backgroundColor: Colors.lightRed,
        borderRadius: 10,
        paddingHorizontal: 10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    txtBtn: {
        fontSize: Fonts.big,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center',
    }
})

export default ItemMercado;