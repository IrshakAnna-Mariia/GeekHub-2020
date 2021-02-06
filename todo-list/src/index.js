import React from 'react'
import ReactDom from 'react-dom'
import { createStore} from "redux"
import {Provider} from 'react-redux'
import '../css/base.css'
import '../css/index.css'
import './base.js'
import todoListApp, {} from "./store/reducers"
import App from './app'

const store = createStore(todoListApp);

render();
store.subscribe(render);

function render () {
    ReactDom.render(
        <Provider store={store}>
            <App
                todoList={store.getState().todoList}
                todoListActive = {store.getState().rootReducers.toolkit.activeTodos}
                todoListCompleted = {store.getState().rootReducers.toolkit.completedTodos}
                todoListCurrent = {store.getState().rootReducers.toolkit.currentTodo}
                count = {store.getState().rootReducers.toolkit.counter}
            />
        </Provider>,
        document.getElementById('root')
    )
}