import React, { Component } from 'react';
import { View, ScrollView, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

import { api } from '../../helpers/constants';
import styles from './styles';
import Colors from '../../styles/Colors';
import RoundedButton from '../../components/buttons/RoundedButton';
import ProdutosActions from '../../stores/ducks/produtos';
import Loader from '../../components/loader';
import FloatButton from '../../components/buttons/FloatButton';
import Modal from '../../components/modal';
import { getUser } from '../../services/auth';

class Produtos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantidadeRetirada: 0,
        }
    }

    retirarProduto = (produto) => {
        const { quantidadeRetirada } = this.state;
        if (quantidadeRetirada <= 0) {
            Alert.alert(
                'Atenção, aviso importante!',
                `A quantidade da retirada tem que ser maior que 0.`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        } else {
            getUser().then(user => {
                const funcionario = JSON.parse(user).idFuncionario;
                const data = {
                    "idFuncionario": funcionario,
                    "idProduto": JSON.stringify(produto.id),
                    "idCotacao": JSON.stringify(produto.idCotacao),
                    "quantidade": quantidadeRetirada,
                    "valorTotal": parseFloat((quantidadeRetirada * +produto.valorUnitario).toFixed(2).replace(",", "."))
                }
                this.props.getProducao(data);
            });
        }
    }

    handleModal = () => {
        this.props.handleModal();
    }

    handleEstoqueMassa = (idProduto) => {
        this.props.navigation.navigate('ComprasFiltradas', { idProduto });
    }

    handleChangeText = (quantidadeRetirada) => {
        this.setState({ quantidadeRetirada });
    }

    renderProduto = (produto) => {
        const { navigation } = this.props;
        if (produto.length === 0) {
            return (
                <View style={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={styles.titleCard}>Nenhum produto scaneado</Text>
                </View>
            )
        } else {
            return (
                <ScrollView style={styles.wrapper}>
                    <View>
                        <Image
                            source={{ uri: `${api}/produtos/${produto.avatarUrl}` }}
                            indicator={ProgressBar}
                            style={styles.image}>
                            <FloatButton
                                produto={produto}
                                navigation={navigation}
                                handleModal={this.handleModal.bind(this)}
                                handleEstoqueMassa={this.handleEstoqueMassa.bind(this)}
                            />
                        </Image>
                    </View>
                    <View style={styles.containerProdutoInfo}>
                        <View style={styles.containerNome}>
                            <Text style={styles.titleCard} >{produto.nome}</Text>
                            <Text style={styles.labelUnidadeMedida}>Gramas</Text>
                        </View>
                        <View style={styles.cardDetail}>
                            <View>
                                <Text style={styles.textDetail}>Quantidade em estoque:</Text>
                                <Text style={styles.textDetail}>Quantidade Massa:</Text>
                                <Text style={styles.textDetail}>Codigo da Compra:</Text>
                            </View>
                            <View>
                                <Text style={styles.textDetail}>{produto.estoque ? parseFloat(produto.estoque).toFixed(0) : produto.estoque}</Text>
                                <Text style={styles.textDetail}>{produto.estoqueMassa ? parseFloat(produto.estoqueMassa).toFixed(0) : produto.estoqueMassa}</Text>
                                <Text style={styles.textDetail}>{produto.idCotacao}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        const { data, navigation } = this.props;
        const { loading, openModal } = this.props.data;
        const produto = data.produto[0] ? data.produto[0] : [];
        return (
            <ScrollView
                contentContainerStyle={[styles.wrapper, { justifyContent: 'center', alignItems: 'center' }]}
                style={styles.wrapper}>
                {loading
                    ?
                    <Loader />
                    :
                    openModal
                        ?
                        <Modal
                            produto={produto}
                            title="Retirada para Produção"
                            label="Quantidade"
                            handleChangeText={this.handleChangeText.bind(this)}
                            handleModal={this.handleModal.bind(this)}
                            onSubmit={this.retirarProduto.bind(this)}
                        />
                        :
                        <View>
                            <RoundedButton
                                text="Leitor QRCode"
                                textColor={Colors.white}
                                textAlign="center"
                                textSize={18}
                                background={Colors.secondary}
                                borderColor="transparent"
                                iconPosition="right"
                                disabled={false}
                                loading={false}
                                handleOnPress={() => navigation.navigate('Scanner')}
                            />
                            {this.renderProduto(produto)}
                        </View>
                }
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    data: state.produtos,
});

const mapDispathToProps = dispatch => bindActionCreators(ProdutosActions, dispatch);

export default connect(mapStateToProps, mapDispathToProps)(Produtos);