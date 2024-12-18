import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import SocialLogIn from '../../components/SocialLogIn/SocialLogIn';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const { signInUser, forgotPassword } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const triggeredLocation = location.state?.from?.pathname;
    // console.log(triggeredLocation);

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        setErrMsg('');

        // signInUserWithFirebase
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            // console.log("SignIn user:", user);
            navigate(triggeredLocation || '/');
        })
        .catch(err => {
            console.error(err);
            setErrMsg(err.message);
        })

        // console.log(data);
    };

    return (
        <section className='signIn container mx-auto px-6 py-10'>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-2'>
                {/* user sign up form */}
                <div className="w-full">
                    <form className="max-w-md mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white mb-5">Sign In</h1>

                        {/* email */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Email Address</label>
                            <input type="email" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email Address" {...register("email", { required: true})} />
                        </div>

                        {/* password */}
                        <div className="w-full mb-3">
                            <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Password</label>
                            <input type={showPassword ? 'text' : 'password'} id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Password" {...register("password", { required: true})} />
                        </div>
                        {errMsg ? <p className='text-xs text-red-500 mt-1'>{errMsg}</p> : undefined}

                        {/* show password & forgot password */}
                        <div className="mt-5 flex items-center justify-between text-xs">
                            {/* show password */}
                            <div className="flex gap-2">
                                <input type="checkbox" name="checkbox" id="checkbox" onClick={() => setShowPassword(!showPassword)} />
                                <p className='text-gray-500'>Show Password</p>
                            </div>

                            {/* forgot password */}
                            <p className='text-blue-500 hover:text-blue-600 active:text-blue-500 hover:underline cursor-default'>Forgot Password?</p>
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="w-full py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Sign In</button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign up with</p>

                            {/* sign in via google */}
                            <SocialLogIn title="Sign in" />

                            <div className="mt-6 text-center ">
                                <p className="text-sm text-gray-500 dark:text-white cursor-default">Don't have an account? <Link to="/signUp" className='text-blue-500 hover:text-blue-600 active:text-blue-500 hover:underline'>Sign Up</Link></p>
                            </div>
                        </div>
                    </form>
                </div>

                {/* lottie animation div */}
            </div>
        </section>
    );
};

export default SignIn;