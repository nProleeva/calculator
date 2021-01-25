const { handleActions } = require('redux-actions')

const FETCH_OPERATIONS = 'operations/FETCH_OPERATIONS'
const FETCH_OPERATION = 'operations/FETCH_OPERATION'
const DELETE_OPERATIONS = 'operations/DELETE_OPERATIONS'

module.exports = {
  fetchOperationsActionCreator: (operation) => ({
    type: FETCH_OPERATIONS,
    operation
  }),
  deleteOperationsAction: () => ({
    type: DELETE_OPERATIONS
  }),
  fetchOperationActionCreator: (index) => ({
    type: FETCH_OPERATION,
    index
  }),
  reducer: handleActions({
    [FETCH_OPERATIONS]: (state, action) => {
    	let newState = state,
    		all = newState.all || '',
    		count = newState.operations.length + 1;
    	newState.operations.push(action.operation);
    	return {
			...newState,
			all: all + count + ') ' + action.operation + '\n'
		}
	},
	[DELETE_OPERATIONS]: (state, action) => {
		let newState = state;
		newState.operations=[];
		newState.operation='';
		newState.all='';
		return {
			...newState
		}
	},
    [FETCH_OPERATION]: (state, action) => ({
		...state,
		current: state.operations[action.index - 1]
    })
  }, {
    operations: [],
    operation: ''
  })
}