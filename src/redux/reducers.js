// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
//multilanguages
import { i18nextReducer } from 'i18next-redux-languagedetector';

export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    i18next: i18nextReducer,
});
