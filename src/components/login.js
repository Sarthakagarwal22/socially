import React from 'react';
import './stylesheets/login.css'

export default class Login extends React.Component{
	
	constructor(props){
		super(props);
		this.state = {
			validUsername:true,
			validPassword:true,
			loginAttempt:0
		}
		this.validateUsername = this.validateUsername.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.resestValidUsernameAndPassword = this.resestValidUsernameAndPassword.bind(this);
		this.loginMethod = this.loginMethod.bind(this);
	}

	validateUsername(username){
		this.setState({validUsername:username.length > 0});
	}

	validatePassword(password){
		this.setState({validPassword:password.length > 0});
	}

	resestValidUsernameAndPassword(){
		this.setState({validPassword:true,validUsername:true})
		this.props.reset()
	}
	
	loginMethod(username,password) {
		this.resestValidUsernameAndPassword()
		if(username === "sarthakagarwal22" && password === "infeedo")
			this.props.successfulLogin()
		else
			this.props.unsuccessfulLogin()
	}

	render(){
		let username;
		let password;
		let {
			loginSuccessful,
		} = this.props
		return(
			<div className="main">
			<div className="left">
				<div className="heading">
					<h2>Login to Socially</h2>
					<br />
					<br />
					<p className="sub-heading">Please enter your credentials</p><br/>
					<label className="email_label">USERNAME <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					autoFocus 
					ref={node => {username=node}} 
					type="text" 
					name="user" 
					className="email_input" 
					onKeyPress={(event) => {
						if(event.which===13){
							this.validateUsername(username.value);
							password.focus();
						}
					}} 
					onBlur={(event) => {
						this.validateUsername(username.value)
					}} 
					style = {{borderColor : (!this.state.validUsername && this.state.loginAttempt>0) ? "red":"var(--light-grey)"}}/> <br/>
					</label>
					<br/>

					<label className="email_label">PASSWORD <span style={{color:"red"}}> *</span><br/>
					<input 
					autoComplete="off"
					ref={node => {password=node}}
					type="password" 
					name="pass" 
					className="pass_input" 
					onKeyPress={(event)=>{
						if(event.which===13){
							this.validatePassword(password.value);
							if(this.state.validUsername && this.state.validPassword){
								this.loginMethod(username.value,password.value)
							}
						}
					}} 
					onBlur={(event)=>{
						this.validatePassword(password.value)
					}} 
					style={{borderColor : (this.state.loginAttempt > 0 && !this.state.validPassword) ? "red":"var(--light-grey)"}}/> <br/>
					</label><br/>
					
					<button onClick={()=>{
						this.setState({loginAttempt:this.state.loginAttempt+1})
						this.validateUsername(username.value);
						this.validatePassword(password.value);
						if(this.state.validUsername && this.state.validPassword)
							this.loginMethod(username.value,password.value)}
					} style={{background: (!loginSuccessful && this.state.loginAttempt>0) ? "red":"var(--blue)"}}>Login</button>
					
					{
						!loginSuccessful && this.state.loginAttempt>0 && 
						<p className="small red">Password or User combination is wrong</p>
					}
					{
						!this.state.validUsername && this.state.loginAttempt>0 && 
						<p className="small red">Empty Username field</p>
					}
					{
						!this.state.validPassword && this.state.loginAttempt>0 && 
						<p className="small red">Empty Password field</p>
					}

				</div>	
			</div>
			<div className="right">
			</div>
			</div>
		);
	}
}
