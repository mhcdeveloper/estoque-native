import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions types
const { Types, Creators } = createActions({
    getAvisos: [],
    getAvisosSuccess: ['avisos'],
    handleError: [],
});

export const AvisosTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    avisos: [],
    loading: false,    
});

//CRIANDO OS REDUCERS
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_AVISOS]: state => state.merge({ loading: true }),
    [Types.GET_AVISOS_SUCCESS]: (state, data) => state.merge({ avisos: data.avisos, loading: false }),
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false }),    
});