import React from 'react'
import {connect} from 'react-redux'
import {fetchOperationsActionCreator, deleteOperationsAction, returnOperationAction} from './redux/reducerCalculator.js'
import Calculator from './calculator.jsx'
import ButtonDelete from './deleteOperations.jsx'
import ReturnOperation from './returnOperation.jsx'
import TextArea from './allOperations.jsx'

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

export default connect(state =>({
		operations:state.operations.operations,
		current:state.operations.current,
		message:state.operations.message
	}), {
		fetchOperations:fetchOperationsActionCreator,
		deleteOperations:deleteOperationsAction,
		returnOperation:returnOperationAction
	})(WrapperCalculator);
