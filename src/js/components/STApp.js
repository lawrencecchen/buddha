import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import allYourBase from './allYourBase'
import Signup from './Signup'
import Header from './Header'
import Controls from './Controls'
import MU from './MU'
import ResetPassword from './ResetPassword'
import STSecured from './STSecured'

export default class STApp extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			modal: {
				open: false,
				type: '',
				component: null
			}
		}

		this.modalActive = this.modalActive.bind(this)
	}

	modalActive(modal = {}) {
        this.setState((state) => (Object.assign(state.modal,modal)))
        return this
    }

	render() {
		let { modal } = this.state
		return (
			<React.Fragment>
				<Controls />
				<div className="stRightPanel">
					<Header />
					<Switch>
						<Route exact path='/all-your-base-are-belong-to-us' component={allYourBase} />
						<Route exact path='/signup/:plan?' component={Signup} />
						<Route exact path='/mu/:teacher' component={MU} />
						<Route exact path='/password/reset/:key?' component={ResetPassword} />
						<Route exact path='/login' component={STSecured} />
						<Route path='/' render={(p) => <STSecured {...p} />} />
					</Switch>
				</div>
			</React.Fragment>
		)
	}
}