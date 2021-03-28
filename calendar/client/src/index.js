import React from 'react'
import ReactDom from 'react-dom'
import App from "./App";
import '../css/index.css'
import { createStore,applyMiddleware} from "redux"
import {Provider} from 'react-redux'
import EventsApp, {} from "./store/reducers"
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {watchSaga} from "./store/httpMethods";

export const store = createStore(EventsApp);

render();
store.subscribe(render)


function render () {
    ReactDom.render(
        <Provider store={store}>
            <App
                logger={store.getState().rootReducers.toolkit.logger}
                email={store.getState().rootReducers.toolkit.email}
                events={store.getState().rootReducers.toolkit.events}
                edit={store.getState().rootReducers.toolkit.edit}
            />
        </Provider>,
        document.getElementById('root')
    )
}
