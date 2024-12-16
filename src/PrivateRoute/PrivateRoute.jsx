import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if(loading){
        return (
            <div className='w-full py-10 flex items-center justify-center'>
                <h1>Loading...</h1>
            </div>
        )
    }

    if(user){
        return children;
    }

    return <Navigate to="/signIn" state={{ from: location }} replace={true} />
};

export default PrivateRoute;