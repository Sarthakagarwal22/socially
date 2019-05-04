import React from 'react';

import Spost from './shared-components/post'

import {getRequest} from '../helpers/api-response'

import {fetchPostUrl} from '../local-data/config'

import './stylesheets/home.css'

export default class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			showLoader:false,
		}
		this.fetchPosts = this.fetchPosts.bind(this);
	}

	async fetchPosts(){
		this.setState({showLoader:true});
		var posts = await getRequest(fetchPostUrl);
		this.props.setPostsArray(posts);
		this.setState({showLoader:false})
	}

	componentDidMount(){
		// if(this.props.postArray.length = 0)
			this.fetchPosts();
	}

	render(){
		let {
			postsArray
		} = this.props
		return(
			<div className="main-home">
				<br />
				<center><h1 className="white">Posts</h1></center>
			<br />
			<div className="post-container">
				{
					this.state.showLoader &&
					<h2 className="white">Loading...</h2>
				}
				{
					!this.state.showLoader &&
					postsArray.map(post => (
						<Spost key={post.id} title={post.title} body={post.body} id={post.id} userId={post.userId}></Spost>
					))
				}
			</div>
			</div>
		)
	}
}