export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const IS_COMPLETED = 'IS_COMPLETED';

export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function removeTodo(index) {
    return {type: REMOVE_TODO, index}
}

export function isCompleted(index) {
    return {type: IS_COMPLETED, index}
}

export function viewTodos(payload) {
    return {type: "filter/viewTodos" , payload}
}

export function viewAll(payload) {
    return {type: "filter/all" , payload }
}

export function viewActive(payload) {
    return {type: "filter/active" , payload }
}

export function viewCompleted(payload) {
    return {type: "filter/completed" , payload }
}

export function counterCompletedTodo(payload) {
    return {type: "filter/count" , payload }
}
