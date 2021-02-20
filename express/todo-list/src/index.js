import React from 'react'
import ReactDom from 'react-dom'
import { createStore,applyMiddleware} from "redux"
import {Provider} from 'react-redux'
import '../css/base.css'
import '../css/index.css'
import './base.js'
import todoListApp, {} from "./store/reducers"
import App from './app'
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import {watchSaga} from "./store/sagas";
import {setTodosForAll, counterCompletedTodo, setTodos} from "./store/actions";

const saga = createSagaMiddleware();

const store = createStore(todoListApp,applyMiddleware(thunk ,saga));
saga.run(watchSaga);

render();
store.subscribe(render);
store.dispatch(setTodosForAll([]));
store.dispatch(setTodos([]));

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
