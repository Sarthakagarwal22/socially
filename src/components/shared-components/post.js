import React from 'react';
import './stylesheets/post.css'

export default class Spost extends React.PureComponent {
	render(){

		let {
			title,
			body,
			userId
		} = this.props
		
		return(
			<div className="post rounded-corner padding-Xlarge margin-medium">
				<b><h3>{title}</h3></b>
				<br/>
				<p>{body}</p>
				<br/>
				<p>Posted by: {userId}</p>
				<br/>
				<button className="post-detail-button">View Post Details</button>
			</div>
		)
	}
}