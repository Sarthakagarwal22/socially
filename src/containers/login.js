import { connect } from 'react-redux';
import { loginSuccessful,loginUnsuccessful } from '../actions';
import Login from '../components/login';

const mapStatetoProps = state => ({
	loginSuccessful: state.loginSuccessful
});
const mapDispatchtoProps = dispatch => ({
	successfulLogin : () =>{
		dispatch(loginSuccessful());
		window.location = "/#/home";
	},
	unsuccessfulLogin : ()=>{dispatch(loginUnsuccessful())},
	reset: () => {
		dispatch(loginSuccessful())
	}
});
export default connect (mapStatetoProps,mapDispatchtoProps)(Login);