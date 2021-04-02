import React from 'react'
import {store} from "../index"
import {setError} from "./actions";

export async function postNewEvent(email, events) {
    try {
        let res = await fetch("/add", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, events}
            ),
        });
        return await res.json()

    } catch (e) {
        store.dispatch(setError(e.message))
    }
}

export async function postRemoveEvent(email, events) {
    try {
        let res = await fetch("/remove", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, events}
            ),
        });
        return await res.json()

    } catch (e) {
        store.dispatch(setError(e.message))
    }
}

export async function postEditEvent(email, events) {
    try {
        let res = await fetch("/edit", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, events}
            ),
        });
        return await res.json()

    } catch (e) {
        store.dispatch(setError(e.message))
    }
}

export async function postResponseSignIn(email, password) {
    try {
        let res = await fetch("/signIn", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, password}
            ),
        });
        return await res.json()

    } catch (e) {
        store.dispatch(setError(e.message))
    }
}

export async function postResponseRegister(email, password) {
    try {
        let res = await fetch("/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(
                {email, password}
            ),
        });
        return await res.json()
    } catch (e) {
        store.dispatch(setError(e.message))
    }
}

async function fetchTodos() {
    const response = await fetch("/get");
    return response.json();
}

