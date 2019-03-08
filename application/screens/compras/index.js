import React, { Component } from 'react';
import { View, ScrollView, Text, RefreshControl, Platform, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComprasActions from '../../stores/ducks/compras';
import styles from './styles';
import CompraItem from './CompraItem';
import Colors from '../../styles/Colors';

class Compras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: false
        }
    }

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        if(params) {
            return {
                headerTitle: (
                    <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Compras</Text>
                    </View>
                )
            };
        }
    };

    componentDidMount() {
        //Verifico se caso a tab compras estiver em focus eu chamo o metodo getAllCompras, e caso seja busca de compras por produto 
        //eu chamo getComprasPorProduto
        this.subs = [
            this.props.navigation.addListener('didFocus', () => this.getAllCompras()),            
        ];
        this.getAllCompras();
    }

    componentWillUnmount() {
        this.subs.forEach((sub) => {
            sub.remove();
        });
    }

    getAllCompras = () => {
        if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params.idProduto) {
            this.props.getComprasPorProduto(this.props.navigation.state.params.idProduto);
            this.setState({ filter: true });
        } else {
            this.setState({ filter: false });
            this.props.getCompras();
        }
    }

    handleDetalhe = (produto) => {
        const { filter } = this.state;
        const { compraDetalhe, navigation } = this.props;
        compraDetalhe(produto);
        navigation.navigate('ReceberCompras', { getByQrcode: filter});
    }

    handleEstoqueMassa = (produto) => {
        const { filter } = this.state;
        const { compraDetalhe, navigation } = this.props;
        compraDetalhe(produto);
        navigation.navigate('EstoqueMassa');
    }

    removeCompra = (idCotacao) => {
        Alert.alert(
            'Atenção, aviso importante.',
            `Tem certeza que quer remover a compra ?`,
            [
                { text: 'Cancel', onPress: () => null },
                { text: 'OK', onPress: () => this.props.removeCompra(idCotacao) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { navigation } = this.props;
        const { compras, loading } = this.props.data;
        return (
            <View style={styles.wrapper}>
                <ScrollView
                    style={styles.wrapper}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={this.getAllCompras}
                        />
                    }>
                    {compras.length > 0
                        ?
                        compras.map((compra, index) => (
                            <CompraItem
                                key={index}
                                removeCompra={this.removeCompra.bind(this)}
                                handleDetalhe={this.handleDetalhe.bind(this)}
                                handleEstoqueMassa={this.handleEstoqueMassa.bind(this)}
                                navigation={navigation}
                                item={compra}
                                index={index}
                            />

                        ))
                        :
                        <View style={styles.containerLabel}>
                            <Text style={styles.label}>Nenhuma compra encontrada</Text>
                        </View>
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    data: state.compras,
});

const mapDispthToProps = dispatch => bindActionCreators(ComprasActions, dispatch);

export default connect(mapStateToProps, mapDispthToProps)(Compras);