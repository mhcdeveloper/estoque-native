import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions types
const { Types, Creators } = createActions({
    getQrcode: ['codigoProduto'],
    getProdutos: [],
    getProdutoById: ['idProduto'],
    getProdutoByIdSuccess: ['produto', 'codigoProduto'],
    getProducao: ['produto'],
    getProducaoSuccess: [],
    getProducaoError: [],
    handleModal: [],
    handleError: [],
    getProdutosSuccess: ['produtos']
});

export const ProdutosTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    codigoProduto: false,
    loading: false,
    produto: {},
    openModal: false,
    msg: '',
    produtos: []
});

//CRIANDO OS REDUCERS
export const reducer = createReducer(INITIAL_STATE, {
    [Types.HANDLE_MODAL]: state => state.merge({ openModal: !state.openModal }),
    [Types.GET_PRODUTO_BY_ID]: state => state.merge({ loading: true }),
    [Types.GET_PRODUTOS]: state => state.merge({ loading: true }),
    [Types.GET_PRODUTO_BY_ID_SUCCESS]: (state, data) => state.merge({ produto: data.produto, loading: false, codigoProduto: data.codigoProduto, openModal: false }),
    [Types.GET_PRODUTOS_SUCCESS]: (state, data) => state.merge({ produtos: data.produtos, loading: false }),
    [Types.GET_PRODUCAO]: state => state.merge({ loading: true }),
    [Types.GET_PRODUCAO_SUCCESS]: state => state.merge({ loading: false, openModal: false }),
    [Types.GET_PRODUCAO_ERROR]: state => state.merge({ loading: false, msg: 'ok' }),
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false, openModal: false }),
});