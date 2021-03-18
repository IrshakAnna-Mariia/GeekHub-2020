import io from 'socket.io-client';
import {store} from '../index'
import {addTodo, removeWrittenTodo, setTodos, setTodosForAll, writeTodo} from "./actions";

const socket = io();

socket.on('add_todo', (todos) => {
    store.dispatch(setTodosForAll([]));
    store.dispatch(setTodos([]));
})
socket.on('remove_todo', (todos) => {
    store.dispatch(setTodosForAll([]));
    store.dispatch(setTodos([]));
})
socket.on('completed_todo', (todos) => {
    store.dispatch(setTodosForAll([]));
    store.dispatch(setTodos([]));
})
socket.on('write_todo', (todos, addTodo_value, lastTodo_value) => {
    if (addTodo_value === '') {
        store.dispatch(removeWrittenTodo(lastTodo_value))
    } else {
        store.dispatch(writeTodo(lastTodo_value, addTodo_value))
    }
})

export default socket
