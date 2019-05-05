import React from 'react';

import {getRequest} from '../helpers/api-response';

import {baseUrl} from '../local-data/config' 

import history from '../history';

import './stylesheets/post-detail.css'

export default class PostDetail extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			commentsOpen:false,
			showLoader:false,
			comments:[],
			post:{}
		}	
		this.post = {}
		this.fetchPostFromGlobalState = this.fetchPostFromGlobalState.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
	}

	async fetchComments(){
		this.setState({showLoader:true,commentsOpen:!this.state.commentsOpen})
		var comments = await getRequest(baseUrl+`/${this.props.match.params.id}/comments`);
		console.log(comments)
		var filteredComments = comments.filter((comment)=> comment.postId === +this.props.match.params.id)
		this.setState({comments:filteredComments,showLoader:false})
	}

	deletePost(){
		if(window.confirm("Are you sure you want to delete this post")){
			var modifiedPostsArray = this.props.postsArray.filter((post) => post.id !== +this.props.match.params.id);
			this.props.setPostsArray(modifiedPostsArray);
			this.props.setDeletedPostsArray(this.state.post)
			history.push("/home");
		}
	}

	fetchPostFromGlobalState(){
		this.post = this.props.postsArray.find((post) => post.id === +this.props.match.params.id)
		this.setState({post:this.post})
	}

	componentDidMount(){
		this.fetchPostFromGlobalState();
	}

	render(){
		return(
			<div className="post-detail-main">
				<center><h1 className="padding-Xlarge white"> Details of Post {this.props.match.params.id}</h1>
				<div className="post-detail-card rounded-corner padding-Xlarge">
					<br />
					<div className="post-detail-post-header">
						<span className="post-detail-user-badge">{this.state.post.userId}</span>
						<div className="post-detail-edit-delete">
							<span><img src={require("../local-data/images/edit.svg")} height="20px" alt="edit icon" /> Edit Post </span> &nbsp;&nbsp;
							<span className="red clickable" onClick={()=>{this.deletePost()}}><img src={require("../local-data/images/delete.svg")} height="20px" alt="delete icon" /> Delete Post </span>
						</div>
					</div>
					<br/><br/>
					<b><h2>{this.state.post.title}</h2></b>
					<br/>
					<p>{this.state.post.body}</p>
					<br/>
					<div className="post-detail-comments-outer-container">
						<p className="grey clickable" onClick={()=>{this.fetchComments()}}>{ this.state.commentsOpen ? "Hide" : "Show" } comments</p>
						<br />
						{
							this.state.showLoader && this.state.commentsOpen &&
							<p>Loading comments for the post...</p>
						}
						{
							this.state.commentsOpen && !this.state.showLoader &&
							<div className="post-detail-comments-inner-container">
								{
									this.state.comments.map((comment)=>(
										<div className="padding-medium margin-medium post-detail-comment-container" key={comment.id}>
											<div className="post-detail-comment-name-outer">
												<span className="padding-medium post-detail-commenter-name">{comment.name}</span> <a href={`mailto:${comment.email}`}><img src={require("../local-data/images/email.svg")} height="30px" alt="email icon" /></a>
											</div>
											<br />
												<p className="post-detail-comment-body">{comment.body}</p>
											<br />
										</div>
									))
								}
							</div>
						}
					</div>
				</div>
				</center>
			</div>
		)
	}
}