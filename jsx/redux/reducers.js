export function rootReducer(state = initialState, action){
	if(action.type="Add_operator" && action.value) {
		state.all.push(action.value.value + /\(/.test(action.value.value)?')':'' + action.value.c)
		return state;
	}
	return state;
}

const initialState = {
	all:[]
}