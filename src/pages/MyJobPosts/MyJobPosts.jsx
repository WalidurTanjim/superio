import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PostedJob from '../../components/PostedJob/PostedJob';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';

const MyJobPosts = () => {
    const [jobs, setJobs] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosPublic.get(`/myPostedJobs?email=${user?.email}`);
                const data = await res.data;

                if(data){
                    setJobs([...data]);
                }else{
                    setJobs([]);
                }
            }catch(err){
                setErrMsg(err?.response?.data?.message);
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="myJobPosts container mx-auto px-6 py-10">
            {/* header */}
            <div className='flex items-center justify-between'>
                {/* jobs length */}
                <div className="flex items-center gap-x-3">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">My posted jobs</h2>
                    <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{jobs?.length ? jobs?.length : 0}</span>
                </div>

                {/* addJob btn */}
                <Link to="/addJob">
                    <button type="button" className="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Add Job</button>
                </Link>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            {/* table starts */}
                            {
                                errMsg ? 
                                <div className='w-full py-5 flex items-center justify-center'>
                                    <h1 className='text-xl font-medium text-red-500'>{errMsg}</h1>
                                </div> :
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    {/* thead */}
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            {/* company_logo & company_name */}
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <div className="flex items-center gap-x-3">
                                                    <span>Company Name</span>
                                                </div>
                                            </th>
                                            
                                            {/* role */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                                <button className="flex items-center gap-x-2">
                                                    <span>Role</span>

                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                                                    </svg>
                                                </button>
                                            </th>

                                            {/* salary */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Salary</th>

                                            {/* hr_email */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email address</th>

                                            {/* terms */}
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Teams</th>

                                            {/* delete & edit btns */}
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Edit</span>
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* tbody */}
                                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                        {
                                            jobs?.map(job => <PostedJob key={job._id} job={job} />)
                                        }
                                    </tbody>
                                </table>
                            }
                            {/* table ends */}
                        </div>
                    </div>
                </div>
            </div>

            {/* pagination div starts */}
            <div className="flex items-center justify-between mt-6">
                {/* previous button */}
                <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                    </svg>

                    <span>previous</span>
                </a>

                <div className="items-center hidden lg:flex gap-x-3">
                    <a href="#" className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">2</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">3</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">...</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">12</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">13</a>
                    <a href="#" className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">14</a>
                </div>

                {/* next button */}
                <a href="#" className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                    <span>Next</span>

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 rtl:-scale-x-100">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                </a>
            </div>
        </section>
    );
};

export default MyJobPosts;