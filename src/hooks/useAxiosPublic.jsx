import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuth';

const axiosPublic = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})

const useAxiosPublic = () => {
    const auth = useAuth();
    // const navigate = useNavigate();

    useEffect(() => {
        axiosPublic.interceptors.response.use(response => {
            return response;
        }, error => {
            if(error?.status === 401 || error?.status === 403){
                auth?.logOut?.()
                .then(() => {
                    // navigate('/signIn')
                })
                .catch(err => {
                    console.error(err);
                })
            }

            return Promise.reject(error);
        })
    } , [auth?.logOut]);

    return axiosPublic;
};

export default useAxiosPublic;
