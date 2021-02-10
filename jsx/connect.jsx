import React from 'react'
import {connect} from 'react-redux'
import Image from './image.jsx'
import WrapperCalculator from './wrapperCalculator.jsx'

class Wrapper extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {
		return (
			<div>
				<Image/>
				<WrapperCalculator/>
			</div>
		)
	}

}

export default connect()(Wrapper);
