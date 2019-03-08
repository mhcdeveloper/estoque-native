import { Alert, AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import AvisosActions from '../ducks/avisos';
import axios from 'axios';
import { API_LOJA } from '../../helpers/constants';

//Responsavel por buscar as compras
export function* getAvisos() {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        if(url) {
            const request = yield call(axios.post, `${url}/api/avisos/listar`, { limit: 300, offset: "0" });
            if (request) {
                yield put(AvisosActions.getAvisosSuccess(request.data.result))
            }
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(AvisosActions.handleError());
    }
}
