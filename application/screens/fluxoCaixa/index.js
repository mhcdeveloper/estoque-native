import React, { Component } from 'react';
import { View, ScrollView, Text, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loader from '../../components/loader';
import styles from './styles';
import Colors from '../../styles/Colors';
import Fonts from '../../styles/Fonts';
import Select from '../../components/select';
import RoundedButton from '../../components/buttons/RoundedButton';
import InputField from '../../components/inputs/InputField';
import FechamentosActions from '../../stores/ducks/fechamentos';
import ComprovanteItem from './ComprovanteItem';
import { getUser } from '../../services/auth';

const turnos = [
    { id: 1, label: "Manha" },
    { id: 2, label: "Tarde" },
    { id: 3, label: "Noite" },
]

const modelos = [
    { id: 1, label: "Modelo 1" },
    { id: 2, label: "Modelo 2" },
    { id: 3, label: "Modelo 3" },
]

class FluxoCaixa extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modelo: null,
            turno: null,
            dinheiro: '',
            cartaoDebito: '',
            cartaoCredito: '',
            sobras: '',
            faltas: '',
            vales: '',
            observacao: '',
            dtFechamento: '',
            user: {},
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: (
                <View style={{ flex: 1, alignItems: Platform.OS === 'ios' ? 'center' : 'flex-end', justifyContent: 'center', }}>
                    <Text style={{ fontSize: 26, fontWeight: '600', color: Colors.thirth }}>Fluxo de Caixa</Text>
                </View>
            )
        };
    };

    async componentDidMount() {
        await getUser().then(user => this.setState({ user: JSON.parse(user) }));
    }

    enviarFechamento = () => {
        const {
            modelo,
            turno,
            dtFechamento,
            dinheiro,
            cartaoDebito,
            cartaoCredito,
            sobras,
            faltas,
            vales,
            observacao,
            user
        } = this.state;
        const { enviarFechamento, navigation } = this.props;
        const { comprovantes } = this.props.fechamentos;
        if (modelo && turno && dinheiro !== '' && cartaoDebito !== '' && cartaoCredito !== '' && sobras !== '' && faltas !== '' && vales !== '' && observacao !== '' && dtFechamento !== '') {
            if (comprovantes.length > 0) {
                const data = {
                    dinheiro,
                    cartaoDebito,
                    cartaoCredito,
                    sobras,
                    faltas,
                    vales,
                    observacao: observacao,
                    turno: turno,
                    modelo: modelo,
                    dtFechamento: dtFechamento,
                    comprovantes: JSON.parse(JSON.stringify(comprovantes)),
                    idFuncionario: user.idFuncionario
                }
                enviarFechamento(data, navigation)
            } else {
                Alert.alert(
                    'Ocorreu um erro.',
                    `É necessário pelo menos um comprovante!`,
                    [
                        { text: 'Cancel', onPress: () => null },
                        { text: 'OK', onPress: () => null },
                    ],
                    { cancelable: false }
                )
            }
        } else {
            Alert.alert(
                'Ocorreu um erro.',
                `Verifique se todos os campos foram preenchidos!`,
                [
                    { text: 'Cancel', onPress: () => null },
                    { text: 'OK', onPress: () => null },
                ],
                { cancelable: false }
            )
        }
    }

    removeComprovante = (item) => {
        this.props.removeComprovante(item);
    }

    render() {
        const {
            modelo,
            turno,
            dtFechamento,
            dinheiro,
            cartaoDebito,
            cartaoCredito,
            sobras,
            faltas,
            vales,
            observacao
        } = this.state;
        const { navigation } = this.props;
        const { comprovantes, loading } = this.props.fechamentos;
        return (
            <View style={styles.wrapper}>
                {loading
                    ?
                    <Loader />
                    :
                    <View style={styles.wrapper}>
                        <ScrollView style={styles.containerInput}>
                            <View style={styles.container}>
                                <Text style={[styles.label, { color: modelo ? Colors.thirth : Colors.lightRed }]}>PDV</Text>
                                <Select
                                    turno={true}
                                    color={true}
                                    value={modelo}
                                    tipo='turno'
                                    array={modelos}
                                    setSelectChange={(modelo) => this.setState({ modelo })}
                                    label="Selecione o PDV" />
                            </View>
                            <View style={styles.container}>
                                <Text style={[styles.label, { color: turno ? Colors.thirth : Colors.lightRed }]}>Turno</Text>
                                <Select
                                    turno={true}
                                    color={true}
                                    value={turno}
                                    tipo='turno'
                                    array={turnos}
                                    setSelectChange={(turno) => this.setState({ turno })}
                                    label="Selecione o Turno" />
                            </View>
                            <InputField
                                labelText="Total Dinheiro"
                                labelTextSize={16}
                                labelColor={dinheiro !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={dinheiro !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(dinheiro) => {
                                    const dinheiroAtualizada = parseFloat(dinheiro.toString().replace(',', '.'));
                                    if (dinheiro) {
                                        this.setState({ dinheiro: dinheiroAtualizada });
                                    } else {
                                        this.setState({ dinheiro: '' });
                                    }
                                }}
                                showCheckmark={dinheiro !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Cartão Debito"
                                labelTextSize={16}
                                labelColor={cartaoDebito !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={cartaoDebito !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(cartaoDebito) => {
                                    const cartaoDebitoAtualizada = parseFloat(cartaoDebito.toString().replace(',', '.'));
                                    if (cartaoDebito) {
                                        this.setState({ cartaoDebito: cartaoDebitoAtualizada });
                                    } else {
                                        this.setState({ cartaoDebito: '' });
                                    }
                                }}
                                showCheckmark={cartaoDebito !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Cartão Credito"
                                labelTextSize={16}
                                labelColor={cartaoCredito !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={cartaoCredito !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(cartaoCredito) => {
                                    const cartaoCreditoAtualizada = parseFloat(cartaoCredito.toString().replace(',', '.'));
                                    if (cartaoCredito) {
                                        this.setState({ cartaoCredito: cartaoCreditoAtualizada });
                                    } else {
                                        this.setState({ cartaoCredito: '' });
                                    }
                                }}
                                showCheckmark={cartaoCredito !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Total de Sobras"
                                labelTextSize={16}
                                labelColor={sobras !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={sobras !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(sobras) => {
                                    const sobrasAtualizada = parseFloat(sobras.toString().replace(',', '.'));
                                    if (sobras) {
                                        this.setState({ sobras: sobrasAtualizada });
                                    } else {
                                        this.setState({ sobras: '' });
                                    }
                                }}
                                showCheckmark={sobras !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Total de Faltas"
                                labelTextSize={16}
                                labelColor={faltas !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={faltas !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(faltas) => {
                                    const faltasAtualizada = parseFloat(faltas.toString().replace(',', '.'));
                                    if (faltas) {
                                        this.setState({ faltas: faltasAtualizada });
                                    } else {
                                        this.setState({ faltas: '' });
                                    }
                                }}
                                showCheckmark={faltas !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Vales"
                                labelTextSize={16}
                                labelColor={vales !== '' ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={vales !== '' ? Colors.thirth : Colors.lightRed}
                                inputType="numeric"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(vales) => {
                                    const valesAtualizada = parseFloat(vales.toString().replace(',', '.'));
                                    if (vales) {
                                        this.setState({ vales: valesAtualizada });
                                    } else {
                                        this.setState({ vales: '' });
                                    }
                                }}
                                showCheckmark={vales !== ''}
                                autoCapitalize="none"
                            />
                            <InputField
                                labelText="Observação"
                                labelTextSize={16}
                                labelColor={observacao ? Colors.thirth : Colors.lightRed}
                                textColor={Colors.regular}
                                borderBottomColor={observacao ? Colors.thirth : Colors.lightRed}
                                inputType="text"
                                customStyle={{ marginBottom: 20 }}
                                onChangeText={(observacao) => {
                                    if (observacao) {
                                        this.setState({ observacao });
                                    } else {
                                        this.setState({ observacao: '' });
                                    }
                                }}
                                showCheckmark={observacao != ''}
                                autoCapitalize="none"
                            />
                            <View style={styles.container}>
                                <Text style={[styles.label, { color: dtFechamento ? Colors.thirth : Colors.lightRed }]}>Data do Fechamento</Text>
                                <DatePicker
                                    style={{ width: '50%' }}
                                    date={dtFechamento}
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
                                            color: Colors.regular,
                                            fontSize: Fonts.big,
                                            fontWeight: '400',
                                        }
                                    }}
                                    onDateChange={(dtFechamento) => this.setState({ dtFechamento })}
                                />
                            </View>
                            <View style={styles.container}>
                                <Text style={[styles.label, { color: comprovantes.length > 0 ? Colors.thirth : Colors.lightRed }]}>Comprovantes</Text>
                                <View>
                                    {comprovantes.length > 0
                                        ?
                                        comprovantes.map((comprovante, index) => (
                                            <ComprovanteItem
                                                key={index}
                                                item={comprovante}
                                                remove={this.removeComprovante.bind(this)}
                                            />
                                        ))
                                        :
                                        <Text>Nenhum comprovante adicionado</Text>
                                    }
                                </View>
                            </View>
                        </ScrollView>
                        <View style={[styles.containerInput, { marginTop: 10 }]}>
                            <RoundedButton
                                text="Comprovante"
                                textColor={Colors.white}
                                textAlign="center"
                                textSize={18}
                                background={Colors.thirth}
                                borderColor="transparent"
                                iconPosition="right"
                                disabled={false}
                                loading={false}
                                handleOnPress={() => navigation.navigate('Comprovante')}
                            />
                            <RoundedButton
                                text="Enviar Fechamento"
                                textColor={Colors.white}
                                textAlign="center"
                                textSize={18}
                                background={Colors.thirth}
                                borderColor="transparent"
                                iconPosition="right"
                                disabled={false}
                                loading={false}
                                handleOnPress={() => this.enviarFechamento()}
                            />
                        </View>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    fechamentos: state.fechamentos,
});

const mapDispatchToProps = dispatch => bindActionCreators(FechamentosActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FluxoCaixa);