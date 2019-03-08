import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Alert,
    Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ComprasActions from '../../stores/ducks/compras';
import Fonts from '../../styles/Fonts';
import Colors from '../../styles/Colors';
import InputField from '../../components/inputs/InputField';
import RoundedButton from '../../components/buttons/RoundedButton';
import Loader from '../../components/loader';
import { getUser } from '../../services/auth';

class ReceberCompras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            compra: {},
            user: {},
            editable: [],
            filter: false,
        }
    }

    static navigationOptions = () => {
        return {
            headerTitle: (
                <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Receber Compra</Text>
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

    getCompra = async (compra) => {
        if (this.props.navigation.state.params !== undefined && this.props.navigation.state.params.getByQrcode) {
            this.setState({ filter: true });
        }
        await getUser().then(user =>
            this.setState({ user: JSON.parse(user), compra: JSON.parse(JSON.stringify(compra)), editable: JSON.parse(JSON.stringify(compra.produtos)).filter(produto => produto.totalEntrega !== produto.quantidade) }));
    }

    //Responsavel por receber os produtos
    receberProduto = (compras) => {
        const produtosCotacaoAtualizados = compras.produtos.filter(compra => compra.totalRecebido != undefined && compra.totalRecebido > 0);
        if (produtosCotacaoAtualizados.length > 0) {
            const comprasAtualizadas = {
                ...compras,
                produtos: [...produtosCotacaoAtualizados]
            }
            this.props.receberCompra(comprasAtualizadas);
        } else {
            Alert.alert(
                'Atenção, aviso importante!',
                `Nenhum valor foi preenchido no campo de total recebido!!`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    //Responsavel por receber todos produtos de uma só vez
    receberTodos = (compras) => {
        const { user } = this.state;
        const comprasRecebidas = {
            ...compras,
            produtos: [
                ...compras.produtos.filter(produto => produto.totalEntrega < produto.quantidade)
                    .map(produto => {
                        produto.totalRecebido = produto.quantidade - produto.totalEntrega;
                        produto.idFuncionario = user.idFuncionario;
                        produto.situacaoProduto = 2;
                        return produto;
                    })
            ]
        }
        Alert.alert(
            'Atenção, aviso importante.',
            `Tem certeza que quer receber todos os produtos ?`,
            [
                { text: 'Cancel', onPress: () => null },
                { text: 'OK', onPress: () => this.props.receberCompra(comprasRecebidas) },
            ],
            { cancelable: false }
        )
    }

    //Responsavel por validar se a quantidade nao esta ultrapassando a quantidade comprada
    handledInput = (disable, item) => {
        this.setState({ disabled: disable }, _ => {
            if (disable) {
                Alert.alert(
                    'Ocorreu um erro',
                    `A quantidade recebida do produto ${item.nomeProduto} está sendo maior que a quantidade comprada!`,
                    [
                        { text: 'Cancel', onPress: () => null },
                        { text: 'OK', onPress: () => null },
                    ],
                    { cancelable: false }
                )
            }
        });
    }

    render() {
        const { disabled, compra, user, editable, filter } = this.state;
        const { loading } = this.props.data;
        const recebeuTudo = editable.length === 0;
        return (
            <View style={styles.wrapper}>
                <View style={styles.containerInfo}>
                    <View style={styles.info}>
                        <Text style={styles.label}>Fornecedor:</Text>
                        <Text style={styles.txtInfo}>{compra.fantasia}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Código da Compra:</Text>
                        <Text style={styles.txtInfo}>{compra.idCotacao}</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.label}>Data Compra:</Text>
                        <Text style={styles.txtInfo}>{compra.dtRegistro}</Text>
                    </View>
                    {filter
                        ?
                        null
                        :
                        <View>
                            <TouchableOpacity
                                disabled={recebeuTudo}
                                onPress={() => this.receberTodos(compra)}
                                style={[styles.btn, { backgroundColor: recebeuTudo ? Colors.green : Colors.secondary }]}
                                activeOpacity={0.7}>
                                {recebeuTudo
                                    ?
                                    <Text style={styles.txtBtn}>Todos já foram recebidos!</Text>
                                    :
                                    <Text style={styles.txtBtn}>Receber Tudo</Text>
                                }
                            </TouchableOpacity>
                        </View>
                    }
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
                                                <Text>Nome:</Text>
                                                <Text style={styles.txtInfo}>{item.nomeProduto}</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text>Quantidade Comprada:</Text>
                                                <Text style={styles.txtInfo}>{parseFloat(item.quantidade).toFixed(0)}</Text>
                                            </View>
                                            <View style={styles.info}>
                                                <Text>Total Recebido:</Text>
                                                <Text style={styles.txtInfo}>{parseFloat(item.totalEntrega).toFixed(0)}</Text>
                                            </View>
                                            <View style={styles.info}>
                                                {item.quantidade === item.totalEntrega
                                                    ?
                                                    <View style={styles.containerSuccess}>
                                                        <Text style={styles.txtSuccess}>Recebido</Text>
                                                    </View>
                                                    :
                                                    <InputField
                                                        labelText="Total Recebido"
                                                        labelTextSize={16}
                                                        labelColor={Colors.secondary}
                                                        textColor={Colors.regular}
                                                        borderBottomColor={Colors.secondary}
                                                        inputType="numeric"
                                                        customStyle={{ marginBottom: 30 }}
                                                        onChangeText={(quantidade) => {
                                                            const quantidadeAtualizada = parseFloat(quantidade.toString().replace(',', '.'));
                                                            const totalAtualizada = parseFloat(item.totalEntrega.toString().replace(',', '.'));
                                                            const quantidadeComprada = parseFloat(item.quantidade.toString().replace(',', '.'));
                                                            if (quantidade) {
                                                                if ((quantidadeAtualizada + totalAtualizada) > quantidadeComprada) {
                                                                    this.handledInput(true, item);
                                                                } else {
                                                                    this.handledInput(false, item);
                                                                    item.totalRecebido = quantidadeAtualizada;
                                                                    item.situacaoProduto = 2;
                                                                    item.idFuncionario = user.idFuncionario;
                                                                }
                                                            } else {
                                                                item.totalRecebido = 0;
                                                            }
                                                        }}
                                                        showCheckmark={false}
                                                        autoCapitalize="none"
                                                    />
                                                }
                                            </View>
                                        </View>
                                    )
                                }}>
                            </FlatList>
                            {recebeuTudo
                                ?
                                null
                                :
                                <View style={styles.containerBtn}>
                                    <RoundedButton
                                        text="Receber Produtos"
                                        textColor={Colors.white}
                                        textAlign="center"
                                        textSize={18}
                                        background={Colors.thirth}
                                        borderColor="transparent"
                                        iconPosition="right"
                                        disabled={disabled}
                                        loading={false}
                                        handleOnPress={() => this.receberProduto(compra)}
                                    />
                                </View>
                            }
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
        margin: 20,
    },
    txtSuccess: {
        fontSize: Fonts.big,
        fontWeight: '900',
        color: Colors.white,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: Fonts.medium,
        color: Colors.secondary,
    },
    txtInfo: {
        fontSize: Fonts.big,
        color: Colors.regular,
        paddingLeft: 6,
    },
    btn: {
        backgroundColor: Colors.secondary,
        padding: 5,
        marginTop: 10,
        marginLeft: 60,
        marginRight: 60,
        borderRadius: 5,
    },
    txtBtn: {
        fontSize: Fonts.big,
        fontWeight: '900',
        color: Colors.white,
        textAlign: 'center',
    },
    inputField: {
        borderBottomWidth: 1,
        paddingTop: 5,
        color: Colors.regular,
        borderBottomColor: 'transparent',
    }
})

const mapStatToProps = state => ({
    data: state.compras
});

const mapDispatchToProps = dispatch => bindActionCreators(ComprasActions, dispatch);

export default connect(mapStatToProps, mapDispatchToProps)(ReceberCompras);