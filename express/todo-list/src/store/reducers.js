import {ADD_TODO, REMOVE_TODO, IS_COMPLETED, IS_EDIT, SET_TODOS} from "./actions";
import {combineReducers} from "redux";
import {createSlice} from '@reduxjs/toolkit'


const filterSlice = createSlice({
    name: 'filter',
    initialState: {
        counter: 1,
        activeTodos: [{text: "Buy a unicorn", complete: false}],
        completedTodos: [{text: "Taste JavaScript", complete: true}],
        currentTodo: []
    },
    reducers: {
        setTodos: (state, action) => {
            set_Todos(state, action.payload);
        },
        forCompleteTodo: (state, action) => {
            let currentIndex;
            action.payload.allTodo.map((cell, index) => {
                if (cell.text === action.payload.currentTodo.text) {currentIndex = index}
            })
            let actionArray = [
                ...action.payload.allTodo.slice(0, currentIndex),
                Object.assign({}, action.payload.allTodo[currentIndex], {complete:!action.payload.allTodo.complete}),
                ...action.payload.allTodo.slice(currentIndex + 1)
            ];
            set_Todos(state, actionArray);
        },
        forRemoveTodo: (state, action) => {
            let currentIndex;
            action.payload.allTodo.map((cell, index) => {
                if (cell.text === action.payload.currentTodo.text) {currentIndex = index}
            })
            let actionArray = [
                ...action.payload.allTodo.slice(0, currentIndex),
                ...action.payload.allTodo.slice(currentIndex + 1)
            ];
            set_Todos(state, actionArray);
        },
        countAddTodo: (state) => {
            state.counter = state.counter + 1;
        },
        countMinesTodo: (state) => {
            state.counter = state.counter - 1;
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
        setCurrentTodo: (state, action) => {
            state.currentTodo = [action.payload];
        },
        isEdit: (state, action) => {
            function setNewTodoText(currentState, currentIndexEdit) {
                return [
                    ...currentState.slice(0, currentIndexEdit),
                    Object.assign({}, currentState[currentIndexEdit], {text:action.payload.newText}),
                    ...currentState.slice(currentIndexEdit + 1)
                ]
            }
            state.activeTodos.map((cell, index) => {
                if (cell.text === action.payload.text) {
                    state.activeTodos = setNewTodoText(state.activeTodos, index)
                }
            })
            state.completedTodos.map((cell, index) => {
                if (cell.text === action.payload.text) {
                    state.completedTodos = setNewTodoText(state.completedTodos, index)
                }
            })
            state.currentTodo.map((cell, index) => {
                if (cell.text === action.payload.text) {
                    state.currentTodo = setNewTodoText(state.currentTodo, index)
                }
            })
        },
    }
});

function todoList(state = [
    {text: "Taste JavaScript", complete: true},
    {text: "Buy a unicorn", complete: false}
], action) {
    console.log(action)
    switch (action.type) {
        case SET_TODOS:
            return [
                ...action.payload
            ]
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    complete: false,
                }
            ];
        case REMOVE_TODO:
            let currentIndexRemove;
            state.map((cell, index) => {
                if (cell.text === action.text) {currentIndexRemove = index}
            })
            return [
                ...state.slice(0, currentIndexRemove),
                ...state.slice(currentIndexRemove + 1)
            ];
        case IS_COMPLETED:
            let currentIndex;
            state.map((cell, index) => {
                if (cell.text === action.text) {currentIndex = index}
            })
            return [
                ...state.slice(0, currentIndex),
                Object.assign({}, state[currentIndex], {complete:!action.complete}),
                ...state.slice(currentIndex + 1)
            ];
        case IS_EDIT:
            let currentIndexEdit;
            state.map((cell, index) => {
                if (cell.text === action.text) {currentIndexEdit = index}
            })
            return [
                ...state.slice(0, currentIndexEdit),
                Object.assign({}, state[currentIndexEdit], {text:action.newText}),
                ...state.slice(currentIndexEdit + 1)
            ]
        default:
            return state;
    }
}

const set_Todos = (state, array) => {
    let arrayActiveFinally = [];
    let arrayActive = array.map((cell) => {
        if (cell.complete === false) {
            return cell
        }
    })
    arrayActive.map((cell) => {
        if (!(cell === undefined)) {
            arrayActiveFinally.push(cell);
        }
    });
    state.activeTodos = [...arrayActiveFinally];

    let arrayCompleteFinally = [];
    let arrayComplete = array.map((cell) => {
        if (cell.complete === true) {
            return cell
        }
    })
    arrayComplete.map((cell) => {
        if (!(cell === undefined)) {
            arrayCompleteFinally.push(cell);
        }
    });
    state.completedTodos = [...arrayCompleteFinally];
};

const rootReducers = combineReducers({
    toolkit: filterSlice.reducer
})

const todoListApp = combineReducers({
    rootReducers,
    todoList
});

export  default todoListApp;
export const {addTodos, isCompleted, removeTodo, completed, active, all, count} = filterSlice.actions