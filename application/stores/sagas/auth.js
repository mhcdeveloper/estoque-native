import { AsyncStorage, Alert } from 'react-native';
import { call, put } from 'redux-saga/effects';
import { apiAuthenticate } from '../../services/api';

import AuthActions from '../ducks/auth';
import { LOGIN_KEY, API_LOJA } from '../../helpers/constants';

const apiLoja = {
    1: process.env.LOJA_IGARAPAVA,
    2: process.env.LOJA_ITUVERAVA,
    3: process.env.LOJA_MIGUELOPOLIS,
    4: process.env.LOJA_ARAMINA,
}

export function* addUser(user) {
    try {
        const response = yield call(apiAuthenticate.post, `/api/autenticar`, user);
        if (response) {
            AsyncStorage.mergeItem(LOGIN_KEY, JSON.stringify(response.data.result));
            AsyncStorage.mergeItem(API_LOJA, apiLoja[response.data.result.loja]);
            yield put(AuthActions.loginAuthSuccess(response.data.result))
            user.navigation.navigate('App')
        }
    } catch (error) {
        yield call(Alert.alert, 'Ocorreu um erro', error.response.data.msg ? error.response.data.msg : 'Por favor entrar em contato com o administrador',
            [
                { text: 'Ok', style: 'default' }
            ]);
        yield put(AuthActions.loginAuthError());
    }
}