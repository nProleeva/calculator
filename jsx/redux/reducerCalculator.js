import { handleActions } from 'redux-actions'

const FETCH_OPERATIONS = 'operations/FETCH_OPERATIONS'
const DELETE_OPERATIONS = 'operations/DELETE_OPERATIONS'
const RETURN_OPERATION = 'operations/RETURN_OPERATION'

const fetchOperationsActionCreator = (operation) => ({
		type: FETCH_OPERATIONS,
		operation
	}),
	deleteOperationsAction = () => ({
		type: DELETE_OPERATIONS
	}),
	returnOperationAction = (index) => ({
		type: RETURN_OPERATION,
		index
	});

const reducer = handleActions({
	[FETCH_OPERATIONS]: (state, action) => ({
		...state,
		current:undefined,
		operations:state.operations.concat(action.operation)
	}),
	[DELETE_OPERATIONS]: (state, action) => {
		let newState = state;
		newState.operations=[];
		newState.operation='';
		newState.current=undefined;
		return {
			...newState
		}
	},
	[RETURN_OPERATION]: (state, action) => {
		if(action.index>state.operations.length) return{...state, message:'error: нет операции под номером ' + action.index};
		return  {
			...state,
			current: state.operations[action.index - 1],
			operations:state.operations.slice(0, action.index-1),
			message: 'все успешно выполнилось'
		}
	}
}, {
	operations: [],
	operation: ''
});

export { fetchOperationsActionCreator,deleteOperationsAction,returnOperationAction,reducer}