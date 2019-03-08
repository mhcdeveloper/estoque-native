import { AsyncStorage } from 'react-native';
import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

// Criando os actions types e creators
const { Types, Creators } = createActions({
    loginAuth: ['matricula', 'senha', 'navigation'],
    loginAuthSuccess: ['user'],
    loginAuthError: [],
    logoutAuth: [],
})

export const AuthTypes = Types;
export default Creators;

//INITIAL STATE
export const INITIAL_STATE = Imutable({
    data: [],
    loading: false,
    token: '',
    user: {},
});

//Criando reducer
export const reducer =  createReducer(INITIAL_STATE, {
    [Types.LOGIN_AUTH]: state => state.merge({ loading: true }),
    [Types.LOGIN_AUTH_SUCCESS]: (state, { user }) => state.merge({ loading: false, token: user.token, user: user }),    
    [Types.LOGIN_AUTH_ERROR]: state => state.merge({ loading: false }),
    [Types.LOGOUT_AUTH]: state => {
        AsyncStorage.clear();
        return state;
    },
})