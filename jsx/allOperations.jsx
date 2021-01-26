const React = require('react')
const { connect } = require('react-redux')

class TextArea extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <div>
			{this.props.operations.map((operation, index) =>{
				let value=operation.value;
				value+=(/\(/.test(operation.value)?')':'') + '=' + operation.c;
				return <div key={index}>{index+1}) {value}</div>
			})}
		</div>
	}
}

module.exports = connect()(TextArea);