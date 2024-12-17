import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import JobCard from '../../../components/JobCard/JobCard';
import JobSearch from '../../../components/JobSearch/JobSearch';

const FindJobs = () => {
    const loadedJobs = useLoaderData();
    const [jobs, setJobs] = useState([]);
    
    useEffect(() => {
        if(loadedJobs){
            setJobs([...loadedJobs]);
        }else{
            setJobs([]);
        }
    }, []);

    return (
        <section className='findJobs container mx-auto px-6 py-10'>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
                {/* filterDiv starts */}
                <div className='filterDiv hidden lg:grid lg:col-span-1 bg-[#F5F7FC] p-3 rounded-md'>
                    <div>
                        {/* search by keywords */}
                        <div className='searchByKeywords mb-7'>
                            <h1 className='text-lg text-slate-700 font-medium mb-2'>Search by keywords</h1>

                            <form>
                                <div className='flex items-center'>
                                    <input type="text" className="py-3 px-4 block w-full border border-gray-200 outline-none rounded-s-lg text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Job title, keyword" />

                                    <button type="submit" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-e-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Search</button>
                                </div>
                            </form>
                        </div>

                        {/* category */}
                        <div className='category mb-7'>
                            <h1 className='text-lg text-slate-700 font-medium mb-2'>Category</h1>

                            <select multiple="" data-hs-select='{
                                "placeholder": "Select multiple options...",
                                "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
                                "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 ps-4 pe-9 flex gap-x-2 text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-neutral-600",
                                "dropdownClasses": "mt-2 z-50 w-full max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700",
                                "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800",
                                "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"shrink-0 size-3.5 text-blue-600 dark:text-blue-500 \" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>",
                                "extraMarkup": "<div class=\"absolute top-1/2 end-3 -translate-y-1/2\"><svg class=\"shrink-0 size-3.5 text-gray-500 dark:text-neutral-500 \" xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m7 15 5 5 5-5\"/><path d=\"m7 9 5-5 5 5\"/></svg></div>"
                                }' className="hidden">
                                <option value="">Choose</option>
                                <option>Name</option>
                                <option>Email address</option>
                                <option>Description</option>
                                <option>User ID</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* jobsDiv starts */}
                <div className='jobsDiv grid-cols-1 lg:col-span-2 p-2'>
                    {/* header */}

                    {/* search jobs */}
                    <JobSearch />

                    {/* all jobs */}
                    {
                        jobs.length === 0 ? 
                        <div className='w-full mx-auto flex items-center justify-center'>
                            <div className="animate-spin block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span className="sr-only">Loading...</span>
                            </div> 
                        </div> : 
                        <div className='jobs grid gap-y-5'>
                            {
                                jobs?.map(job => <JobCard key={job._id} job={job} />)
                            }
                        </div>
                    }
                </div>
            </div>
        </section>
    );
};

export default FindJobs;