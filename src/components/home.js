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
			postsArray:[]
		}
		this.fetchPosts = this.fetchPosts.bind(this);
		this.searchPosts = this.searchPosts.bind(this);
	}

	searchPosts(searchPhrase){
		if(searchPhrase.length === 0){
			this.setState({postsArray:this.props.postsArray})
		}
		else{
			var filteredArrayAfterSearch = this.props.postsArray.filter((post)=> ((post.title.indexOf(searchPhrase)!== -1) || (post.body.indexOf(searchPhrase)!== -1) ))
			this.setState({postsArray:filteredArrayAfterSearch})
		}
	}

	async fetchPosts(){
		this.setState({showLoader:true});
		var posts = await getRequest(fetchPostUrl);
		this.setState({showLoader:false, postsArray:posts})
		this.props.setPostsArray(posts);
	}

	componentDidMount(){
		if(this.props.postsArray.length === 0)
			this.fetchPosts();
		else
			this.setState({postsArray:this.props.postsArray})
	}

	render(){
		return(
			<div className="home-container">
				<div className="white home-hero-banner">
					<div className="home-hero-banner-pattern"></div>
					{
						this.props.deletedPostsArray.length>0 &&
						<p className="home-deleted-posts small clickable" onClick={()=>{history.push("/deleted-posts")}}>View Deleted Posts</p>
					}
					<h2>Welcome to Socially!</h2>
					<br />
					<h3>Find the best posts, from all around the world.</h3> 
					<h5 className="hidden-md-dowm">All at one place</h5>
					<br />
					<input className="home-search-bar" type="text" placeholder="Search for your favourite posts" onChange={(e)=>{this.searchPosts(e.target.value)}}/>
				</div>
			<br />
			<div className="post-container">
				{
					this.state.showLoader &&
					<h2 className="white">Loading...</h2>
				}
				{
					!this.state.showLoader &&
					this.state.postsArray.map(post => (
						<Spost key={post.id} title={post.title} body={post.body} id={post.id} userId={post.userId}></Spost>
					))
				}
			</div>
			</div>
		)
	}
}