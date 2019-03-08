import { createActions, createReducer } from 'reduxsauce';
import Imutable from 'seamless-immutable';

//Criando as actions types
const { Types, Creators } = createActions({
    getStories: ['loja'],
    getStoriesSuccess: ['storiesList'],
    setStorie: ['storie'],
    setStorieSuccess: ['storie'],
    removeStorie: ['storie'],
    removeStorieAtivo: ['storie'],
    enviarStorie: ['storie'],
    enviarStorieSuccess: [],
    handleError: [],
});

export const StoriesTypes = Types;
export default Creators;

//INITIAL_STATE
export const INITIAL_STATE = Imutable({
    stories: [],
    storiesList: [],
    loading: false,
});

//CRIANDO OS REDUCERS
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_STORIES]: state => state.merge({ loading: true }),    
    [Types.GET_STORIES_SUCCESS]: (state, { storiesList }) => state.merge({ loading: false, storiesList, stories: [] }),    
    [Types.SET_STORIE_SUCCESS]: (state, { storie }) => state.update("stories", stories => [...stories, storie]),
    [Types.REMOVE_STORIE]: (state, { storie }) => state.merge({ stories: state.stories.filter(item => item !== storie)}),
    [Types.ENVIAR_STORIE]: state => state.merge({ loading: true }),    
    [Types.REMOVE_STORIE_ATIVO]: state => state.merge({ loading: true }),    
    [Types.ENVIAR_STORIE_SUCCESS]: state => state.merge({ loading: false, stories: [] }),    
    [Types.HANDLE_ERROR]: state => state.merge({ loading: false }),    
});