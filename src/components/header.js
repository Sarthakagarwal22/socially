import React from 'react';
import history from '../history.js'
import './stylesheets/header.css';

export default class Header extends React.Component {
	render(){
		return(
			<div className="main_header" >
				<div className="left_header">
					<h2 className="clickable" onClick={()=>{history.push("/home")}}>Socially</h2>
				</div>
				<div className="right_header">
					<span className="clickable" onClick={()=>{this.props.logoutUser()}}> Logout </span>
				</div>
			</div>
		) 
	}
}