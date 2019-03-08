import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComprasActions from '../../stores/ducks/compras';
import Loader from '../../components/loader';
import InputField from '../../components/inputs/InputField';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import RoundedButton from '../../components/buttons/RoundedButton';

class EstoqueMassa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantidade: 0,
            compra: {},
        }
    }

    static navigationOptions = () => {
        return {
            headerTitle: (
                <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Estoque Massa</Text>
                </View>
            )
        };
    };

    componentWillMount() {
        this.getCompra(this.props.data.compra);
    }
    
    componentWillReceiveProps(props) {
        this.getCompra(props.data.compra);
    }
    
    getCompra = (compra) => {
        this.setState({ compra: JSON.parse(JSON.stringify(compra)) });
    }

    transferirProducao = (produto) => {
        const { quantidade } = this.state;
        const quantidadeAtualizada = parseFloat(quantidade.toString().replace(',', '.'));
        const quantidadeAtualAtualizada = parseFloat(produto.quantidadeAtual.toString().replace(',', '.'));
        if (quantidadeAtualizada > quantidadeAtualAtualizada) {
            Alert.alert(
                'Ocorreu um erro',
                `A quantidade da transferência do produto ${produto.nomeProduto} está sendo maior que a quantidade atual!`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        } else if (quantidadeAtualizada <= 0) {
            Alert.alert(
                'Ocorreu um erro',
                `A quantidade da transferência tem que ser maior que 0.`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        } else {
            const data = {
                idCotacao: produto.idCotacao,
                idProdutoCotacao: produto.idProdutoCotacao,
                idProduto: produto.idProduto,
                qtdSolicitada: quantidadeAtualizada
            }
            Alert.alert(
                'Atenção, aviso importante.',
                `Tem certeza que quer mover ${quantidadeAtualizada} para produção ?`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => this.props.getEstoqueMassa(data) },
                ],
                { cancelable: false }
            )
        }
        this.setState({ quantidade: 0 });
    }

    moverTodosProducao = (produto) => {
        const data = {
            idCotacao: produto.idCotacao,
            idProdutoCotacao: produto.idProdutoCotacao,
            idProduto: produto.idProduto,
            qtdSolicitada: parseFloat(produto.quantidadeAtual)
        }
        Alert.alert(
            'Atenção, aviso importante.',
            `Tem certeza que quer mover a quantidade total para produção ?`,
            [
                { text: 'Cancel', onPress: () => null },
                { text: 'OK', onPress: () => this.props.getEstoqueMassa(data) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { compra } = this.state;
        const { loading } = this.props.data;
        return (
            <View style={styles.wrapper}>
                <View style={styles.containerInfo}>
                    <View style={styles.info}>
                        <Text style={styles.label}>Compra:</Text>
                        <Text style={styles.txtInfo}>{compra.idCotacao}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Fornecedor:</Text>
                        <Text style={styles.txtInfo}>{compra.fantasia}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Data:</Text>
                        <Text style={styles.txtInfo}>{compra.dtRegistro}</Text>
                    </View>
                </View>
                {loading
                    ?
                    <Loader />
                    :
                    <View style={styles.wrapper}>
                        <View style={styles.containerInfo}>
                            <View style={styles.info}>
                                <Text style={styles.label}>Produtos</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <FlatList
                                keyExtractor={(item, index) => `index-${index}`}
                                data={compra.produtos}
                                renderItem={({ item, index }) => {
                                    return (
                                        <View key={index} style={styles.containerInfo}>
                                            <View style={styles.info}>
                                                <Text style={styles.labelProduto}>Nome:</Text>
                                                <Text style={[styles.labelProduto, { paddingLeft: 4 }]}>{item.nomeProduto}</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text style={styles.labelProduto}>Quantidade Atual:</Text>
                                                <Text style={[styles.labelProduto, { paddingLeft: 4 }]}>{parseFloat(item.quantidadeAtual).toFixed(0)}</Text>
                                            </View>
                                            {parseFloat(item.quantidadeAtual) > 0
                                                ?
                                                <View>
                                                    <View style={styles.info}>
                                                        <InputField
                                                            labelText="Total Retirada"
                                                            labelTextSize={16}
                                                            labelColor={Colors.secondary}
                                                            textColor={Colors.regular}
                                                            borderBottomColor={Colors.secondary}
                                                            inputType="numeric"
                                                            customStyle={{ marginBottom: 5 }}
                                                            onChangeText={(quantidade) => {
                                                                if (quantidade) {
                                                                    this.setState({ quantidade });
                                                                } else {
                                                                    this.setState({ quantidade: 0 })
                                                                }
                                                            }}
                                                            showCheckmark={false}
                                                            autoCapitalize="none"
                                                        />
                                                    </View>
                                                    <View style={styles.containerBtn}>
                                                        <RoundedButton
                                                            text="Movimentar para Produção"
                                                            textColor={Colors.white}
                                                            textAlign="center"
                                                            textSize={15}
                                                            background={Colors.secondary}
                                                            borderColor="transparent"
                                                            iconPosition="right"
                                                            disabled={false}
                                                            loading={false}
                                                            handleOnPress={() => this.transferirProducao(item)}
                                                        />
                                                        <RoundedButton
                                                            text="Mover Tudo"
                                                            textColor={Colors.white}
                                                            textAlign="center"
                                                            textSize={15}
                                                            background={Colors.thirth}
                                                            borderColor="transparent"
                                                            iconPosition="right"
                                                            disabled={false}
                                                            loading={false}
                                                            handleOnPress={() => this.moverTodosProducao(item)}
                                                        />
                                                    </View>
                                                </View>
                                                :
                                                <Text style={styles.labelEmpty}>Nenhum(a) {item.nomeProduto} em estoque massa</Text>
                                            }
                                        </View>
                                    )
                                }}>
                            </FlatList>
                        </ScrollView>
                    </View>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    containerInfo: {
        marginTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 2,
        borderColor: Colors.lighter,
    },
    containerSuccess: {
        backgroundColor: Colors.green,
        padding: 5,
        borderRadius: 10,
    },
    containerBtn: {
        marginLeft: 60,
        marginRight: 60,
        marginTop: 10,
    },
    txtSuccess: {
        fontSize: Fonts.big,
        color: Colors.white,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    labelProduto: {
        fontSize: Fonts.big,
        color: Colors.regular
    },
    label: {
        fontSize: Fonts.medium,
        color: Colors.secondary,
    },
    labelEmpty: {
        fontSize: Fonts.big,
        color: Colors.lightRed,
        textAlign: 'center'
    },
    txtInfo: {
        fontSize: Fonts.big,
        color: Colors.regular,
        paddingLeft: 6,
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
        color: Colors.regular,
        borderBottomColor: 'transparent',
    }
})

const mapStateToProps = state => ({
    data: state.compras
});

const mapDispathToProps = dispatch => bindActionCreators(ComprasActions, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(EstoqueMassa);