import {combineReducers} from 'redux'
import {reducer as operations} from './reducerCalculator.js';
import {reducer as images} from './reducerImage.js'

export default combineReducers({
	operations, images
})