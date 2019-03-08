import { Alert, AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';

import ComprasActions, { ComprasTypes } from '../ducks/compras';
import { API_LOJA } from '../../helpers/constants';

//Responsavel por buscar as compras
export function* getCompras() {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const request = yield call(axios.post, `${url}/api/cotacoes/listar`, { limit: 50, offset: "0" });
        if (request) {
            yield put(ComprasActions.getComprasSuccess(request.data.result))
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}

//Responsavel por receber as compras
export function* receberCompra(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { compra } = data;
        const request = yield call(axios.post, `${url}/api/cotacoes/receberProduto`, compra);
        if (request) {
            const compraAtualizada = yield call(axios.post, `${url}/api/cotacoes/listarPorId`, { idCotacao: compra.idCotacao });
            if (compraAtualizada) {
                yield call(Alert.alert, 'Operação realizada com sucesso!', request.data.msg ? request.data.msg : 'Produto recebido',
                    [
                        { text: 'Ok', style: 'default' }
                    ]);
                yield put(ComprasActions.receberCompraSuccess(compraAtualizada.data.result));
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}

//Responsavel por pegar produto do estoque massa
export function* getEstoqueMassa(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { compra } = data;
        const request = yield call(axios.post, `${url}/api/produtos/envioProducao`, compra);
        if (request) {
            const compraAtualizada = yield call(axios.post, `${url}/api/cotacoes/listarPorId`, { idCotacao: compra.idCotacao });
            if (compraAtualizada) {
                yield call(Alert.alert, 'Operação realizada com sucesso!', request.data.msg ? request.data.msg : 'Produto movimentado',
                    [
                        { text: 'Ok', style: 'default' }
                    ]);
                yield put(ComprasActions.getEstoqueMassaSuccess(compraAtualizada.data.result));
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}

//Responsavel por filtrar as compras pelo produto
export function* filterCompraByProduto(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const request = yield call(axios.post, `${url}/api/cotacoes/listarPorIdProduto`, { idProduto: data.codigoProduto });
        if (request) {
            yield put(ComprasActions.getComprasSuccess(request.data.result))
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}

//Responsavel por enviar a compra do mercado
export function* enviarCompra(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { compra } = data;
        const request = yield call(axios.post, `${url}/api/cotacoes/inserir`, compra);
        if (request) {
            yield call(Alert.alert, 'Operação realizada com sucesso!', request.data.msg ? request.data.msg : 'Compra inserida.',
                [
                    { text: 'Ok', style: 'default' }
                ]);
            yield put(ComprasActions.enviarCompraSuccess());
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}

//Responsavel por remove a compra do mercado
export function* removeCompra(data) {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const { idCotacao } = data;
        const request = yield call(axios.post, `${url}/api/cotacoes/deletar`, { idCotacao: idCotacao });
        if (request) {
            yield put(ComprasActions.getCompras());
            yield call(Alert.alert, 'Operação realizada com sucesso!', request.data.msg ? request.data.msg : 'Compra removida com sucesso.',
                [
                    { text: 'Ok', style: 'default' }
                ]);            
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(ComprasActions.handleError());
    }
}