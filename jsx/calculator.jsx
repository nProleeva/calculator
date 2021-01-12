const React = require('react')
const { connect } = require('react-redux')
const { bindActionCreators } = require('redux')
const styles = require('../css/calculator.scss')

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
				let [all,left,right] = obj.value.match(/^(-?[0-9]+[+\/\-*])([0-9]+)$/);
				obj.value = left + '(-' + right;
				obj.b = Number('-' + right);
			}else if(/^\-?[0-9]+[+\/\-*]\(\-[0-9]+$/.test(obj.value)) {
				let [all,left,right] = obj.value.match(/^(-?[0-9]+[+\/\-*])(\(\-[0-9]+)$/);
				right = right.replace(/^\(\-/,'');
				obj.value = left + right;
				obj.b = Number(right);
			}else if(/^[0-9]+/.test(obj.value)) {
				let [all,left,right] = obj.value.match(/^([0-9]+)(.*)$/);
				obj.value = '-' + left + right;
				if(right.length) obj.a = Number('-' + left);
			}else if(/^\-[0-9]+/.test(obj.value)) {
				let [all,left,right] = obj.value.match(/^\-([0-9]+)(.*)$/);
				obj.value = left + right;
				if(right.length) obj.a = Number(left);
			}

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
						obj.a = this.operator(obj.a, obj.b, obj.oper);
						this.props.add({value:obj.value, c:obj.a});
						obj.b = null;
						obj.value = obj.a;
					}
					else obj.a = Number(obj.value)

					obj.value += char!=='='?char:'';
					obj.oper = char!=='='?char:null;
				}
				else if(/[0-9]/.test(char)) {
					let match = obj.value.match(/-?[0-9]{0,}$/)[0];
					char = match.length <9?char:'';
					obj.value +=char;
					if(obj.a) obj.b = Number(match+char);
				} 
				else if(/[0-9]$/.test(obj.value) && char === "Backspace") {
					obj.value = obj.value.replace(/[0-9]$/,'');
					if(obj.a && /[+\/\-*]/.test(obj.value)) obj.b = Number(obj.value.match(/\-?[0-9]{0,}$/)[0]);
				}
				return obj;
			});
	}

	render() {
		return (
			<div onKeyDown={this.handleChange} id="calculator">
				<input type="text" value={this.state.value} disabled={true} />
				<button onClick={this.clickCe}>Ce</button>
				<button onClick={this.signChange}>+/-</button>
			</div>
		)
	}

}

const mapDispatchToProps = (dispatch) => {
  return {
    // dispatching plain actions
    add: (state) => dispatch({ type: 'Add_operation', value: state })
  }
}

module.exports = connect(null, mapDispatchToProps)(Calculator);
