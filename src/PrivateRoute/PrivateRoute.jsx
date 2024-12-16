import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className='w-full py-10 flex gap-2 items-center justify-center'>
                <h1 className='text-slate-700 text-2xl'>Loading</h1>
                <div className="animate-spin inline-block size-5 border-[2px] border-current border-t-transparent text-slate-700 rounded-full dark:text-gray-300" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }

    if (user) {
        return children;
    }

    return <Navigate to="/signIn" state={{ from: location }} replace={true} />
};

export default PrivateRoute;