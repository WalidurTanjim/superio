import React from 'react';

const JobSearch = () => {
    return (
        <section className='jobSearch w-full mb-5 flex items-center'>
            <input type="email" id="input-label" name="jobSearch" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-s-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Search job" />
            
            <button type="button" className="py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-e-md border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Search</button>
        </section>
    );
};

export default JobSearch;