export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const SET_FILTER = 'SET_FILTER';
export const IS_COMPLETED = 'IS_COMPLETED';
export const SET_COUNTER = 'SET_COUNTER';

export const Filters = {
    ALL: 'ALL',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED'
}

export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function removeTodo(index) {
    return {type: REMOVE_TODO, index}
}

export function isCompleted(index) {
    return {type: IS_COMPLETED, index}
}

export function setFilter(filter) {
    return {type: SET_FILTER, filter}
}

export function setCounter(itemLeft) {
    return {type: SET_FILTER, itemLeft}
}