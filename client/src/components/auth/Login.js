import React, { Fragment, useState } from 'react';

import { Link, Navigate } from 'react-router-dom';
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    const onChange = (e) => {
      //console.log(e.target);
      setFormData(prevState => {
        return {...prevState, [e.target.name]: e.target.value}
      });
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        dispatch(login({email, password})); 
    }
    
    //Redirect if logged in
    if(isAuthenticated){
      return <Navigate to='/dashboard' />;
    }

    return (
    <Fragment>
       <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email} 
            onChange={onChange} 
            required 
          />
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={onChange} 
            required
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  );
    
}

export default Login;
