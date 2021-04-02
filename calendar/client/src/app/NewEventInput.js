import React, { Component} from 'react'

export default class NewEventInput extends Component {
    onChange = (e) => {
        const {name, onChange} = this.props;
        onChange(name, e.currentTarget.value)
    }

    render() {
        const {name, align, placeholder, value, valid } = this.props;
        return (
            <input
                type="text"
                placeholder={placeholder}
                className={align ? valid ? align : (align + ' wrong') : ""}
                value={value}
                onChange={this.onChange}
                required
            />
        )
    }
}