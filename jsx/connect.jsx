const React = require('react')
const { connect } = require('react-redux')
const Image = require('./image.jsx')
const WrapperCalculator = require('./wrapperCalculator.jsx')

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

module.exports = connect()(Wrapper);
