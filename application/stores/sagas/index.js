import { all, takeEvery, spawn } from 'redux-saga/effects';
import { watchAlertChannel } from 'redux-saga-rn-alert';
import { addUser } from './auth';
import { AuthTypes } from '../ducks/auth';
import { ProdutosTypes } from '../ducks/produtos';
import { ComprasTypes } from '../ducks/compras';
import { FornecedoresTypes } from '../ducks/fornecedores';
import { FechamentosTypes } from '../ducks/fechamentos';
import { StoriesTypes } from '../ducks/stories';
import { AvisosTypes } from '../ducks/avisos';
import { getQrcode, getProdutoById, getProducao, getProdutos } from './produtos';
import { getCompras, receberCompra, getEstoqueMassa, filterCompraByProduto, enviarCompra, removeCompra } from './compras';
import { setComprovante, enviarFechamento } from './fechamentos';
import { getFornecedores } from './fornecedores';
import { getAvisos } from './avisos';
import { enviarStorie, setStorie, getStoriesByLoja, removeStoreAtivo } from './stories';

export default function* rootSaga() {
    yield all([
        spawn(watchAlertChannel),
        takeEvery(AuthTypes.LOGIN_AUTH, addUser),
        takeEvery(ProdutosTypes.GET_QRCODE, getQrcode),
        takeEvery(ProdutosTypes.GET_PRODUTO_BY_ID, getProdutoById),
        takeEvery(ProdutosTypes.GET_PRODUCAO, getProducao),
        takeEvery(ComprasTypes.GET_COMPRAS, getCompras),
        takeEvery(ComprasTypes.RECEBER_COMPRA, receberCompra),
        takeEvery(ComprasTypes.GET_ESTOQUE_MASSA, getEstoqueMassa),
        takeEvery(ComprasTypes.GET_COMPRAS_POR_PRODUTO, filterCompraByProduto),
        takeEvery(ComprasTypes.ENVIAR_COMPRA, enviarCompra),
        takeEvery(ComprasTypes.REMOVE_COMPRA, removeCompra),
        takeEvery(ProdutosTypes.GET_PRODUTOS, getProdutos),
        takeEvery(FornecedoresTypes.GET_FORNECEDORES, getFornecedores),
        takeEvery(FechamentosTypes.SET_COMPROVANTE, setComprovante),
        takeEvery(FechamentosTypes.ENVIAR_FECHAMENTO, enviarFechamento),
        takeEvery(AvisosTypes.GET_AVISOS, getAvisos),
        takeEvery(StoriesTypes.SET_STORIE, setStorie),
        takeEvery(StoriesTypes.GET_STORIES, getStoriesByLoja),
        takeEvery(StoriesTypes.REMOVE_STORIE_ATIVO, removeStoreAtivo),
        takeEvery(StoriesTypes.ENVIAR_STORIE, enviarStorie),
    ]);
}