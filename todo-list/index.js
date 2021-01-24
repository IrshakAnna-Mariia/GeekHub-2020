import React from 'react'
import ReactDom from 'react-dom'
import {createStore} from "redux"
import {Provider} from 'react-redux'
import '../css/base.css'
import '../css/index.css'
import './store/base.js'
import todoListApp from "./store/reducers"
import App from './store/app'
import {addTodo, isCompleted, removeTodo, setFilter, Filters, setCounter} from "./store/actions";

const store = createStore(todoListApp);
const {ALL, ACTIVE, COMPLETED} = Filters;

render();
store.subscribe(render);

function render () {

    ReactDom.render(
        <Provider store={store}>
            <App
                onAdd={(e) => {
                    store.dispatch(addTodo(e.target.value));
                }}
                todoList={store.getState().todoList}
                onRemove={(e) => {
                    store.dispatch(removeTodo(Number(e.target.value)));
                }}
                onCompleted={(e) => {
                    store.dispatch(isCompleted(Number(e.target.value)));
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
                }}
                onViewCompleted = {() => {
                    store.dispatch(setFilter(COMPLETED));
                }}
                counterOfItemLeft = {() => {
                    let counter = 0;
                    store.getState().todoList.map((cell, index) => {
                        if (cell.complete === true) {counter++;}
                    })
                    return counter
                }}
            />
        </Provider>,
        document.getElementById('root')
    )
}