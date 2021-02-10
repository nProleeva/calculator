require('../css/deleteOperations.scss');

import React from 'react'
import {connect} from 'react-redux'

class ButtonDelete extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div id="deleteOperations">
			<button onClick={this.props.delete}>Delete operations</button>
		</div>
	}
}

export default connect()(ButtonDelete);