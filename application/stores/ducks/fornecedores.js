import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions Types
const { Types, Creators } = createActions({
    getFornecedores: [],
    getFornecedoresSuccess: ['fornecedores'],
    handleError: [],
});

export const FornecedoresTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    fornecedores: [],
    loading: false,
});

//Criando os Reducers
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_FORNECEDORES]: state => state.merge({ loading: true }),
    [Types.GET_FORNECEDORES_SUCCESS]: (state, data) => state.merge({ fornecedores: data.fornecedores, loading: false }),
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false }),
});