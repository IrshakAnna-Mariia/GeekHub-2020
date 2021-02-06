export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const IS_COMPLETED = 'IS_COMPLETED';
export const IS_EDIT = 'IS_EDIT';

export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function removeTodo(text) {
    return {type: REMOVE_TODO, text}
}

export function isCompleted(text) {
    return {type: IS_COMPLETED, text}
}

export function isEditAllTodos(text, newText) {
    return {type: IS_EDIT, text, newText}
}

export function setTodos(payload) {
    return {type: "filter/setTodos" , payload }
}

export function counterCompletedTodo(payload) {
    return {type: "filter/count" , payload }
}

export function countAddTodo() {
    return {type: "filter/countAddTodo" }
}

export function countMinesTodo() {
    return {type: "filter/countMinesTodo" }
}

export function forCompleteTodo(payload) {
    return {type: "filter/forCompleteTodo", payload}
}

export function forRemoveTodo(payload) {
    return {type: "filter/forRemoveTodo", payload}
}

export function setCurrentTodo(payload) {
    return {type: "filter/setCurrentTodo", payload}
}

export function isEdit(payload) {
    return {type: "filter/isEdit", payload}
}