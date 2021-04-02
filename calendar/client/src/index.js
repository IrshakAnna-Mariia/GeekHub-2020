import React from 'react'
import ReactDom from 'react-dom'
import App from "./App";
import '../css/index.css'
import { createStore} from "redux"
import {Provider} from 'react-redux'
import EventsApp, {} from "./store/reducers"

export const store = createStore(EventsApp);

render();
store.subscribe(render)


function render () {
    ReactDom.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root')
    )
}
