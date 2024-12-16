import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    return (
        <section className='signUp container mx-auto px-6 py-10'>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-2'>
                {/* user sign up form */}
                <div className="w-full">
                    <form className="max-w-md mx-auto">
                        <h1 className="text-2xl font-medium text-gray-800 capitalize sm:text-3xl dark:text-white mb-5">Sign Up</h1>

                        {/* fullname */}
                        <div className="w-full mb-3">
                            <label for="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Full Name</label>
                            <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Full Name" />
                        </div>

                        {/* email */}
                        <div className="w-full mb-3">
                            <label for="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Email Address</label>
                            <input type="email" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email Address" />
                        </div>

                        {/* create password */}
                        <div className="w-full mb-3">
                            <label for="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Create Password</label>
                            <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Create Password" />
                        </div>

                        {/* repeat password */}
                        <div className="w-full mb-3">
                            <label for="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Repeat Password</label>
                            <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Repeat Password" />
                        </div>

                        <div className="mt-5">
                            <button type="submit" className="w-full py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Sign Up</button>

                            <p className="mt-4 text-center text-gray-600 dark:text-gray-400">or sign up with</p>

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