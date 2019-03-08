import { Alert, AsyncStorage } from 'react-native';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import FornecedoresActions from '../ducks/fornecedores';
import { API_LOJA } from '../../helpers/constants';

//Responsavel por buscar os fornecedores
export function* getFornecedores() {
    try {
        const url = yield AsyncStorage.getItem(API_LOJA);
        const request = yield call(axios.post, `${url}/api/fornecedores/listar`, { limit: "300", offset: 0 });
        yield put(FornecedoresActions.getFornecedoresSuccess(request.data.result));
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(FornecedoresActions.handleError());
    }
}