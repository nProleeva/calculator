require('../css/deleteOperations.scss');

const React = require('react')
const { connect } = require('react-redux')

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

module.exports = connect()(ButtonDelete);