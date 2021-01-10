const React = require('react');
const { render } = require('react-dom')
const { Provider } = require('react-redux')
const { createStore } = require('redux')
const Calculator = require('./calculator.jsx')
const {rootReducer} = require('./redux/reducers.js')

module.exports = render((
	<Provider store={createStore(rootReducer)}>
		<Calculator/>
	</Provider>
	),
	document.getElementById('htmlReact')
)