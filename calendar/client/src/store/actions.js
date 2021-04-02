export function setEvents(payload) {
    return {type: "event/setStartEvents", payload}
}

export function addEvent(payload) {
    return {type: "event/addNewEvent", payload}
}

export function removeEvent(payload) {
    return {type: "event/forRemoveEvent", payload}
}

export function editEvent(payload) {
    return {type: "event/forEditEvent", payload}
}

export function setEdit(payload) {
    return {type: "event/forSetEdit", payload}
}

export function setError(payload) {
    return {type: "event/forSetError", payload}
}
