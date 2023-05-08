/*eslint-disable*/
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import  { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';



const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);
  const {loading, profile} = useSelector(state => state.profile);
  const { user } = useSelector(state => state.auth);

  return loading && profile === null ? <Spinner /> : 
  (<Fragment>
    <h1 className='large text-primary'>Dashboard</h1>
    <p className='lead'><i className='fas fa-user'></i>Welcome { user && user.name } </p>
    {profile !== null ? 
    <Fragment>
      <DashboardActions/> 
      <Experience />
      <Education />

      <div className='my-2'>
            <button className='btn btn-danger' onClick={ () => dispatch(deleteAccount())}>
              <i className='fas fa-user-minus'></i>Delete My Account
            </button>
      </div>

    </Fragment> : 
    <Fragment>
      <p>You have not setup a profile yet, pleaseadd some info</p>
      <Link to='/create-profile' className='btn btn-primary my-1'>Create Profile</Link> 

    </Fragment>}
  </Fragment>);
  
};

export default Dashboard;
