import React from 'react'
import ReactDom from 'react-dom'
import Error from "../app/Error";

export async function postNewEvent(email, event) {
    try {
        let res = await fetch("/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, event}
            ),
        });
        return await res.json()

    } catch (e) {
        console.log(e)
        ReactDom.render(
            <Error message={e.message}/>,
            document.getElementById('root')
        )
    }
}

export async function postRemoveEvent(email, event) {
    try {
        let res = await fetch("/remove", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, event}
            ),
        });
        return await res.json()

    } catch (e) {
        console.log(e)
        ReactDom.render(
            <Error message={e.message}/>,
            document.getElementById('root')
        )
    }
}

export async function postEditEvent(email, editedEvent, currentEvent) {
    try {
        let res = await fetch("/edit", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, editedEvent, currentEvent}
            ),
        });
        return await res.json()

    } catch (e) {
        console.log(e)
        ReactDom.render(
            <Error message={e.message}/>,
            document.getElementById('root')
        )
    }
}

async function fetchTodos() {
    const response = await fetch("/get");
    return response.json();
}

