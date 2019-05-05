import {connect} from 'react-redux';

import DeletedPosts from '../components/deleted-posts'

const mapStateToProps = state => ({
	deletedPostsArray: state.deletedPostsArray
})

// const mapDispatchToProps = dispatch => ({
// 	setPostsArray: (posts) => {
// 		dispatch(updatePostsArray(posts))
// 	}
// })

export default connect(mapStateToProps)(DeletedPosts)