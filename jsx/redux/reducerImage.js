import { handleActions } from 'redux-actions'
import { key_api, requestImages } from './request.js'

const NEW_IMAGE = 'images/NEW_IMAGE';

const newImageActionCreator = () => {
	return dispatch => {
		fetch(requestImages(1),{
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': key_api
			}
		}).then (response => response.json())
			.then(data => dispatch({type: NEW_IMAGE,data:data[0]}))
			.catch(error => console.log(error))
	}};

const reducer = handleActions({
		[NEW_IMAGE]: (state, action) => ({
			...state,
			url: action.data.url
		})
	}, {
		url: ''
	})


export {newImageActionCreator, reducer}