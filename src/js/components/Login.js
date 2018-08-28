import React from 'react'
import * as _st from '../classes/st'

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lostPw : false,
            creds : {
                username : '',
                password : ''
            },
        }

        this.lostPwGo = this.lostPwGo.bind(this)
    }

    lostPwGo() {
        this.props.history.push('/login/lostpw')
        this.setState({
            lostPw : true
        })
    }

    render() {
        if (this.state.lostPw)
            return (
                <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <div id="stLoginHeader" className="stFormHeader col s12">
                        <h2>Reset your password</h2>
                        <span>Please enter the email address associated with your account</span>
                    </div>
                    <div id="stLoginCredentials" className="col s12">
                        <div className="input-field col s12">
                            <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={this.setLoginState}/>
                        </div>
                    </div>
                    <div className="stFormButtons col s12">
                        <button className="stFormButton pmt-button btn waves-effect waves-light">Reset your password</button>
                    </div>
                </form>
            )
        else
            return (
                <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
                    <div className="stOverlay"></div>
                    <div id="stLoginHeader" className="stFormHeader col s12">
                        <h2>Welcome! Please sign in.</h2>
                        <span>You can access all of your test prep courses, as well as all of your account information, by logging in below.</span>
                    </div>
                    <div id="stLoginCredentials" className="col s12">
                        <div className="input-field col s12">
                            <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={this.setLoginState}/>
                        </div>
                        <div className="input-field col s12">
                            <input className="browser-default validate" type="password" name="password" placeholder="Password" onBlur={this.setLoginState}/>
                        </div>
                    </div>
                    <div className="stForgotBlock col s12">
                        <span><a onClick={this.lostPwGo}>Forgot your password?</a></span>
                    </div>
                    <div className="stFormButtons col s12">
                        <button className="stFormButton pmt-button btn waves-effect waves-light">Login</button>
                    </div>
                </form>
            )
        }
}