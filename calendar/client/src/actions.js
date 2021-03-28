export const SET_EVENTS = 'SET_EVENTS';

export function setEvents(payload) {
    return {type: "filter/setStartEvents", payload}
}

export function addEvent(payload) {
    return {type: "filter/addNewEvent", payload}
}

export function removeEvent(payload) {
    return {type: "filter/forRemoveEvent", payload}
}

export function editEvent(payload) {
    return {type: "filter/forEditEvent", payload}
}

export function setEdit(payload) {
    return {type: "filter/forSetEdit", payload}
}