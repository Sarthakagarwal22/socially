import {connect} from 'react-redux';

import { updatePostsArray } from '../actions'

import Home from '../components/home'

const mapStateToProps = state => ({
	postsArray : state.postsArray
})

const mapDispatchToProps = dispatch => ({
	setPostsArray: (posts) => {
		dispatch(updatePostsArray(posts))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(Home)