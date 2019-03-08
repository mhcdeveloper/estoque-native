import { Alert, AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import ProdutosActions from '../ducks/produtos';
import { API_LOJA } from '../../helpers/constants';

//Responsavel por ler o qrCode e buscar o produto pelo id
export function* getQrcode(qrCode) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { codigoProduto } = qrCode;
        const request = yield call(axios.post, `${url}/api/produtos/filtro/buscar`, { busca: codigoProduto });
        yield put(ProdutosActions.getProdutoByIdSuccess(request.data.result, codigoProduto));
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ProdutosActions.handleError());
    }
}

//Responsavel por buscar os produtos
export function* getProdutos() {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const request = yield call(axios.post, `${url}/api/produtos/listarApp`, { limit: "300", offset: "0" });
        yield put(ProdutosActions.getProdutosSuccess(request.data.result));
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ProdutosActions.handleError());
    }
}

//Responsavel por buscar o produto pelo id
export function* getProdutoById(codigo) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const request = yield call(axios.post, `${url}/api/produtos/filtro/buscar`, { busca: codigo.idProduto });
        yield put(ProdutosActions.getProdutoByIdSuccess(request.data.result));
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ProdutosActions.handleError());
    }
}

//Responsavel por colocar o produto pra producao
export function* getProducao(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { produto } = data;
        const request = yield call(axios.post, `${url}/api/produtos/movimentacao`, produto);
        if (request) {
            produtoAtualizado = yield call(axios.post, `${url}/api/produtos/filtro/buscar`, { busca: produto.idProduto });
            if (produtoAtualizado) {
                yield call(Alert.alert, 'Operação realizada com sucesso!', request.data.msg ? request.data.msg : 'Produto movimentado',
                    [
                        { text: 'Ok', style: 'default' }
                    ]);
                yield put(ProdutosActions.getProdutoByIdSuccess(produtoAtualizado.data.result));
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ProdutosActions.handleError());
    }
}