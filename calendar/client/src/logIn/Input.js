import React, { Component} from 'react'

export default class Input extends Component {
    onChange = (e) => {
      const {name, onChange} = this.props;

      onChange(name, e.currentTarget.value)
    }

    render() {
        const {name, label, placeholder, value, valid, type, invalidText} = this.props;
        return (
            <div>
                <label className="email">
                    <b>{label}</b>{valid ? "" : invalidText}
                </label>
                <input
                    className={valid ? "" : "wrong"}
                    type={type}
                    value={value}
                    placeholder={placeholder}
                    onChange={this.onChange}
                    required
                />
            </div>
        )
    }
}