const React = require('react');
const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { createStore, applyMiddleware} = require('redux')
const thunkMiddleware = require('redux-thunk').default;
const Wrapper = require('./connect.jsx')
const reducers = require('./redux')

module.exports = render((
	<Provider store={createStore(reducers,applyMiddleware(thunkMiddleware))}>
		<Wrapper/>
	</Provider>
	),
	document.getElementById('htmlReact')
)