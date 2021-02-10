require('../css/returnOperation.scss');

import React from 'react'
import {connect} from 'react-redux'

class returnOperation extends React.Component {

	constructor(props) {
		super(props);
		this.state = { value: ''};

		this.change = this.change.bind(this);
		this.enter = this.enter.bind(this);
	}
	change(event) {
		this.setState((state)=>{
			let obj = state;
			obj.value = event.target.value.replace(/^0|[^0-9]/g,'')
			return obj;
		});
	}
	enter() {
		this.props.return(this.state.value);
		this.setState({
			value: ''
		})
	}

	render() {
		return <div id="returnOperation">
			<div>Enter the number of the operation you want to return</div>
			<input type="text" value={this.state.value} onChange={this.change}/><button onClick={this.enter}>Enter</button>
			<div>{this.props.message}</div>
		</div>
	}
}

export default connect()(returnOperation);