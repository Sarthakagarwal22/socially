import { connect } from 'react-redux';
import { loginSuccessful,loginUnsuccessful } from '../actions';
import Login from '../components/login';
import history from '../history'

const mapStatetoProps = state => ({
	loginSuccessful: state.loginSuccessful
});
const mapDispatchtoProps = dispatch => ({
	successfulLogin : () =>{
		dispatch(loginSuccessful());
		history.push("/home");
	},
	unsuccessfulLogin : ()=>{dispatch(loginUnsuccessful())},
	reset: () => {
		dispatch(loginSuccessful())
	}
});
export default connect (mapStatetoProps,mapDispatchtoProps)(Login);