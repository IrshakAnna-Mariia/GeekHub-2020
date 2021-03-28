import React, { Component} from 'react'
import {connect} from 'react-redux'

export default class Cell extends Component {
    onClickCell = () => {
        if (!(this.props.number === '')) {this.props.onClick(this.props.number)}
    }

    render() {
        return (
            <div
                className={this.props.selected ? "cell selected" : 'cell'}
                onClick={this.onClickCell}
            >
                <h1>
                    {this.props.number}
                    {(this.props.events===0)?"": "(" + this.props.events + ")"}
                </h1>
            </div>
        )
    }
}

Cell = connect()(Cell);
