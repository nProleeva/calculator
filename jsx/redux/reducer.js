const { handleActions } = require('redux-actions')

const FETCH_OPERATIONS = 'operations/FETCH_OPERATIONS'
const FETCH_OPERATION = 'operations/FETCH_OPERATION'

module.exports = {
  fetchOperationsActionCreator: (operations) => ({
    type: FETCH_OPERATIONS,
    operations
  }),
  fetchOperationActionCreator: (index) => ({
    type: FETCH_OPERATION,
    index
  }),
  reducer: handleActions({
    [FETCH_OPERATIONS]: (state, action) => ({
		...state,
		all: action.operations
	}),
    [FETCH_OPERATION]: (state, action) => ({
		...state,
		current: state.all[action.index - 1]
    })
  }, {
    operations: [],
    operation: ''
  })
}