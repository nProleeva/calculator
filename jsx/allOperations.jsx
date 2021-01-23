const React = require('react')
const { connect } = require('react-redux')

class TextArea extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		console.log(this.props.operations);
		return <div>
			{this.props.operations}
		</div>
	}
}

module.exports = connect()(TextArea);