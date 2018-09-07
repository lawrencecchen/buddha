import React from 'react'
import STBlankWrapper from './STBlankWrapper'
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
            'Payment',
            'ThankYou'
        ]

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
        _st.bodyClass = 'signup'
    }

    componentDidMount() {
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
            <STBlankWrapper>
                <Header shadow="0"/>
                <div id="stSignupDiagSep" className="row">
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" fill="#ffffff" width="100%" height="100px" viewBox="0 0 1920 100" preserveAspectRatio="none">
                        <polygon points="0,0 0,100 1920,0 "></polygon>
                    </svg>
                </div>
                <SignupStep 
                    error={this.state.error}
                    changeStep={this.changeStep} 
                    createAccount={this.createAccount} 
                    updateInp={this.updateInp} 
                    initSession={this.initSession} 
                />
            </STBlankWrapper>
        )
    }
}