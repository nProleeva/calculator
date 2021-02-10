import React from 'react'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import Wrapper from './connect.jsx'
import reducers from './redux'

export default render((
	<Provider store={createStore(reducers,applyMiddleware(thunkMiddleware))}>
		<Wrapper/>
	</Provider>
	),
	document.getElementById('htmlReact')
)