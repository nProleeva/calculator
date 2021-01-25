const React = require('react')
const { connect } = require('react-redux')

class Calculator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {a:null, b:null, oper: null, value: ''};

		this.handleChange = this.handleChange.bind(this);
		this.clickCe = this.clickCe.bind(this);
		this.signChange = this.signChange.bind(this);
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
			if( /^\-?[0-9]+[+\/\-*][0-9]+$/.test(obj.value)) {
				let [all,left,right] = obj.value.match(/^(\-?[0-9]+[+\/\-*])([0-9]+)$/);
				obj.value = left + '(-' + right;
			}else if(/[+\/\-*]\(\-[0-9]+$/.test(obj.value)) {
				let [all,left,right] = obj.value.match(/^(\-?[0-9]+[+\/\-*])(\(\-[0-9]+)$/);
				right = right.replace(/^\(\-/,'');
				obj.value = left + right;
			}else if (/^\-[0-9]{0,}$/.test(obj.value))
				obj.value = obj.value.replace(/^\-/,'');
			else if (/^[0-9]{0,}$/.test(obj.value))
				obj.value = '-' + obj.value;

			return obj;
		})
	}
	handleChange(event) {
		let char = event.key;
		if(event.keyCode===8 || /[+\/\-*=0-9]/.test(char))
			this.setState((state)=>{
				let obj = state;
				if((!obj.value.length && char==='-') || (obj.value==='-' && char==='+')) obj.value = obj.value.length?'': '-';
				else if(/[+\/\-*=]/.test(char) && obj.value.length && /^\-?[0-9]+/.test(obj.value)) {
					obj.value = obj.value.replace(/[+\/\-*]$/,'');
					if( /^\-?[0-9]+[+\/\-*](\(\-)?[0-9]+$/.test(obj.value)) {
						obj.b = Number(obj.value.match(/([+\/\-*]\(?)(\-?[0-9]{0,}$)/)[2]);
						obj.a = this.operator(obj.a, obj.b, obj.oper);
						this.props.add(obj.value + (/\(/.test(obj.value)?')':'') + '=' + obj.a);
						obj.b = null;
						obj.value = obj.a;
					}
					else obj.a = Number(obj.value)

					obj.value += char!=='='?char:'';
					obj.oper = char!=='='?char:null;
				}
				else if(/[0-9]/.test(char)) {
					if(/[^+\/\-*=0-9]/.test(obj.value)) obj.value = '';
					
					let match = obj.value.match(/\-?[0-9]{0,}$/)[0];
					char = match.length <9?char:'';
					obj.value += char;
					if (/^0[0-9]{1,}/.test(obj.value) || /[+\/\-*]\(?\-?0[0-9]{1,}$/.test(obj.value))
						obj.value = obj.value.replace(/^(\-)?([0-9]{1,})([+\/\-*]\(?\-?)?([0-9]{1,}$)?/,function(all,sign='',a,oper='',b='') {
							return sign + a.replace(/^0/,'') + oper + b.replace(/^0/,'');
						});
				} 
				else if(/[0-9]$/.test(obj.value) && char === "Backspace")
					obj.value = obj.value.replace(/[0-9]$/,'');
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
