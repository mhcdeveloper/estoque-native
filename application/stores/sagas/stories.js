import { Alert } from 'react-native';
import { call, put, all } from 'redux-saga/effects';
import axios from 'axios';
import StoriesActions from '../ducks/stories';
import { API_URL_STORIE } from '../../helpers/constants';

//Responsavel por buscar todos os stories por loja
export function* getStoriesByLoja(data) {
    try {
        const request = yield call(axios.post, `${API_URL_STORIE}/stories/listarByLoja`, data);
        if (request) {
            yield put(StoriesActions.getStoriesSuccess(request.data.result));
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(StoriesActions.handleError());
    }
}

//Responsavel por remover o store ativo
export function* removeStoreAtivo(data) {
    try {
        const { storie } = data;
        const request = yield call(axios.post, `${API_URL_STORIE}/stories/deletar`, storie);
        if (request) {
            const newList = yield call(axios.post, `${API_URL_STORIE}/stories/listarByLoja`, storie);
            if (newList) {
                yield call(Alert.alert, 'Operação realizada!', 'A storie do cliente foi removida com sucesso!',
                    [
                        { text: 'Ok', style: 'default' }
                    ]);
                yield put(StoriesActions.getStoriesSuccess(newList.data.result));
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(StoriesActions.handleError());
    }
}

//Responsavel por buscar as compras
export function* setStorie(data) {
    try {
        const { storie } = data;
        if (storie) {
            yield put(StoriesActions.setStorieSuccess(storie))
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(StoriesActions.handleError());
    }
}

//Responsavel por montar os dados para enviar o storie do cliente
export function* enviarStorie(storieCliente) {
    try {
        const { storie } = storieCliente;
        const { stories } = storie;
        yield all(stories.map((item, index) => {
            let data = new FormData();
            data.append('loja', storie.loja);
            data.append('dtRegistro', storie.dtRegistro);
            data.append('idFuncionario', storie.idFuncionario);
            data.append('storie', { uri: item.img, name: 'recibo.jpg', type: "image/jpg" });
            let size = (stories.length - 1) === index;
            return call(enviarStoriesCliente, { data, size, storie });
        }))
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Não foi possivel salvar o fechamento, por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(StoriesActions.handleError());
    }
}

//Responsavel por enviar os stories dos cliente
function* enviarStoriesCliente(item) {
    try {
        const { data, size, storie } = item;
        const request = yield call(axios.post, `${API_URL_STORIE}/stories/cadastrar`, data);
        if (request) {
            if (size) {
                const newList = yield call(axios.post, `${API_URL_STORIE}/stories/listarByLoja`, storie);
                if (newList) {
                    yield call(Alert.alert, 'Operação realizada!', 'A storie do cliente foi inserida com sucesso!',
                        [
                            { text: 'Ok', style: 'default' }
                        ]);
                    yield put(StoriesActions.getStoriesSuccess(newList.data.result));
                }                
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Não foi possivel adicionar o comprovante, por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(StoriesActions.handleError());
    }
}