/*eslint-disable*/
import React, { Fragment, useEffect } from 'react';
import { getProfileById } from '../../actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = () => {
    const profile  = useSelector( state => state.profile.profile);
    const loading  = useSelector( state => state.profile.loading);
    const auth = useSelector( state => state.auth);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getProfileById(id));
    }, [id]);
    return (
    <Fragment>
        {profile === null || loading ? <Spinner/> : <Fragment>
            <Link to='/profiles' className='btn btn-light'>
                Back to profiles
            </Link>
            {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                    Edit Profile
                </Link>
            )}
            <div className='profile-grid my-1'>
                <ProfileTop profile={profile}/>
                <ProfileAbout profile={profile} />
                <div className='profile-exp bg-white p-2'>
                    <h2 className='text-primary'>Experience</h2>
                    {profile.experience.length > 0 ? (
                        profile.experience.map(exp => <ProfileExperience key={exp._id} experience={exp} />)
                    ) : (<h4>No Experience Credentials</h4>)}
                </div>
                <div className='profile-edu bg-white p-2'>
                    <h2 className='text-primary'>Education</h2>
                    {profile.education.length > 0 ? (
                        profile.education.map(edu => <ProfileEducation key={edu._id} education={edu} />)
                        
                    ) : (<h4>No Education Credentials</h4>)}
                </div>
                {profile.githubusername && (
                    <ProfileGithub key={1} username={profile.githubusername} />
                )}
            </div>
        </Fragment>}
    </Fragment>
  )
}

export default Profile; 
