import React, {PureComponent} from 'react';

const success = '#C2E0C6';
const error = '#F9D0C4';

export default class UserForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.name,
            email: this.props.user.email,
            password: this.props.user.password,
            phones: this.props.user.phones
        }
        this.addPhone = () => {
            this.setState(() => {
                return {
                    phones: [...this.state.phones, {number: "", type: "home"}]
                }
            })
        }
        this.deleteIndex = (e) => {
            this.setState(({phones}) => {
                return {
                    phones: [...phones.slice(0, Number(e.target.value)), ...phones.slice(Number(e.target.value)+1)]
                };
            })
        }
    }

    checkName(propsName) {
        const wordRule = /^[абвгґдеєжзиіїйклмнопрстуфхцчшщьюяАБВГҐДЕЄЖЗИІЇЙКЛМНОПРСТУФХЦЧШЩЬЮЯ]+$/;
        const words = propsName.trim().split(/\s+/);
        return words.length === 3 && words.every(word => wordRule.test(word));
    };

    checkEmail(propsEmail) {
        const emailParts = propsEmail.split('@');
        const username = emailParts[0];
        const domain = emailParts[1];
        const usernameRule = /^[a-zA-Z0-9\-.]+$/;
        const emailRule1 = /^[^.].+[^.]$/;
        const emailRule2 = /^.*[^.]@[^.].*$/;

        return (
            emailParts.length === 2 &&
            usernameRule.test(username) &&
            usernameRule.test(domain) &&
            domain.includes('.') &&
            emailRule1.test(propsEmail) &&
            emailRule2.test(propsEmail)
        );

    }

    checkPassword(propsPassword) {
        const passwordRule1 = /^[a-zA-Z0-9]{8,}$/;
        const passwordRule2 = /[a-z]/;
        const passwordRule3 = /[A-Z]/;
        const passwordRule4 = /[0-9]/;

        return (
            passwordRule1.test(propsPassword) &&
            passwordRule2.test(propsPassword) &&
            passwordRule3.test(propsPassword) &&
            passwordRule4.test(propsPassword)
        );
    }

    checkHomePhone(propsHomePhone) {
        const noZero = /^[^0]/;
        const lengthOfPhone = /^\d{6}$/;

        return (
            noZero.test(propsHomePhone) &&
            lengthOfPhone.test(propsHomePhone)
        );
    }

    checkMobilePhone(propsMobilPhone) {
        const check1 = /^0/;
        const lengthOfPhone1 = /^\d{10}$/;
        const check2 = /^3/;
        const lengthOfPhone2 = /^\d{12}$/;

        return (
            (
                check1.test(propsMobilPhone) &&
                lengthOfPhone1.test(propsMobilPhone)
            ) || (
                check2.test(propsMobilPhone) &&
                lengthOfPhone2.test(propsMobilPhone)
            )
        );
    }

    checkPhone(phoneType, propsPhone) {
        if (phoneType === "home") return this.checkHomePhone(propsPhone);
        if (phoneType === "mobile") return this.checkMobilePhone(propsPhone);
    }

    render() {
        let {name, email, password, phones} = this.state;

        return (
            <div id="root">
                <form id="user-form">

                    <div className="form-group">
                        <label>П.І.Б.</label>
                        <input type="text" className="form-control" defaultValue={name}
                               style={{background: this.checkName(name) ? success : error}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" className="form-control" defaultValue={email}
                               style={{background: this.checkEmail(email) ? success : error}}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" className="form-control" defaultValue={password}
                               style={{background: this.checkPassword(password) ? success : error}}
                        />
                    </div>
                    {phones.map((cell, index) => {
                        return (
                            <div className="input-group mb-3"
                                 key={phones[index].number}
                            >
                                <input
                                    type="text"
                                    className="form-control"
                                    defaultValue={phones[index].number}
                                    style={{background: this.checkPhone(phones[index].type, phones[index].number) ? success : error}}
                                />
                                <select className="custom-select" defaultValue={phones[index].type}>
                                    <option value="home">Домашній</option>
                                    <option value="mobile">Мобільний</option>);
                                </select>
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-secondary"
                                        type="button"
                                        value={index}
                                        onClick={this.deleteIndex}
                                    >Видалити
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                    <div>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={this.addPhone}
                        >Додати номер
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}