require('../css/image.scss');

import React from 'react'
import {connect} from 'react-redux'
import {newImageActionCreator} from './redux/reducerImage.js'

class Image extends React.Component {

	constructor(props) {
		super(props);

		this.state = {src:''};
		this.clickImg = this.clickImg.bind(this);
	}

	componentDidMount() {
		this.clickImg();
	}
	componentDidUpdate() {
		if(this.props.url && this.props.url!==this.state.src)
			this.setState({src:this.props.url})
	}

	clickImg() {
		this.props.newImage();
	}

	render() {

		return (
			<div className="wrapper-image" onClick={this.clickImg}>
				<div className="overlay"><p>click</p></div>
				<img src={this.state.src}/>
			</div>
		)
	}

}

export default connect(state =>({
		url:state.images.url
	}), {
		newImage:newImageActionCreator
	})(Image);
