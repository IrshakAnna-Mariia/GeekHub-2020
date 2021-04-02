import React, { Component} from 'react'
import {store} from '../index'

export default class Error extends Component {
    render() {
        return (
            <h1 className="resultRegister">
                Something is not work, please reload the page<br/>
                Error: {store.getState().rootReducers.toolkit.messageError}
            </h1>
        )
    }
}
