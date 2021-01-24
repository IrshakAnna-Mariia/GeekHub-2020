import React, { Component, ReactPropTypes} from 'react'

export default class Header extends Component {

    onChange(e) {
        if (e.key === 'Enter'){
            this.props.onEnter(e);
            e.target.value = "";
        }
    }

    render() {
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    ref='input'
                    onKeyPress={(e) => this.onChange(e)}

                />
            </header>
        )
    }
}
