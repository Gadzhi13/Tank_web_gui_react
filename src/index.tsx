import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App/App'
import * as serviceWorker from './serviceWorker'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createStore, Store } from 'redux'
import rootReducer from './reducers/root'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

let store: Store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
