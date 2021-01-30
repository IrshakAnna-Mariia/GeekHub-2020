import React from 'react'
import ReactDom from 'react-dom'
import { createStore} from "redux"
import {Provider} from 'react-redux'
import '../css/base.css'
import '../css/index.css'
import './store/base.js'
import todoListApp, {} from "./store/reducers"
import App from './store/app'
import {addTodo, isCompleted, removeTodo, viewTodos, viewAll, viewActive, viewCompleted, counterCompletedTodo} from "./store/actions";

const store = createStore(todoListApp);

render();
store.subscribe(render);

function render () {

    ReactDom.render(
        <Provider store={store}>
            <App
                onAdd={(e) => {
                    store.dispatch(addTodo(e.target.value));
                    store.dispatch(viewTodos(store.getState().todoList));
                    store.dispatch(counterCompletedTodo(store.getState().todoList));
                }}
                todoList={store.getState().rootReducers.toolkit.currentTodos}
                onRemove={(e) => {
                    store.dispatch(removeTodo(Number(e.target.value)));
                    store.dispatch(viewTodos(store.getState().todoList));
                    store.dispatch(counterCompletedTodo(store.getState().todoList));
                }}
                onCompleted={(e) => {
                    store.dispatch(isCompleted(Number(e.target.value)));
                    store.dispatch(viewTodos(store.getState().todoList));
                    store.dispatch(counterCompletedTodo(store.getState().todoList));
                }}
                onClearCompleted={() => {
                    let arrayCompleted = store.getState().todoList.map((cell, index) => {
                        if (cell.complete === true) {
                            return index
                        }
                    })
                    arrayCompleted.reverse().map((cell) => {
                        if (!(cell === undefined)) {
                            store.dispatch(removeTodo(Number(cell)));
                        }
                    });
                    store.dispatch(viewTodos(store.getState().todoList));
                    store.dispatch(counterCompletedTodo(store.getState().todoList));
                }}
                onAll = {() => {
                    store.dispatch(viewAll(store.getState().todoList));
                }}
                onActive = {() => {
                    store.dispatch(viewActive(store.getState().todoList));
                }}
                onCompletedClick = {() => {
                    store.dispatch(viewCompleted(store.getState().todoList));
                }}
                count = {store.getState().rootReducers.toolkit.counter}
            />
        </Provider>,
        document.getElementById('root')
    )
}
