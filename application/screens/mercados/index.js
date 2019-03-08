import React, { Component } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProdutosActions from '../../stores/ducks/produtos';
import FornecedoresActions from '../../stores/ducks/fornecedores';
import ComprasActions from '../../stores/ducks/compras';
import styles from './styles';
import InputField from '../../components/inputs/InputField';
import ItemMercado from './ItemMercado';
import Colors from '../../styles/Colors';
import RoundedButton from '../../components/buttons/RoundedButton';
import Fonts from '../../styles/Fonts';
import Select from '../../components/select';
import Loader from '../../components/loader';
import { getUser } from '../../services/auth';

class Mercados extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idFornecedor: '',
            idProduto: 0,
            produtos: [],
            dtReserva: '',
            subTotal: '',
            nome: '',
            quantidade: 0,
            user: {}
        }
    }

    async componentDidMount() {
        const { getProdutos, getFornecedores } = this.props;
        const [produtos, fornecedores] = await Promise.all([
            getProdutos(),
            getFornecedores(),
            getUser().then(user =>
                this.setState({ user: JSON.parse(user) }))
        ]);
    }

    setFornecedor(idFornecedor) {
        this.setState({ idFornecedor });
    }

    setProdutoSelect = (idProduto, itemIndex) => {
        const { produtos } = this.props.produtos;
        this.setState({ nome: produtos[itemIndex].nome, idProduto });
    }

    enviarComprar = async () => {
        const { idFornecedor, dtReserva, produtos, user } = this.state;
        const { enviarCompra, navigation } = this.props;
        if (produtos.length > 0) {
            const sum = (t, v) => t + v;
            let valorTotal = produtos.map(item => {
                if (item.subTotal) {
                    return item.subTotal;
                } else {
                    return 0;
                }
            }).reduce(sum);
            const compra = {
                idFuncionario: user.idFuncionario,
                idFornecedor: idFornecedor,
                dtReserva: dtReserva,
                situacaoCotacao: 1,
                subTotal: valorTotal.toFixed(2),
                produtos,
            }
            await enviarCompra(compra);
            this.setState({
                idFornecedor: '',
                idProduto: 0,
                dtReserva: '',
                produtos: [],
                subTotal: '',
                quantidade: 0,
            });
        } else {
            Alert.alert(
                'Ocorreu um erro.',
                `É necessario pelo meno um produto na lista da compra`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    adicionarCarrinho = () => {
        const { idProduto, quantidade, subTotal, produtos, nome } = this.state;
        const produtosAtualizado = produtos;
        if (quantidade > 0 && subTotal > 0 && idProduto > 0) {
            const valorUnitario = ((subTotal / quantidade).toFixed(5));
            const produtoCarrinho = {
                nome,
                idProduto,
                quantidade,
                subTotal,
                valorUnitario
            }
            produtosAtualizado.push(produtoCarrinho);
            this.setState({ produtos: produtosAtualizado });
        } else {
            Alert.alert(
                'Ocorreu um erro.',
                `Os campos obrigatórios estão em branco.`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    handleRemove = (produto, index) => {
        const { produtos } = this.state;
        const produtosAtualizado = produtos;
        produtosAtualizado.splice(index, 1);
        Alert.alert(
            'Confirmação da ação.',
            `Deseja remover o produto ${produto.nome} da lista da compra`,
            [
                { text: 'Cancel', onPress: () => null },
                { text: 'OK', onPress: () => this.setState({ produtos: produtosAtualizado }) },
            ],
            { cancelable: false }
        )
    }

    render() {
        const { idFornecedor, dtReserva, idProduto } = this.state;
        const { produtos } = this.props.produtos;
        const { loading } = this.props.compras;
        const { fornecedores } = this.props.fornecedores;
        return (
            <View style={styles.wrapper}>
                {loading
                    ?
                    <Loader />
                    :
                    produtos.length > 0 && fornecedores.length > 0
                        ?
                        <View>
                            <ScrollView 
                                style={[styles.containerScroll, { backgroundColor: Colors.secondary, height: '60%' }]}>
                                <View style={[styles.container, styles.containerSecondary]}>
                                    <Text style={[styles.label, { color: Colors.primary }]}>Fornecedores</Text>
                                    <Select
                                        value={idFornecedor}
                                        color={true}
                                        tipo='fornecedor'
                                        array={fornecedores}
                                        setSelectChange={this.setFornecedor.bind(this)}
                                        label="Selecione o fornecedor" />
                                </View>
                                <View style={[styles.container, styles.containerSecondary]}>
                                    <Text style={[styles.label, { color: Colors.primary }]}>Data da Compra</Text>
                                    <DatePicker
                                        style={{ width: '50%' }}
                                        date={dtReserva}
                                        mode="date"
                                        placeholder="Data da Compra"
                                        format="DD/MM/YYYY"
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{
                                            dateIcon: {
                                                position: 'absolute',
                                                left: 0,
                                                top: 4,
                                                marginLeft: 0
                                            },
                                            dateText: {
                                                color: Colors.white,
                                                fontSize: Fonts.big,
                                                fontWeight: '400',
                                            }
                                        }}
                                        onDateChange={(dtReserva) => this.setState({ dtReserva })}
                                    />
                                </View>
                                <View style={styles.wrapper}>
                                    <Text style={[styles.label, { color: Colors.primary, textAlign: 'center' }]}>Lista da Compra</Text>
                                    {this.state.produtos.length > 0
                                        ?
                                        this.state.produtos.map((produto, index) => (
                                            <ItemMercado
                                                key={index}
                                                position={index}
                                                produto={produto}
                                                handleRemove={this.handleRemove.bind(this)} />
                                        ))
                                        :
                                        <Text style={[styles.label, { color: Colors.lighter, fontSize: 16, textAlign: 'center' }]}>Nenhum produto no carrinho</Text>
                                    }
                                </View>
                                <View style={styles.containerBtn}>
                                    <RoundedButton
                                        text="Enviar Compra"
                                        textColor={Colors.thirth}
                                        textAlign="center"
                                        textSize={18}
                                        background={Colors.primary}
                                        borderColor="transparent"
                                        iconPosition="right"
                                        disabled={false}
                                        loading={false}
                                        handleOnPress={() => this.enviarComprar()}
                                    />
                                </View>
                            </ScrollView>
                            <ScrollView style={[styles.containerScroll, { height: '40%' }]}>
                                <View style={styles.container}>
                                    <Text style={[styles.label, { paddingTop: 15 }]}>Produtos</Text>
                                    <Select
                                        value={idProduto}
                                        array={produtos}
                                        setSelectChange={this.setProdutoSelect}
                                        color={true}
                                        label="Selecione o produto" />
                                    <InputField
                                        labelText="Quantidade"
                                        labelTextSize={16}
                                        labelColor={Colors.secondary}
                                        textColor={Colors.regular}
                                        borderBottomColor={Colors.secondary}
                                        inputType="numeric"
                                        customStyle={{ marginBottom: 30 }}
                                        onChangeText={(quantidade) => {
                                            const quantidadeAtualizada = parseFloat(quantidade.toString().replace(',', '.'));
                                            if (quantidade) {
                                                this.setState({ quantidade: quantidadeAtualizada });
                                            } else {
                                                this.setState({ quantidade: 0 });
                                            }
                                        }}
                                        showCheckmark={false}
                                        autoCapitalize="none"
                                    />
                                    <InputField
                                        labelText="Valor Total"
                                        labelTextSize={16}
                                        labelColor={Colors.secondary}
                                        textColor={Colors.regular}
                                        borderBottomColor={Colors.secondary}
                                        inputType="numeric"
                                        customStyle={{ marginBottom: 30 }}
                                        onChangeText={(subTotal) => {
                                            const subTotalAtualizada = parseFloat(subTotal.toString().replace(',', '.'));
                                            if (subTotal) {
                                                this.setState({ subTotal: subTotalAtualizada });
                                            } else {
                                                this.setState({ subTotal: 0 });
                                            }
                                        }}
                                        showCheckmark={false}
                                        autoCapitalize="none"
                                    />
                                    <View style={styles.containerBtn}>
                                        <RoundedButton
                                            text="Adicionar"
                                            textColor={Colors.white}
                                            textAlign="center"
                                            textSize={18}
                                            background={Colors.thirth}
                                            borderColor="transparent"
                                            iconPosition="right"
                                            disabled={false}
                                            loading={false}
                                            handleOnPress={() => this.adicionarCarrinho()}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                        :
                        <Loader />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    produtos: state.produtos,
    fornecedores: state.fornecedores,
    compras: state.compras,
});

const mapDispathToProps = dispatch => bindActionCreators({ ...ProdutosActions, ...FornecedoresActions, ...ComprasActions }, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Mercados);