import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { LOGIN_KEY, API_LOJA } from '../helpers/constants';

export const getUser = () => {
    return user = AsyncStorage.getItem(LOGIN_KEY);
}

export const getApi = () => {
    return api = AsyncStorage.getItem(API_LOJA);
}

export const signOut = (navigation) => {
    AsyncStorage.clear();    
    navigation.reset([NavigationActions.navigate({ routeName: 'SignedOut' })], 0)
}