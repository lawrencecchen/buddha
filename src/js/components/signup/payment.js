import React from 'react'
import {injectStripe, CardElement} from 'react-stripe-elements'
import CountryDD from './pieces/CountryDD'
import PricingTable from './pieces/PricingTable'

const _Payment = ({updateInp, submitPayment, state, toPrice, error, stripe, setChecker, setShipping, calculatePricing, setOutcome}) => {
    calculatePricing()
    var trialDate = new Date()
    trialDate.setDate(trialDate.getDate() + 5)
    return (
        <div id="stSignupPayment" className="stSignupStep row">
            <div className="stSignupInner row">
                <div className="stInfoWrap row">
                    <form className="stFormWrapper" onSubmit={(e) => submitPayment(e,stripe)}>
                        <div id="stSignupPaymentForm" className="col s12 m8">
                            <div id="stSignupFormShipping" className="row">
                                <fieldset>
                                    <legend>Shipping</legend>
                                    <div className="input-field required col s12">
                                        <input className="browser-default validate shipping address_line1" type="text" name="customer|shipping|address|line1" placeholder="Address 1" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field col s12">
                                        <input className="browser-default validate shipping address_line2" type="text" name="customer|shipping|address|line2" placeholder="Address 2" onBlur={updateInp} />
                                    </div>
                                    <div className="input-field required col s12 m6 stInputHalfLeft">
                                        <input className="browser-default validate shipping address_city" type="text" name="customer|shipping|address|city" placeholder="City" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field required col s12 m6 stInputHalfRight">
                                        <input className="browser-default validate shipping address_state" type="text" name="customer|shipping|address|state" placeholder="State" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field required col s12 m6 stInputHalfLeft">
                                        <input className="browser-default validate shipping address_zip tax" type="text" name="customer|shipping|address|postal_code" placeholder="Postal Code" onBlur={setChecker} required/>
                                    </div>
                                    <div className="input-field required col s12 m6 stInputHalfRight">
                                        <CountryDD className="browser-default validate shipping address_country" name="customer|shipping|address|country" onBlur={updateInp} required/>
                                    </div>
                                    <div className="input-field col s12 m6 offset-m3">
                                        <input className="browser-default validate" type="tel" name="customer|shipping|phone" placeholder="Phone #" pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}" onBlur={updateInp} required />
                                    </div>
                                </fieldset>
                            </div>
                            <div id="stSignupFormOptions"className="row">
                                <fieldset>
                                        <legend>Options</legend>
                                        <div class="st-checkout-spaced col s12">
                                            <label>
                                                <input name="customer|options|priorityShip" className="filled-in" value="1" type="checkbox" onChange={setShipping}/>
                                                <span>I want Priority Shipping (+$7.05, U.S. only)</span>
                                            </label>
                                        </div>
                                        <div className="st-checkout-spaced col s12">
                                            <label>
                                                <input name="customer|options|skipTrial" className="filled-in" value="1" type="checkbox" onChange={setChecker} />
                                                <span>Skip the trial period and start immediately</span>
                                            </label>
                                        </div>
                                        <div class="st-checkout-spaced col s12">
                                            <label>
                                                <input name="customer|options|mailingList" className="filled-in" value="1" type="checkbox" onChange={setChecker} />
                                                <span>Add me to the SupertutorTV mailing list for future discounts and offers</span>
                                            </label>
                                        </div>
                                </fieldset>
                            </div>
                        </div>
                        <div id="stSignupPricing" className="col s12 m4 z-depth-3">
                            <PricingTable state={state} toPrice={toPrice} setChecker={setChecker} />
                            <div className="input-field required row">
                                <input className="browser-default validate" type="text" name="customer|nameOnCard" placeholder="Name on card" onBlur={updateInp} required/>
                            </div>
                            <div id="stPricingCardElement" className="row"><CardElement onChange={setOutcome} /></div>
                            <div className="stTermsRow row">
                                <label>
                                    <input id="stTermsBox" name="customer|options|terms" className="filled-in" value="1" type="checkbox" onChange={setChecker} required/>
                                    <span>I have read SupertutorTV's Terms & Conditions</span>
                                </label>
                            </div>
                            <div className="stFormButtons row">
                                <button id="stBtn_payment" type="submit" className="stFormButton btn waves-effect waves-light" disabled={!state.valid} >Submit payment</button>
                            </div>
                            <div id="stFormErrors" className="row"><strong>{error.message}</strong></div>
                        </div>
                    </form>
                </div>
                <div id="stSignupPaymentBottom" className="stStepBottom row">
                    <h1>Set up your payment.</h1>
                    <span>5 day free trial expires <strong>{trialDate.toLocaleDateString()}</strong></span>
                </div>
            </div>
        </div>
    )
}

const Payment = injectStripe(_Payment)

export default Payment