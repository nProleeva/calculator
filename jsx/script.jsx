const React = require('react');
const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const Wrapper = require('./connect.jsx')
const reducers = require('./redux')

module.exports = render((
	<Provider store={createStore(reducers)}>
		<Wrapper/>
	</Provider>
	),
	document.getElementById('htmlReact')
)