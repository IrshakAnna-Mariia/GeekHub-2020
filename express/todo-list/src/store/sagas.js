import { call, put, takeLatest, takeLeading, select} from "redux-saga/effects"
import {SET_TODOS, SET_TODOS_FILTER, ADD_TODO, REMOVE_TODO, IS_COMPLETED, IS_EDIT} from "./actions";


export function* watchSaga() {
    yield takeLeading([SET_TODOS, SET_TODOS_FILTER], getResponse);
    yield takeLatest([ADD_TODO,REMOVE_TODO,IS_COMPLETED,IS_EDIT], postResponse);

}

function* getResponse() {
    const payload = yield call(fetchTodos);
    yield put({type:SET_TODOS, payload});
    yield put({type:SET_TODOS_FILTER, payload});
}

function* postResponse(){
    const todos = yield select(state => state.todoList);
    yield fetch("http://localhost:8000/post", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(todos),
    });

}

async function fetchTodos() {
    const response = await fetch("http://localhost:8000/get");
    return await response.json();
}
