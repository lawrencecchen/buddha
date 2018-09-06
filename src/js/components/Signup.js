import React from 'react'
import STSignupWrapper from './STSignupWrapper'
import Header from './Header'
import * as methods from './signup/methods'
import * as steps from './signup/steps'

export default class Signup extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            update: true,
            loading: true,
            init: false,
            step: 0,
            params: props.location.search ? _st.objectifyURLParams(props.location.search) : {},
            error : {
                id : '',
                message : ''
            }
        }
        this.steps = [
            'Plans',
            'Account',
            'Billing',
            'Shipping',
            'Pay',
            'ThankYou'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        _st.bodyClass = 'signup'
        _st.loading = false
    }

    componentDidUpdate() {
        _st.loading = false
    }

    shouldComponentUpdate() {
        return this.state.update 
    }

    render() {
        let {step} = this.props.match.params
        if (typeof step === 'undefined' || step !== this.steps[this.state.step].toLowerCase()) {
            this.props.history.replace('/signup/plans')
            return null 
        }
        const SignupStep = steps[this.steps[this.state.step]]
        return(
            <STSignupWrapper error={this.state.error}>
                <Header />
                <div className="row">
                    <svg class="eut-separator eut-tilt-left-separator" xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="90px" viewBox="0 0 1920 90" preserveAspectRatio="none">
                        <polygon class="fil0" points="1920,90 0,90 1920,0 "></polygon>
                    </svg>
                </div>
                <div id="stSignupWrapper" className="stFormWrapper row">
                    <div className="stOverlay"></div>
                        {(('plan' in this.state.params)&&!this.state.init) ?
                            this.initSession(this.state.params['plan']) :
                            <SignupStep 
                                changeStep={this.changeStep} 
                                createAccount={this.createAccount} 
                                updateInp={this.updateInp} 
                                initSession={this.initSession} 
                            />
                        }
                </div>
            </STSignupWrapper>
        )
    }
}