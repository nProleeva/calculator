const React = require('react')
const { connect } = require('react-redux')
const {fetchOperationsActionCreator, deleteOperationsAction} = require('./redux/reducer.js')
const Calculator = require('./calculator.jsx')
const ButtonDelete = require('./deleteOperations.jsx')
const TextArea = require('./allOperations.jsx')

class Wrapper extends React.Component {

	render() {

		const {
			operations=[]
		} = this.props;

		return (
			<div>
				<Calculator add={this.props.fetchOperations}/>
				<ButtonDelete delete={this.props.deleteOperations}/>
				<TextArea operations={operations} />
			</div>
		)
	}

}

module.exports = connect(({operations})=>({operations:operations.all}), {fetchOperations:fetchOperationsActionCreator,deleteOperations:deleteOperationsAction})(Wrapper);
