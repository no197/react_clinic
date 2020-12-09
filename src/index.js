import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import configureI18n from './i18n';
import { languageChange } from 'i18next-redux-languagedetector';
import { I18nextProvider } from 'react-i18next';

const i18nextConfig = {
    language: null,
    // TODO: 11/28/20  multilanguages
    whitelist: ['en', 'vi'],
    fallbackLng: 'vi',
    ns: ['common'],
    defaultNS: 'common',
};

const store = configureStore({
    i18next: i18nextConfig,
});

const i18n = configureI18n({
    i18nextConfig,
    redux: {
        lookupRedux: function () {
            return store.getState().i18next;
        },
        cacheUserLanguageRedux: function (language) {
            store.dispatch(languageChange(language));
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
