import React, {Component} from 'react'
import {Link, Redirect} from "react-router-dom";
import ReactDom from "react-dom";
import {setEvents} from "../store/actions";
import {connect} from 'react-redux'
import moment from "moment";
import Error from "../app/Error";

let email;
let password;

export default class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incorrectEmail: false,
            incorrectPassword: false
        }
    }

    onSubmit = (e) => {
        this.setState({incorrectEmail: false});
        this.setState({incorrectPassword: false});
        postResponse(email.value, password.value).then(value => {
            if (value.email && value.password) {
                this.props.dispatch(setEvents({email: email.value, events: [...value.events]}))
            }
            if (!value.email) {this.setState({incorrectEmail: true});}
            if (!value.password) {this.setState({incorrectPassword: true});}

            if (value===false) {
                ReactDom.render(
                    <Error message= {"Error with connection. Please reload the page" }/>,
                    document.getElementById('root')
                )
            }
        }, reason => {
            console.log(reason)
            ReactDom.render(
                <Error message= {reason}/>,
                document.getElementById('root')
            )
        })

        e.preventDefault();
    }

    inputEmail = (node) => email = node
    inputPassword = (node) => password = node

    render() {
        if (this.props.logger === true) {return <Redirect to="/" />}
        else return (
            <div className="containerReg">
                <form onSubmit={this.onSubmit}>
                    <div >
                        <h1 className="signIn">Sign In</h1>
                        <p className="signIn">Please fill in this form to sign in an account</p>
                        <div id="result">
                        </div>
                        <hr/>

                        <label className="email"><b>Email</b>{this.state.incorrectEmail ? " *User does not exist, please register*" : ""}</label>
                        <input
                            className = {this.state.incorrectEmail ? "wrong": ""}
                            type="text"
                            placeholder= "Enter Email"
                            ref={this.inputEmail}
                            required
                        />
                        <label className="email"><b>Password</b>{this.state.incorrectPassword ? " *Incorrect entered password*" : ""}</label>
                        <input
                            className = {this.state.incorrectPassword ? "wrong": ""}
                            type="password"
                            placeholder="Enter Password"
                            ref={this.inputPassword}
                            required
                        />
                        <hr/>
                    </div>

                    <button type="submit" className="loginbtn">Sign in</button>

                    <Link to='/register'>
                        <button type="button" className="registerbth">Register</button>
                    </Link>

                </form>
            </div>
        )
    }
}

SignIn = connect()(SignIn);

async function postResponse(email, password) {
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
        console.log(e)
        ReactDom.render(
            <Error message={e.message}/>,
            document.getElementById('root')
        )
    }
}
