import React from 'react';

import Spost from './shared-components/post';

import './stylesheets/deleted-posts.css'

export default class DeletedPosts extends React.Component{
	constructor(props){
		super(props);
		this.restorePost = this.restorePost.bind(this);
		this.deletePost = this.deletePost.bind(this);
	}

	restorePost(postId){
		var postToBeRestored = this.props.deletedPostsArray.find((post) => post.id === postId);
		var updatedPostsArray = this.props.postsArray.slice() 
		for(var i=0;i<updatedPostsArray.length;i++){
			if(postId < updatedPostsArray[i].id){
				updatedPostsArray.splice(i,0,postToBeRestored)
				break;
			}
		}
		this.props.setPostsArray(updatedPostsArray)
		this.props.removePostFromDeletedArray(postId);
	}

	deletePost(postId){
		if(window.confirm("This is a permanent action and can't be undone, Are you sure you to proceed")){
			this.props.removePostFromDeletedArray(postId)
		}
	}

	render(){
		return(
			<div>
			<br />
				<center><h1>Deleted Posts</h1></center>
				<br />
				<br />
				<div className="deleted-posts-container">
				{
					this.props.deletedPostsArray.length > 0 &&
					this.props.deletedPostsArray.map(post => (
						<Spost key={post.id} title={post.title} body={post.body} id={post.id} userId={post.userId} deletedPost={true} restorePost={this.restorePost} permanentlyDeletePost={this.deletePost}></Spost>
					))
				}
				{
					this.props.deletedPostsArray.length === 0 &&
					<center><h2>You haven't deleted any posts yet </h2></center>
				}
			</div>
			</div>
		)
	}	
} 