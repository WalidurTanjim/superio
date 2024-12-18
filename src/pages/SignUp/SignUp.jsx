import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialLogIn from '../../components/SocialLogIn/SocialLogIn';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const SignUp = () => {
    const [createPasswordErrMsg, setCreatePasswordErrMsg] = useState('');
    const [repeatPasswordErrMsg, setRepeatPasswordErrMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const { createUser, updateUserProfile, verifyEmail } = useAuth();
    const passRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setCreatePasswordErrMsg('');
        setRepeatPasswordErrMsg('');
        setErrMsg('');

        // createPassword & repeatPassword validation
        if(!passRegEx.test(data.createPassword)){
            return setCreatePasswordErrMsg('Password should be uppercase, lowercase, digits & at least 6 chars');
        }
        if(data.repeatPassword !== data.createPassword){
            return setRepeatPasswordErrMsg('Both are not equal');
        }

        // createUserWithFirebase
        createUser(data.email, data.repeatPassword)
        .then(result => {
            const user = result.user;
            // console.log("SignUp user:", user);
            updateUserProfileHandler(user, data.fullname);
            verifyEmailHandler(user);
            navigate('/');
        })
        .catch(err => {
            console.error(err);
            setErrMsg(err.message);
        })

        // console.log(data);
    }

    // updateUserProfileHandler
    const updateUserProfileHandler = (user, username) => {
        updateUserProfile(user, username)
        .then(() => {
            toast.success('Profile updated successfully');
        })
        .catch(err => {
            console.error(err);
            setErrMsg(err.message);
        })
    };

    // verifyEmailHandler
    const verifyEmailHandler = email => {
        verifyEmail(email)
        .then(() => {
            toast.success('Verification mail send');
        })
        .catch(err => {
            console.error(err);
            setErrMsg(err.message);
        })
    }

    return (
        <section className='signUp container mx-auto px-6 py-10'>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-2'>
                {/* user sign up form */}
                <div className="w-full">
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white mb-5">Sign Up</h1>

                        {/* fullname */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Full Name</label>
                            <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Full Name" {...register("fullname", { required: true})} />
                        </div>

                        {/* email */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Email Address</label>
                            <input type="email" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email Address" {...register("email", { required: true})} />
                        </div>

                        {/* create password */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Create Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Create Password" {...register("createPassword", { required: true})} />
                            {createPasswordErrMsg ? <p className='text-xs text-red-500 mt-1'>{createPasswordErrMsg}</p> : undefined}
                        </div>

                        {/* repeat password */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Repeat Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Repeat Password" {...register("repeatPassword", { required: true})} />
                            {repeatPasswordErrMsg ? <p className='text-xs text-red-500 mt-1'>{repeatPasswordErrMsg}</p> : undefined}
                        </div>

                        {errMsg ? <p className='text-xs text-red-500 mt-1'>{errMsg}</p> : undefined}
                        
                        {/* show password */}
                        <div className="mt-5 flex gap-2 text-xs">
                            <input type="checkbox" name="checkbox" id="checkbox" onClick={() => setShowPassword(!showPassword)} />
                            <p className='text-gray-500'>Show Password</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="w-full py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Sign Up</button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign up with</p>

                            {/* sign up via google */}
                            <SocialLogIn title="Sign up" />

                            <div className="mt-6 text-center ">
                                <p className="text-sm text-gray-500 dark:text-white cursor-default">Already have an account? <Link to="/signIn" className='text-blue-500 hover:text-blue-600 active:text-blue-500 hover:underline'>Sign In</Link></p>
                            </div>
                        </div>
                    </form>
                </div>

                {/* lottie animation div */}
            </div>
        </section>
    );
};

export default SignUp;