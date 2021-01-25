import {ADD_TODO, REMOVE_TODO, SET_FILTER, Filters, IS_COMPLETED, SET_COUNTER} from "./actions";
import {combineReducers} from "redux";

const {ALL} = Filters;

function visualFilter(state = ALL, action) {
    switch (action.type) {
        case SET_FILTER:
            return action.filter;
        default:
            return state;
    }
}

function todoList(state = [
    {text: "Taste JavaScript", complete: true},
    {text: "Buy a unicorn", complete: false}
], action) {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    complete: false
                }
            ];
        case REMOVE_TODO:
            return [
                ...state.slice(0, action.index),
                ...state.slice(action.index + 1)
            ];
        case IS_COMPLETED:
            return [
                ...state.slice(0, action.index),
                Object.assign({}, state[action.index], {complete:!action.complete}),
                ...state.slice(action.index + 1)
            ]
        default:
            return state;
    }
}

const todoListApp = combineReducers({
    visualFilter,
    todoList
});

export  default todoListApp;
