import axios from '../http';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, CLEAR_PROFILE } from './types';
import { setAlert} from './alert';
import setAuthToken from '../utilis/setAuthToken';


//Load User
export const loadUser = () => async dispatch =>{
    
    if(localStorage.token){
        //console.log("Inside setAuthtoken");
        setAuthToken(localStorage.token);
    }
    try {
        //console.log('before get request');
        
        const res =  await axios.get('/api/auth');
        
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (err) {
        //console.log('Dispatching auth error');
        //console.log({err})
        dispatch({
            type: AUTH_ERROR
        });
    }
    
}



//Register User
export const register = ({name, email, password}) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    const body = JSON.stringify({name, email, password});
    try {
        const res = await axios.post('/api/user', body);
        //console.log(res.data);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: REGISTER_FAIL   
        });
    }
};

//Login User

export const login = (email, password) => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    const body = JSON.stringify(email, password);
    try {
        
        const res = await axios.post('/api/auth', body);
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            console.log(errors);
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: LOGIN_FAIL   
        });
    }
};

// Logout / clear the profile

export const logout = () => dispatch => {
    //console.log("Hi I am in logout function, just before dispatch");
    dispatch({
        type: LOGOUT
    });
    dispatch({
        type: CLEAR_PROFILE
    })
} 

