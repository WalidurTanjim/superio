import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import useAuth from '../../hooks/useAuth';

const Header = () => {
    const [showProfileBtns, setShowProfileBtns] = useState(false);
    const { user, logOut } = useAuth();

    // signOutHandler
    const signOutHandler = () => {
        logOut()
        .then(() => {
            console.log('Logout successfully');
        })
        .catch(err => {
            console.error(err);
        })
    };


    return (
        <header className="header sticky top-0 z-50">
            <div className="container mx-auto px-6 flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
                <nav className="max-w-[85rem] w-full mx-auto flex flex-wrap basis-full items-center justify-between">
                    {/* logo */}
                    <Link to="/" className="sm:order-1 flex-none text-xl font-semibold dark:text-white focus:outline-none focus:opacity-80">
                        <img src={logo} alt="Logo" className="h-[30px]" />
                    </Link>

                    {/* toggle & sign in button */}
                    <div className="sm:order-3 flex items-center gap-x-2">
                        {/* toggle button */}
                        <button type="button" className="md:hidden hs-collapse-toggle relative size-7 flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" id="hs-navbar-alignment-collapse" aria-expanded="false" aria-controls="hs-navbar-alignment" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-alignment">
                            <svg className="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
                            <svg className="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                            <span className="sr-only">Toggle</span>
                        </button>

                        {/* sign in button */}
                        {
                            user ?
                            <>
                                {
                                    user?.photoURL ? 
                                    <img src={user?.photoURL} alt="" className='w-[30px] h-[30px] rounded-full border' /> :
                                    <div className='relative'>
                                        <p onClick={() => setShowProfileBtns(!showProfileBtns)} className='text-white bg-orange-600 px-2 py-1 rounded-full border border-orange-500 hover:bg-orange-400 active:bg-orange-500 cursor-pointer'>{user?.email.charAt(0).toUpperCase()}</p>
                                        
                                        {
                                            showProfileBtns && user ?
                                            <div className='absolute mt-3 right-0 border rounded-md w-48 bg-white'>
                                                <Link to="/profile"><p className='w-full py-2 px-3 text-sm hover:bg-gray-100 rounded-md'>Profile</p></Link>
                                                <Link to="/application/me"><p className='w-full py-2 px-3 text-sm hover:bg-gray-100 rounded-md'>My Applications</p></Link>
                                                <Link to="/addJob"><p className='w-full py-2 px-3 text-sm hover:bg-gray-100 rounded-md'>Add Job</p></Link>
                                                <Link to="/myJobs"><p className='w-full py-2 px-3 text-sm hover:bg-gray-100 rounded-md'>My Job Posts</p></Link>
                                                <p className='w-full py-2 px-3 text-sm hover:bg-gray-100 rounded-md' onClick={signOutHandler}>Sign out</p>
                                            </div> : undefined
                                        }
                                    </div>

                                }
                            </> :
                            <Link to='/signIn'>
                                <button type="button" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">Sign in</button>
                            </Link>
                        }
                    </div>

                    {/* nav links */}
                    <div id="hs-navbar-alignment" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:grow-0 sm:basis-auto md:block sm:order-2" aria-labelledby="hs-navbar-alignment-collapse">
                        <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:mt-0 sm:ps-5">
                            <NavLink to="/" className="font-medium text-blue-500 focus:outline-none" aria-current="page">Home</NavLink>
                            <NavLink to="/findJobs" className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500">Find Jobs</NavLink>
                            <NavLink to="/employers" className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500">Employers</NavLink>
                            <NavLink to="/candidates" className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500">Candidates</NavLink>
                            <NavLink to="/blog" className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500">Blog</NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;