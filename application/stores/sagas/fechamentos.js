import { Alert, AsyncStorage } from 'react-native';
import { call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import FechamentosActions from '../ducks/fechamentos';
import { API_LOJA } from '../../helpers/constants';

//Responsavel por buscar as compras
export function* setComprovante(data) {
    try {
        const { comprovante } = data;
        if (comprovante) {
            yield put(FechamentosActions.setComprovanteSuccess(comprovante))
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(FechamentosActions.handleError());
    }
}

//Responsavel por enviar os fechamento para o servidor
export function* enviarFechamento(fechamentos) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { fechamento, navigation } = fechamentos;
        const { comprovantes } = fechamento;
        const request = yield call(axios.post, `${url}/api/fluxocaixa/inserir`, fechamento);
        if (request) {
            const fluxo = request.data.result;
            yield all(comprovantes.map((comprovante, index) => {
                let item = new FormData();
                item.append('createFluxo', true);
                item.append('idFluxo', fluxo.idFluxo);
                item.append('turno', fluxo.turno);
                item.append('modelo', fluxo.modelo);
                item.append('dinheiro', fluxo.dinheiro);
                item.append('cartaoDebito', fluxo.cartaoDebito);
                item.append('cartaoCredito', fluxo.cartaoCredito);
                item.append('sobras', fluxo.sobras);
                item.append('faltas', fluxo.faltas);
                item.append('vales', fluxo.vales);
                item.append('dtFechamento', fluxo.dtFechamento);
                item.append('observacao', fluxo.observacao);
                item.append('idFuncionario', fluxo.idFuncionario);
                item.append(`${index}`, { uri: comprovante.img, name: 'recibo.jpg', type: "image/jpg" });
                item.append('comprovantes', JSON.stringify(comprovantes));

                let size = (comprovantes.length - 1) === index;
                return call(enviarComprovante, { item, size, navigation });
            }))
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Não foi possivel salvar o fechamento, por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(FechamentosActions.handleError());
    }
}

//Responsavel por enviar os comprovantes do fechamento
function* enviarComprovante(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const requestComprovante = yield call(axios.post, `${url}/api/fluxocaixa/editar`, data.item);
        if (requestComprovante) {
            if (data.size) {
                yield call(Alert.alert, 'Operação realizada', 'O fechamento foi inserido com sucesso!',
                    [
                        { text: 'Ok', style: 'default', onPress: () => data.navigation.goBack() }
                    ]);
                yield put(FechamentosActions.enviarFechamentoSuccess())
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Não foi possivel adicionar o comprovante, por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(FechamentosActions.handleError());
    }
}