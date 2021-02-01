const { combineReducers } = require('redux')
const {
  reducer: operations
} = require('./reducerCalculator.js')
const {
  reducer: images
} = require('./reducerImage.js')

module.exports = combineReducers({
	operations, images
})