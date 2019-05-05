import React from 'react';

import Spost from './shared-components/post'

import {getRequest} from '../helpers/api-response'

import {fetchPostUrl} from '../local-data/config'

import history from '../history'

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
		if(this.props.postsArray.length === 0)
			this.fetchPosts();
		console.log(this.props.deletedPostsArray)
	}

	render(){
		let {
			postsArray
		} = this.props
		return(
			<div className="home-container">
				<div className="white home-hero-banner">
					{
						this.props.deletedPostsArray.length>0 &&
						<p className="home-deleted-posts small clickable" onClick={()=>{history.push("/deleted-posts")}}>View Deleted Posts</p>
					}
					<br />
					<h2>Welcome to Socially!</h2>
					<br />
					<br className="hidden-md-dowm" />
					<h3 className="hidden-md-dowm">Find the best posts, from all around the world.</h3> 
					<h5 className="hidden-md-dowm">All at one place</h5>
					<br />
					<input className="home-search-bar" type="text" placeholder="Search for your favourite posts"/>
				</div>
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