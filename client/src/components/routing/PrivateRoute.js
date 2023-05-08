import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({element}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    return element;
    
}

export default PrivateRoute;
