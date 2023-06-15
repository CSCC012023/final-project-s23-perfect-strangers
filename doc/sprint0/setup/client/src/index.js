import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from './redux/store';          // import global state
import { Provider } from 'react-redux';     // import provider

import "bootstrap/dist/css/bootstrap.css"; // npm install --save react-bootstrap bootstrap@3


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(                                // provide global state to the app component
    <Provider store={store}>
        <App />
    </Provider>
);
