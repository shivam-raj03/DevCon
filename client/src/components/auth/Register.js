import React, { Fragment, useState } from 'react';
//import axios from "../../http";
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import { useDispatch, useSelector } from 'react-redux';



const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const {name, email, password, password2} = formData;

    const onChange = (e) => {
      //console.log(e.target);
      setFormData(prevState => {
        return {...prevState, [e.target.name]: e.target.value}
      });
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        if(password !== password2){
          dispatch(setAlert('Passwords do not match!', 'danger', 3000));
        }
        else{
          dispatch(register({name, email, password}));
        }
       
    }
    // redirect if register successful

    if(isAuthenticated){
      return <Navigate to='/dashboard' />;
    }

    return (
    <Fragment>
       <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input 
          type="text" 
          placeholder="Name" 
          name="name" value={name} 
          onChange={onChange} 
          //required 
          />
        </div>
        <div className="form-group">
          <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email} 
          onChange={onChange} 
          //required   
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
          
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} 
            onChange={onChange} 
            //required
            //minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
            onChange={onChange} 
            //required
            //minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

// Register.PropTypes = {
//   setAlert: PropTypes.func.isRequired
// }

export default Register;
