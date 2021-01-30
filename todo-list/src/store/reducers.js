import {ADD_TODO, REMOVE_TODO, IS_COMPLETED} from "./actions";
import {combineReducers} from "redux";
import {createSlice} from '@reduxjs/toolkit'

const initialState = [{text: "Taste JavaScript", complete: true}, {text: "Buy a unicorn", complete: false}];

const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        counter: 1,
        currentTodos: initialState
    },
    reducers: {
        viewTodos(state, action) {
            state.currentTodos = [...action.payload];
        },
        all: (state, action) => {
            state.currentTodos = [...action.payload];
        },
        active: (state, action) => {
            let arrayActiveFinally = [];
            let arrayActive = action.payload.map((cell) => {
                if (cell.complete === false) {
                    return cell
                }
            })
            arrayActive.map((cell) => {
                if (!(cell === undefined)) {
                    arrayActiveFinally.push(cell);
                }
            });
            state.currentTodos = [...arrayActiveFinally];
        },
        completed: (state, action) => {
            let arrayCompleteFinally = [];
            let arrayComplete = action.payload.map((cell) => {
                if (cell.complete === true) {
                    return cell
                }
            })
            arrayComplete.map((cell) => {
                if (!(cell === undefined)) {
                    arrayCompleteFinally.push(cell);
                }
            });
            state.currentTodos = [...arrayCompleteFinally];
        },
        count: (state, action) => {
            let count = 0;
            action.payload.map((cell) => {
                if (cell.complete === false) {
                    count = count + 1;
                }
            })
            state.counter = count;
        },
    }
});

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

const rootReducers = combineReducers({
    toolkit: filterSlice.reducer
})

const todoListApp = combineReducers({
    rootReducers,
    todoList
});

export  default todoListApp;
export const {addTodos, isCompleted, removeTodo, completed, active, all, count} = filterSlice.actions
