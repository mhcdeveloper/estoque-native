import { combineReducers } from 'redux';
import { alertReducer } from 'redux-saga-rn-alert';
import { reducer as auth } from './auth';
import { reducer as produtos } from './produtos';
import { reducer as compras } from './compras';
import { reducer as fornecedores } from './fornecedores';
import { reducer as fechamentos } from './fechamentos';
import { reducer as avisos } from './avisos';
import { reducer as stories } from './stories';

export default combineReducers({
    auth,
    produtos,
    compras,
    alertReducer,
    fornecedores,
    fechamentos,
    avisos,
    stories,
})