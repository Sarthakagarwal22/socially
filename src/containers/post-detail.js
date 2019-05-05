import {connect} from 'react-redux';

import { updatePostsArray,updateDeletedPostsArray } from '../actions'

import PostDetail from '../components/post-detail';

const mapStateToProps = state => ({
	postsArray : state.postsArray
})

const mapDispatchToProps = dispatch => ({
	setPostsArray: (posts) => {
		dispatch(updatePostsArray(posts))
	},
	setDeletedPostsArray: (post) => {
		dispatch(updateDeletedPostsArray(post))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(PostDetail);