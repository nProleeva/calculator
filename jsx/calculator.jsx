require('../css/calculator.scss');

const React = require('react')
const { connect } = require('react-redux')

var regexNumber = (amount=-1) => (amount>-1)?('[0-9\\.]{' + amount + ',}'):'[0-9\\.]',
		regexOper = (equally)=> equally?'[+\\/\\-\\*=]':'[+\\/\\-\\*]';


class Calculator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {a:null, b:null, oper: null, value: '', current:''};

		this.handleChange = this.handleChange.bind(this);
		this.clickCe = this.clickCe.bind(this);
		this.signChange = this.signChange.bind(this);
	}

	componentDidUpdate() {
		if(this.props.current && this.props.current.value!==this.state.current)
			this.setState({
				a:this.props.current.a,
				b:this.props.current.b,
				oper:this.props.current.oper,
				value:this.props.current.value,
				current:this.props.current.value
			})
	}

	operator(a, b, oper) {
		switch(oper){
			case '+': return a+b;
			case '-': return a-b;
			case '*': return a*b;
			case '/': return b!=0 ? a/b : 'на 0 делить нельзя';
			default: return 'неизвестный оператор'
		}
	}

	clickCe(){
		this.setState({
			a:null,
			b:null,
			oper: '+',
			value: ''
		})
	}
	signChange() {
		this.setState((state)=>{
			let obj = state;
			if( new RegExp('^\\-?' + regexNumber(1) + regexOper(false) + regexNumber(1) + '$').test(obj.value)) {
				let [all,left,right] = obj.value.match(new RegExp('^(\\-?' + regexNumber(1) + regexOper(false) + ')(' + regexNumber(1) + ')$'));
				obj.value = left + '(-' + right;
			}else if(new RegExp(regexOper(false) + '\\(\\-' + regexNumber(1) + '$').test(obj.value)) {
				let [all,left,right] = obj.value.match(new RegExp('^(\\-?' + regexNumber(1) + regexOper(false) + ')(\\(\\-' + regexNumber(1) + ')$'));
				right = right.replace(/^\(\-/,'');
				obj.value = left + right;
			}else if (new RegExp('^\\-' + regexNumber(1) + '$').test(obj.value))
				obj.value = obj.value.replace(/^\-/,'');
			else if (new RegExp('^' + regexNumber(1) + '$').test(obj.value))
				obj.value = '-' + obj.value;

			return obj;
		})
	}
	handleChange(event) {
		let char = event.key;
		if(event.keyCode===8 || new RegExp(regexNumber()).test(char) || new RegExp(regexOper(true)).test(char))
			this.setState((state)=>{
				let obj = state; 

				if(!(new RegExp('^\\-?' + regexNumber(0) + regexOper(false) + '?\\(?\\-?' + regexNumber(0)+'$').test(obj.value))) obj.value = '';

				if((!obj.value.length && char==='-') || (obj.value==='-' && char==='+')) obj.value = obj.value.length?'': '-';
				else if(new RegExp(regexOper(true)).test(char) && obj.value.length && new RegExp('^\\-?' + regexNumber(1)).test(obj.value)) {
					obj.value = obj.value.replace(new RegExp(regexOper(false)+'$'),'');
					if( new RegExp('^\\-?' + regexNumber(1) + regexOper(false) + '\\(?\\-?' + regexNumber(1) + '$').test(obj.value)) {
						obj.b = Number(obj.value.match(new RegExp('(' + regexOper(false) + '\\(?)(\\-?' + regexNumber(1) + '$)'))[2]);
						let value = this.operator(obj.a, obj.b, obj.oper);
						this.props.add({a:obj.a, b:obj.b, oper:obj.oper, c:value, value:obj.value});
						obj.a = value;
						obj.b = null;
						obj.value = obj.a;
					}
					else obj.a = Number(obj.value)

					obj.value += char!=='='?char:'';
					obj.oper = char!=='='?char:null;
				}
				else if(new RegExp(regexNumber()).test(char)) {
					if(/\./.test(char) && /\./.test(new RegExp(regexNumber(1) + '$').exec(obj.value)[0])) return obj;
					let match = obj.value.match(new RegExp('\\-?' + regexNumber(0) + '$'))[0];
					char = match.length<9?char:'';
					obj.value += char;
					if (/[^\.]/.test(char) && (new RegExp('^0'+regexNumber(1)).test(obj.value) || new RegExp(regexOper(false) + '\\(?\\-?0' + regexNumber(1) + '$').test(obj.value)))
						obj.value = obj.value.replace(new RegExp('^(\\-)?(' + regexNumber(1) + ')(' + regexOper(false) + '\\(?\\-?)?(' + regexNumber(1) + '$)?'),function(all,sign='',a,oper='',b='') {
							return sign + a.replace(/^0/,'') + oper + b.replace(/^0/,'');
						});
				} 
				else if(new RegExp(regexNumber() + '$').test(obj.value) && char === "Backspace")
					obj.value = obj.value.replace(new RegExp(regexNumber() + '$'),'');
				return obj;
			});
	}

	render() {
		return (
			<div onKeyDown={this.handleChange} id="calculator">
				<input type="text" value={this.state.value} readOnly/>
				<button onClick={this.clickCe}>Ce</button>
				<button onClick={this.signChange}>+/-</button>
			</div>
		)
	}

}

module.exports = connect()(Calculator);
