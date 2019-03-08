import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions types
const { Types, Creators } = createActions({
    getCompras: [],
    getComprasSuccess: ['compras'],
    compraDetalhe: ['compra'],
    receberCompra: ['compra'],
    receberCompraSuccess: ['compra'],
    getEstoqueMassa: ['compra'],
    getEstoqueMassaSuccess: ['compra'],
    getComprasPorProduto: ['codigoProduto'],
    removeCompra: ['idCotacao'],
    removeCompraSuccess: [],
    enviarCompra: ['compra'],
    enviarCompraSuccess: [],
    handleError: [],
});

export const ComprasTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    compras: [],
    loading: false,
    compra: {}
});

//CRIANDO OS REDUCERS
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_COMPRAS]: state => state.merge({ loading: true }),
    [Types.GET_COMPRAS_SUCCESS]: (state, data) => state.merge({ compras: data.compras, loading: false }),
    [Types.COMPRA_DETALHE]: (state, data) =>  state.merge({ compra: data.compra }),    
    [Types.RECEBER_COMPRA]: state => state.merge({ loading: true }),
    [Types.RECEBER_COMPRA_SUCCESS]: (state, data) => state.merge({ loading: false, compra: data.compra }),
    [Types.GET_ESTOQUE_MASSA]: state => state.merge({ loading: true }),
    [Types.GET_ESTOQUE_MASSA_SUCCESS]: (state, data) => state.merge({ loading: false, compra: data.compra }),
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false }),
    [Types.ENVIAR_COMPRA]: state => state.merge({ loading: true }),
    [Types.ENVIAR_COMPRA_SUCCESS]: state => state.merge({ loading: false }),
    [Types.REMOVE_COMPRA]: state => state.merge({ loading: true }),
    [Types.REMOVE_COMPRA_SUCCESS]: state => state.merge({ loading: false }),
});