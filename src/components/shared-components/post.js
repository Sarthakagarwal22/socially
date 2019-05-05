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
		} = this.props
		
		return(
			<div className="post rounded-corner padding-Xlarge margin-medium clickable" onClick={()=>history.push(`/posts/${id}`)}>
				<span className="post-user-badge">{userId}</span>
				<br/>
				<b><h3>{title}</h3></b>
				<br/>
				<p>{body}</p>
				<br/>
				<button className="post-detail-button">View Post Details</button>
			</div>
		)
	}
}