import React from 'react';

import Spost from './shared-components/post';

import './stylesheets/deleted-posts.css'

export default class DeletedPosts extends React.Component{
	render(){
		return(
			<div>
			<br />
				<center><h1>Deleted Posts</h1></center>
				<br />
				<br />
				<div className="deleted-post-container">
				{
					this.props.deletedPostsArray.length > 0 &&
					this.props.deletedPostsArray.map(post => (
						<Spost key={post.id} title={post.title} body={post.body} id={post.id} userId={post.userId}></Spost>
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