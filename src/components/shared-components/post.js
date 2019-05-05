import React from 'react';

import history from '../../history'

import './stylesheets/post.css';

export default class Spost extends React.PureComponent {
	render(){

		let {
			title,
			body,
			userId,
			id,
			deletedPost,
			restorePost,
			permanentlyDeletePost
		} = this.props
		
		return(
			<div className="post rounded-corner padding-Xlarge margin-medium clickable" onClick={()=>{if(!deletedPost)history.push(`/posts/${id}`)}}>
				<div className="post-header"><span className="post-user-badge">{userId}</span> 
				{
					deletedPost && 
					<div>
					<span className="small clickable" onClick={()=>{permanentlyDeletePost(id)}}>Delete Post</span> &nbsp;&nbsp;
					<span className="small clickable" onClick={()=>{restorePost(id)}}>Restore Post</span>
					</div>
				}
				</div>
				<br/>
				<b><h3>{title}</h3></b>
				<br/>
				<p>{body}</p>
				<br/>
				{
					!deletedPost &&
					<button className="post-detail-button">View Post Details</button>
				}
			</div>
		)
	}
}