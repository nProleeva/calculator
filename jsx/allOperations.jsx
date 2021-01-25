const React = require('react')
const { connect } = require('react-redux')

class TextArea extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <p>
			{this.props.operations}
		</p>
	}
}

module.exports = connect()(TextArea);