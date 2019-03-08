import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions types
const { Types, Creators } = createActions({
    setComprovante: ['comprovante'],
    setComprovanteSuccess: ['comprovante'],
    removeComprovante: ['comprovante'],
    enviarFechamento: ['fechamento', 'navigation'],
    enviarFechamentoSuccess: [],
    handleError: [],
});

export const FechamentosTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    comprovantes: [],
    loading: false,
});

//CRIANDO OS REDUCERS
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_COMPROVANTE_SUCCESS]: (state, { comprovante }) => state.update("comprovantes", comprovantes => [...comprovantes, comprovante]),
    [Types.REMOVE_COMPROVANTE]: (state, { comprovante }) => state.merge({ comprovantes: state.comprovantes.filter(item => item !== comprovante)}),
    [Types.ENVIAR_FECHAMENTO]: state => state.merge({ loading: true }),    
    [Types.ENVIAR_FECHAMENTO_SUCCESS]: state => state.merge({ loading: false, comprovantes: [] }),    
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false }),    
});