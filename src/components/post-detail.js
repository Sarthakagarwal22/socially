import React from 'react';
import Modal from 'react-bootstrap-modal';

import {getRequest} from '../helpers/api-response';

import {baseUrl,fetchPostUrl} from '../local-data/config' 

import history from '../history';

import 'react-bootstrap-modal/lib/css/rbm-complete.css';
import './stylesheets/post-detail.css'

export default class PostDetail extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			commentsOpen:false,
			showLoader:false,
			comments:[],
			post:{},
			showEditModal:false,
			showSaveChangesButton:false
		}	
		this.postId = "";
		this.post = {};
		this.editedTitle = null;
		this.editedBody = null;
		this.fetchPostFromGlobalState = this.fetchPostFromGlobalState.bind(this);
		this.fetchComments = this.fetchComments.bind(this);
		this.saveEditedPost = this.saveEditedPost.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.fetchPostsFromApi = this.fetchPostsFromApi.bind(this);
		this.setPostIdFromUrl = this.setPostIdFromUrl.bind(this);
	}

	async fetchComments(){
		this.setState({showLoader:true,commentsOpen:!this.state.commentsOpen})
		var comments = await getRequest(baseUrl+`/${this.postId}/comments`);
		console.log(comments)
		var filteredComments = comments.filter((comment)=> comment.postId === +this.postId)
		this.setState({comments:filteredComments,showLoader:false})
	}

	closeModal(){
		this.setState({showEditModal:false})
	}

	deletePost(){
		if(window.confirm("Are you sure you want to delete this post")){
			var modifiedPostsArray = this.props.postsArray.filter((post) => post.id !== +this.postId);
			this.props.setPostsArray(modifiedPostsArray);
			this.props.setDeletedPostsArray(this.state.post)
			history.push("/home");
		}
	}

	fetchPostFromGlobalState(){
		this.post = this.props.postsArray.find((post) => post.id === +this.postId)
		this.setState({post:this.post})
	}

	saveEditedPost(title,body){
		var newPost = {
			id:this.state.post.id,
			userId:this.state.post.userId,
			title:title,
			body:body
		}
		this.setState({post:newPost})
		var updatedPostsArray = this.props.postsArray.map((post)=>{
			if(post.id === this.state.post.id)
				return newPost
			else
				return post
		})
		this.props.setPostsArray(updatedPostsArray);
		this.closeModal()
	}

	setPostIdFromUrl(){
		this.postId = window.location.pathname.split("/posts/")[1]
	}

	async fetchPostsFromApi(){
		var posts = await getRequest(fetchPostUrl);
		this.props.setPostsArray(posts);
		this.fetchPostFromGlobalState();
	}

	componentDidMount(){
		this.setPostIdFromUrl()
		if(this.props.postsArray.length > 0)
			this.fetchPostFromGlobalState();

	}

	render(){
		return(
			<div className="post-detail-main">
				<center><h1 className="padding-Xlarge white"> Details of Post {this.postId}</h1>
				<div className="post-detail-card rounded-corner padding-Xlarge">
					<br />
					<div className="post-detail-post-header">
						<span className="post-detail-user-badge">{this.state.post.userId}</span>
						<div className="post-detail-edit-delete">
							<span className="clickable" onClick={()=>{this.setState({showEditModal:true,showSaveChangesButton:false})}}><img src={require("../local-data/images/edit.svg")} height="20px" alt="edit icon" /> Edit Post </span> &nbsp;&nbsp;
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
				<Modal
		          show={this.state.showEditModal}
		          onHide={this.closeModal}
		          aria-labelledby="ModalHeader"
		        >
		        <Modal.Header closeButton>
		            <h4>Edit the post</h4>
		        </Modal.Header>
		          <Modal.Body>
		          {
		          	
		          	<div>
				        <label> Edit Title <br />
				          <input 
				          ref={node => {this.editedTitle=node}}
			              autoFocus
				          type="text" 
				          defaultValue={this.state.post.title}
				          onChange = {()=>{
				          	this.setState({showSaveChangesButton:true})
				          }}
				          />
				        </label>
			            
			            <br />
			            <br />
			            
			            <label> Edit Body <br />
			          	  <textarea
			          	  	ref={node => {this.editedBody=node}} 
			          	  	className="post-details-edit-body" 
			          	  	defaultValue={this.state.post.body}
			          	  	onChange = {()=>{
				          	this.setState({showSaveChangesButton:true})
				          	}}
			          	  	/>
						</label>
						{
							this.state.showSaveChangesButton &&
							<center><br /><button className="post-detail-save-changes-button" onClick={()=>{this.saveEditedPost(this.editedTitle.value,this.editedBody.value)}}>Save Changes</button></center>
						}
					</div>
					}
		          </Modal.Body>
		        </Modal>
			</div>
		)
	}
}