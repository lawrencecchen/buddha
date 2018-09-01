import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import STStrippedWrapper from './STStrippedWrapper'
import Main from './Main'

export default class STAuthContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirectTo : false,
            lostPw : false,
            creds : {
                username : '',
                password : ''
            },
            error : {
                id : '',
                message : ''
            },
            authResponse : ''
        }

        this.loginForm = this.loginForm.bind(this)
        this.setLoginState = this.setLoginState.bind(this)
        this.submit = this.submit.bind(this)
        this.lostPwGo = this.lostPwGo.bind(this)
    }

    componentDidMount() {
        console.log('auth mounted')
        if (this.state.loggedIn === null) {
            _st.auth.verify((d) => {
                _st.loggedIn = d.data
                this.setState({
                    authResponse : d.data
                })
            })
        }
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.location.pathname === this.props.location.pathname)
    }

    setLoginState(e) {
        _st.form.setState(this.state.creds,e.target)
    }

    submit(e) {
        e.preventDefault()
        _st.auth.token(this.state.creds,(d) => {
            if (d.code === 'login_success') {
                let redir = this.state.redirectTo || '/dashboard'
                this.props.history.push(redir)
                this.setState({
                    creds: {}
                })
                return null
            }
        })
    }

    lostPwGo() {
        this.setState({
            lostPw : true
        }, () => this.props.history.push('/login/lostpw'))
    }

    loginForm(d) {
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

    render() {
        _st.loading = true
        if (_st.loggedIn === null) return null

        if (_st.loggedIn) {
            return (this.props.location.pathname === '/login') ? <Redirect to='/dashboard'/> : <Route path='/' component={Main} />
        } else {
            return (
                <STStrippedWrapper error={this.state.error}>
                    <Switch>
                        <Route path='/login' render={(d) => this.loginForm(d)} />
                        <Route path='/*' render={(d) => {
                            this.setState({
                                redirectTo : d.match.url || '/'
                            }, () => this.props.history.push('/login'))
                            _st.loading = false
                            return null
                        }} />
                    </Switch>
                </STStrippedWrapper>
            )
        }
    }
}