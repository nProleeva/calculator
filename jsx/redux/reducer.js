const { handleActions } = require('redux-actions')

const FETCH_OPERATIONS = 'operations/FETCH_OPERATIONS'
const FETCH_OPERATION = 'operations/FETCH_OPERATION'

module.exports = {
  fetchOperationsActionCreator: (operation) => ({
    type: FETCH_OPERATIONS,
    operation
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
    [FETCH_OPERATION]: (state, action) => ({
		...state,
		current: state.operations[action.index - 1]
    })
  }, {
    operations: [],
    operation: ''
  })
}