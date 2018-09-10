// calculatePricing
export function calcluatePricing() {
    var items = [],
        plan = this.state.plan,
        pricing = this.state.pricing

    pricing.total = parseInt(plan.price)
    pricing.taxable = parseInt(plan.taxable)
    items.push({name: plan.name, amt: plan.price})

    var disc = pricing.coupon.value.match(/\\$([0-9]+)/) || ['0','0'],
    discp = pricing.coupon.value.match(/([0-9]+)%/) || ['0','0'],
    discprice = pricing.total*(parseInt(discp[1])/100) || parseInt(disc[1])

    if ( discprice > 0 ) {
        pricing.total -= discprice
        items.push({name: 'Discount '+pricing.coupon.id, amt: discprice})
    }

    if ( pricing.tax.value > 0 ) {
        let taxxx = (pricing.taxable*pricing.tax.value)/100
        pricing.total += taxxx
        items.push({name: pricing.tax.id, amt: taxxx})
    }

    if ( pricing.shipping > 0 ) {
        pricing.total += pricing.shipping
        items.push({name: 'Priority Shipping', amt: pricing.shipping})
    }

    this.state.items = items
}

// changeStep
export function changeStep(inc = true,e) {
    if (typeof e !== 'undefined') e.preventDefault()
    var obj = (typeof inc === 'object') ? inc : {},
        prevState
    this.setState((prev) => {
        prevState = prev
        return {
            step : (inc) ? this.state.step + 1 : this.state.step - 1,
            obj
        }
    }, () => this.props.history.push({
        pathname:'/signup/'+this.steps[this.state.step].toLowerCase(),
        state: prevState
    }))
    return null
}

// createAccount
export function createAccount(e) {
    e.preventDefault()
    _st.loading = true
    _st.http.post('/signup/account',this.state.customer.account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        Object.assign(this.state.customer,d.update)

        return this.changeStep({
            stripe: this.initPayment()
        })
    })
}

// setChecker
export function setChecker() {

}

// setPlan
export function setPlan(e) {
    e.preventDefault()
    return this.changeStep({
        plan: JSON.parse(e.currentTarget.getAttribute('data-obj'))
    })
}

// setOutcome
export function setOutcome( result ) {
    if (typeof result !== 'undefined') {
        if (typeof result.error !== 'undefined') return this.setState({
            card: false,
            error: {
                id: 'stripeError',
                message: result.error.message
            }
        })
        this.state.card = !result.empty && result.complete
    }

    this.setState({
        valid: this.state.card && document.getElementById('stTermsBox').checked && this.validate()
    })
}

// submitPayment
export function submitPayment() {
    _st.http.post('/signup/pay',dt,cb)
}

// toPrice
export function toPrice(amt = 0) {
    return (Math.round(amt)/100).toFixed(2)
}

// updateInp
export function updateInp({target: el}) {
    this.state.update = false
    this.setState(prev => {
        var params = el.name.split('|'),
            newObj = {[params[0]] : {...prev[params[0]]}}

            params.reduce((obj,key,i,arr) => {
                if (i+1 === arr.length) obj[key] = el.value
                else return obj[key]
            },newObj)
        return Object.assign(prev,newObj)
    },() => this.state.update = true)
}

// validate
export function validate() {
    return true
}