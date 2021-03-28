import React, { Component} from 'react'

export default class Error extends Component {
    render() {
        return (
            <h1 className="resultRegister">
                Something is not work, please reload the page<br/>
                Error: {this.props.message}
            </h1>
        )
    }
}