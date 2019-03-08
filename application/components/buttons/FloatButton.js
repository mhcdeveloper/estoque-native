import React from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../styles/Colors';

const App = ({ handleModal, handleEstoqueMassa, produto }) => (
    <ActionButton buttonColor={Colors.secondary}>
        <ActionButton.Item buttonColor='#9b59b6' title="Retirar para Produção" onPress={() => handleModal()}>
            <Icon name="check" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Buscar Estoque Massa" onPress={() => handleEstoqueMassa(produto.id)}>
            <Icon name="archive" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="Transferir Produto" onPress={() => { }}>
            <Icon name="shopping-cart" style={styles.actionButtonIcon} />
        </ActionButton.Item>
    </ActionButton>
);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default App;