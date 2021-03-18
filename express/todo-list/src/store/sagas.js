import { call, put, takeLatest, takeLeading, select} from "redux-saga/effects"
import {SET_TODOS, SET_TODOS_FILTER, ADD_TODO, REMOVE_TODO, IS_COMPLETED, IS_EDIT, setTodosForAll} from "./actions";
import socket from './socket'
import React from 'react'
import ReactDom from 'react-dom'
import Error from "../components/Error";

export function* watchSaga() {
    yield takeLeading([SET_TODOS, SET_TODOS_FILTER], getResponse);
    yield takeLatest([ADD_TODO], postResponse);
    yield takeLatest([REMOVE_TODO], postResponseRemove);
    yield takeLatest([IS_COMPLETED], postResponseComplete);
}

function* getResponse() {
    try {
        const payload = yield call(fetchTodos);
        yield put({type: SET_TODOS, payload});
        yield put({type: SET_TODOS_FILTER, payload});
    } catch (e) {
        console.log(e)
        ReactDom.render(<Error/>, document.body)
    }
}

function* postResponse(){
    try {
        const todos = yield select(state => state.todoList);
        socket.emit('add_todo', todos);
        yield fetch("/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todos),
        });
    } catch (e) {
        console.log(e)
        ReactDom.render(<Error/>, document.body)
    }
}

function* postResponseRemove(){
    try {
        const todos = yield select(state => state.todoList);
        socket.emit('remove_todo', todos);
        yield fetch("http://localhost:8000/remove", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todos),
        });
    } catch (e) {
        console.log(e)
        ReactDom.render(<Error/>, document.body)
    }
}

function* postResponseComplete(){
    try {
        const todos = yield select(state => state.todoList);
        socket.emit('completed_todo', todos);
        yield fetch("/complete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(todos),
        });
    } catch (e) {
        console.log(e)
        ReactDom.render(<Error/>, document.body)
    }
}

async function fetchTodos() {
    const response = await fetch("/get");
    return response.json();
}
