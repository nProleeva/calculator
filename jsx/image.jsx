require('../css/image.scss');

const React = require('react')
const { connect } = require('react-redux')
const {newImageActionCreator} = require('./redux/reducerImage.js')

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
				<div className="overlay">click</div>
				<img src={this.state.src} style={{maxWidth: '500px'}}/>
			</div>
		)
	}

}

module.exports = connect(state =>({
		url:state.images.url
	}), {
		newImage:newImageActionCreator
	})(Image);
