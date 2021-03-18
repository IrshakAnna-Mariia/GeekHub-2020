import React, {Component} from 'react'

export default class Error extends Component {
    render() {
        return (
            <div>
                <section className="todoapp">
                    <header className="header">
                        <h1>todos</h1>
                    </header>
                </section>
                <div className="error">
                    <h1>Something is not working, please reload the page</h1>
                </div>
                <footer className="info">
                    <p>Double-click to edit a todo</p>
                    <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
                    <p>Created by <a href="http://todomvc.com">you</a></p>
                    <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
                </footer>
            </div>
        )
    }
}