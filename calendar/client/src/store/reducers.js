import {combineReducers} from "redux";
import {createSlice} from '@reduxjs/toolkit'
import {postEditEvent, postNewEvent, postRemoveEvent} from "./httpMethods";
import Error from "../app/Error";
import React from "react";

const eventsSlice = createSlice({
    name: 'filter',
    initialState: {
        email: null,
        logger: false,
        edit: false,

        events: [{
            "day": "3/4/2021",
            "time": "18:00",
            "text": "meeting"
        }]
    },
    reducers: {
        setStartEvents: (state, action) => {
            state.email = action.payload.email;
            state.logger = true;
            state.events = [...action.payload.events];
        },
        addNewEvent: (state, action) => {
            state.events = [
                ...state.events,
                {
                    day: action.payload.day,
                    time: action.payload.time,
                    text: action.payload.text
                }
            ]
            postNewEvent(state.email, state.events).then(value => {
                    if (value === false) {return <Error message="Event not added"/>}
                });
        },
        forRemoveEvent: (state, action) => {
            let currentIndex = -1;
            action.payload.allEvents.map((cell, index) => {
                if (cell.day === action.payload.currentEvent.day
                    && cell.time === action.payload.currentEvent.time
                    && cell.text === action.payload.currentEvent.text
                ) {
                    currentIndex = index
                }
            })
            if (!(currentIndex === -1)) {
                state.events = [
                    ...action.payload.allEvents.slice(0, currentIndex),
                    ...action.payload.allEvents.slice(currentIndex + 1)
                ]
            }
            postRemoveEvent(state.email, state.events).then(value => {
                    if (value === false) {return <Error message={"Event not deleted"}/>}
                })
        },
        forEditEvent: (state, action) => {
            action.payload.allEvents.map((cell, index) => {
                if (cell.day === action.payload.editedEvent.day
                    && cell.time === action.payload.editedEvent.time
                    && cell.text === action.payload.editedEvent.text
                ) {
                    state.events = [
                        ...action.payload.allEvents.slice(0, index),
                        action.payload.currentEvent,
                        ...action.payload.allEvents.slice(index + 1)
                    ]
                }
            })
            postEditEvent(state.email, state.events).then(value => {
                if (value === false) {return <Error message={"Event not deleted"}/>}
            })
        },
        forSetEdit: (state, action) => {
            state.edit = action.payload
        }
    }
});


const rootReducers = combineReducers({
    toolkit: eventsSlice.reducer
})

const EventsApp = combineReducers({
    rootReducers
});

export  default EventsApp;
export const {setStartEvents, addNewEvent, forRemoveEvent, forEditEvent} = eventsSlice.actions
