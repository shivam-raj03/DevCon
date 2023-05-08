/*eslint-disable*/
import axios from '../http';
import {setAlert} from './alert';
import { CLEAR_PROFILE, DELETE_ACCOUNT, GET_PROFILE, PROFILE_ERROR , UPDATE_PROFILE, GET_PROFILES} from './types';
import { useNavigate} from 'react-router-dom';

//Get current user profile

export const getCurrentProfile = () => async dispatch =>{
    try {
        const res = await axios.get('api/profile/me');
        //console.log("hello I am in getCurrentProfile function");
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        //  console.log('hello');
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText}
        });
    }
};

//Get all profile

export const getAllProfiles = () => async dispatch =>{
    
    try {
        const res = await axios.get('api/profile');
        
        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get profile by id

export const getProfileById = (userId) => async dispatch =>{
    try {
        const res = await axios.get(`api/profile/user/${userId}`);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Get github repos

export const getGithubRepos = (userName) => async dispatch =>{
    try {
        const res = await axios.get(`api/profile/github/${userName}`);
        
        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};


// Create or update profile

export const createProfile = (formData, edit = false) => async dispatch => {
    try {
        
        const res = await axios.post('/api/profile', formData);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
        const navigate = useNavigate();
        if(!edit){
            navigate('/dashboard');
        }

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
}

// Add experience

export const addExperience = (formData) => async dispatch => {
        
    

    try {
        
        const res = await axios.put('/api/profile/experience', formData);
        //console.log('hello after adding experience')
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience added', 'success'));
        const navigate = useNavigate();
        
        navigate('/dashboard');
        return res.data;

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }    
}

// Add Education

export const addEducation = (formData) => async dispatch => {
    try {
        
        const res = await axios.put('/api/profile/education', formData);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education added', 'success'));
        const navigate = useNavigate();
        
        navigate('/dashboard');

        return res.data;

    } catch (err) {
        
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }    
}

//Delete experience using experience id

export const deleteExperience = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Delete experience using education id

export const deleteEducation = (id) => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed', 'success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,    
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

//Delete account and profile

export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are you sure! This acan not be undone')){
        try {
            const res = await axios.delete('/api/profile');
    
            dispatch({
                type: CLEAR_PROFILE
            });

            dispatch({
                type: DELETE_ACCOUNT
            });
    
            dispatch(setAlert('Your account permanently deleted'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,    
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }

    
};
