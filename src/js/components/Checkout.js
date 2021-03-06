import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import LogoSVG from './LogoSVG'

const theDate = new Date()

theDate.setDate(theDate.getDate() + 5)

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            status: 'active',
            step: 0,
            card: null,
            update: true,
            stripe: null,
            cardComplete: false,
            ...props.payload
        }

        this.state.error = {
            id: '',
            message: ''
        }

        this.completed = this.completed.bind(this)
    }

    componentDidMount() {
        document.body.classList.add('checkout')
        const key = _st.stripe
        this.session = {
            id: Date.now(),
            signature: this.state.signature
        }

        if (!window.Stripe) {
            const s = document.createElement('script')
            s.type = 'text/javascript'
            s.id = 'stStripeScript'
            s.async = true
            s.src = 'https://js.stripe.com/v3/'
            document.body.appendChild(s)
        }

        this.setState((state) => {
            return {
                init: true,
                stripe: (window.Stripe) ? window.Stripe(key) : null
            }
        }, () => {
            if (!window.Stripe) document.querySelector('#stStripeScript').addEventListener('load', () => {
                this.setState({stripe: window.Stripe(key)})
            })
        })
        _st.loading = false
    }

    shouldComponentUpdate(np, ns) {
        return ns.update;
    }

    componentWillUnmount() {
        document.body.classList.remove('checkout')
        let els = document.querySelectorAll('[name*="__privateStripe"]'),
            el = document.getElementById('stStripeScript')
        for (let i = 0; i < els.length; i++) if (els[i]) els[i].parentNode.removeChild(els[i])
        if (el) el.parentNode.removeChild(el)
    }

    completed() {
        this.setState({status: 'completed'}, () => {setTimeout(() => {
            localStorage.removeItem('stCourseData')
            localStorage.removeItem('_stT-signup')
            window.location.reload(true)
        }, 2000)})
    }

    render() {
        if (!this.state.init) return null

        let {children,amt,action} = this.props,
            {error, ...state} = this.state,
            disabled = (state.status === 'processing'),
            completed = (state.status === 'completed'),
            active = disabled ? 'active' : (completed) ? 'completed' : ''

        return(
            <StripeProvider stripe={state.stripe}>
                <Elements>
                    <section className="stCheckoutWindow" onClick={(e) => this.props.closeCheckout()}>
                        <div className="stCheckoutInner" onClick={(e) => e.stopPropagation()}>
                            <figure className="stCheckoutLogo">
                                <LogoSVG/>
                            </figure>
                            <h3>Secure Payment Form</h3>
                            <form className={['stCheckoutForm',error.id].join(' ')} action={action} onSubmit={(e) => {
                                e.preventDefault()
                                if (state.status === 'processing' || !state.cardComplete) return false
                                
                                this.setState({
                                    status: 'processing'
                                })
                                
                                let nameOnCard = e.target.querySelector('#nameOnCard').value

                                state.stripe.createToken(state.card,{name: nameOnCard}).then(({token: t}) => {
                                    if (t.error) return this.setState({
                                        status: 'active',
                                        error: {
                                            id: 'signupError',
                                            message: t.error.message
                                        }
                                    })

                                    let obj = {
                                        token: t.id,
                                        coupon: state.coupon.id,
                                        plan: {
                                            doTrial: state.doTrial,
                                            id: state.plan.value,
                                            ...state.option
                                        },
                                        loc: state.loc,
                                        name: state.fullname,
                                        shipping: state.shipping,
                                        session: this.session
                                    }
                            
                                    return _st.http.post(action,obj,(d) => {
                                        if (d.code === 'signupError') {
                                            return this.setState({
                                                status: 'active',
                                                cardComplete: false,
                                                error: {
                                                    id: d.code,
                                                    message: d.data.message
                                                }
                                            },() => _st.loading = false)
                                        }
                                        this.completed()
                                    })
                                    
                                })
                            }}>
                                <div className="stIfR99">
                                    <input id="nameOnCard" aria-label="Name on card" className="validate" type="text" name="nameOnCard" required validation="text"/>
                                    <label aria-hidden="true" for="nameOnCard">Name on card</label>
                                </div>
                                <div id="stPricingCardElement">
                                    <CardElement id="stripeInject" onChange={(d) => {
                                        if (typeof d !== 'undefined') {
                                            if (typeof d.error !== 'undefined') return this.setState({
                                                cardComplete: false,
                                                error: {
                                                    id: 'signupError',
                                                    message: d.error.message
                                                }
                                            })

                                            if (d.complete && !d.empty) this.setState({
                                                cardComplete: true,
                                                error: {
                                                    id: '',
                                                    message: ''
                                                }
                                            })
                                        }
                                    }} onReady={(el) => {
                                        this.setState({card: el})
                                    }}/>
                                </div>
                                {!state.doTrial ? null : <div className="stTrialMsg">You elected the FREE 5 day limited access trial. Your card will not be charged until <wbr/><em>{theDate.toDateString()}</em>. By clicking below, you agree to pay the full amount due to fully unlock your course subscription.</div>}
                                <div className="stSubmitBlock">
                                    <button id="paySubmit" name="paySubmit" type="submit" className={active}>
                                        <span>{disabled ? 'Processing...' : (completed) ? '' : 
                                        (state.doTrial) ? 'Agree to Pay '+amt : 'Pay '+amt}</span>
                                        {state.status === 'active' ? 
                                            <i class="fas fa-lock"></i> :
                                            (state.status === 'processing' ? <i class="fas fa-spinner"></i> : <i class="fas fa-check-circle"></i>)}
                                    </button>
                                </div>
                                {(error.id)
                                    ? <div className="stAccountErrors"><strong>{error.message}</strong></div>
                                    : null
                                }
                            </form>
                            {children}
                        </div>
                    </section>
                </Elements>
            </StripeProvider>
        )
    }
}