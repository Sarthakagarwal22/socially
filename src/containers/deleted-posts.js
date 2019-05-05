import {connect} from 'react-redux';

import { updatePostsArray,removePostFromDeletedPosts } from '../actions'

import DeletedPosts from '../components/deleted-posts'

const mapStateToProps = state => ({
	postsArray : state.postsArray,
	deletedPostsArray: state.deletedPostsArray
})

const mapDispatchToProps = dispatch => ({
	setPostsArray: (posts) => {
		dispatch(updatePostsArray(posts))
	},
	removePostFromDeletedArray: (postId) => {
		dispatch(removePostFromDeletedPosts(postId))
	}
})

export default connect(mapStateToProps,mapDispatchToProps)(DeletedPosts)