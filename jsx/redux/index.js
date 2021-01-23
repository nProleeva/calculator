const { combineReducers } = require('redux')
const {
  reducer: operations
} = require('./reducer.js')

module.exports = combineReducers({
	operations
})