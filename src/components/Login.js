import React from 'react';
import PropTypes from 'prop-types';

//I'm a stateless functional component
//stateless functional components don't use `this` 

//note: we simply pass in our `props` as an argument of `Login` 

const Login = (props) => (
    <nav className="login">
        <h2>Inventory Login</h2>
        <p>Store Owner?  Login here...</p>
        <button 
            className="github"
            onClick={() => props.authenticate("Github")}
        >
            Log In with Github
        </button>
        
        <button 
            className="twitter"
            onClick={() => props.authenticate("Twitter")}
        >
            Log In with Twitter
        </button>

        <button 
            className="facebook"
            onClick={() => props.authenticate("Facebook")}
        >
            Log In with Facebook
        </button>
    </nav>
);

Login.propTypes = {
    authenticate: PropTypes.func.isRequired
};

export default Login;



