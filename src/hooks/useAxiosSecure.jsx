import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(response => {
            return response;
        }, error => {
            if(error?.status === 401 || error?.status === 403){
                logOut()
                .then(() => {
                    console.log("logout from interceptors");
                    navigate('/signIn')
                })
                .catch(err => {
                    console.error("interceptors error:", err?.message);
                })
            }

            return Promise.reject(error);
        })
    }, [logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;