import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';


const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  //console.log(isAuthenticated);
  const dispatch = useDispatch();
  const onClick = () =>{
    console.log('Hello! I am in onclick function')
    dispatch(logout());
  } 

  const authlinks = (
    <ul>
        <li>
          <Link to="/profiles">
              Developers
          </Link>
          <Link to="/posts">
              Posts
          </Link>
          
        </li>
        <li>
          <Link to="/dashboard"></Link>
          <i className='fas fa-user'>{' '}</i>
          <span className='hide-sm'>Dashboard</span>
        </li>
        <li>
          <a onClick={onClick} href="#!">
            <i className='fas fa-sign-out-alt'>{' '}</i>
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
        
    </ul>
  );


  const guestlinks = (
    <ul>
        <li>
          <Link to="/profiles">
            Developers
          </Link>
        </li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  );
  
  
  
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to='/'><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <Fragment>{isAuthenticated ? authlinks : guestlinks}</Fragment>
    </nav>
  )
}

export default Navbar;
