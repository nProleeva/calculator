const React = require('react')
const { connect } = require('react-redux')
const {fetchOperationsActionCreator, deleteOperationsAction, returnOperationAction} = require('./redux/reducerCalculator.js')
const Calculator = require('./calculator.jsx')
const ButtonDelete = require('./deleteOperations.jsx')
const ReturnOperation = require('./returnOperation.jsx')
const TextArea = require('./allOperations.jsx')

class WrapperCalculator extends React.Component {

	constructor(props) {
		super(props);
	}


	render() {

		const {
			operations=[]
		} = this.props;

		return (
			<div>
				<Calculator current={this.props.current} add={this.props.fetchOperations}/>
				<ButtonDelete delete={this.props.deleteOperations}/>
				<ReturnOperation message={this.props.message} return={this.props.returnOperation}/>
				<TextArea operations={this.props.operations} />
			</div>
		)
	}

}

module.exports = connect(state =>({
		operations:state.operations.operations,
		current:state.operations.current,
		message:state.operations.message
	}), {
		fetchOperations:fetchOperationsActionCreator,
		deleteOperations:deleteOperationsAction,
		returnOperation:returnOperationAction
	})(WrapperCalculator);
