import React, { useEffect, useState } from 'react';
import JobCard from '../../../components/JobCard/JobCard';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const FindJobs = () => {
    const [search, setSearch] = useState('');
    const [categorySearch, setCategorySearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [jobsCount, setJobsCount] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const numberOfPages = Math.ceil(jobsCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()];

    const axiosPublic = useAxiosPublic();
    
    // fetch all jobs from database
    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosPublic.get(`/jobs?page=${currentPage}&size=${itemsPerPage}&search=${search}&categorySearch=${categorySearch}`);
                const data = await res.data;

                if(data){
                    setJobs([...data]);
                }else{
                    setJobs([]);
                }
            }catch(err){
                console.error(err);
            }
        };
        fetchData();
    }, [axiosPublic, currentPage, itemsPerPage, search, categorySearch, setJobs]);

    // get jobs length from server
    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosPublic.get('/jobsCount');
                const data = await res?.data?.count;

                if(data > 0){
                    setJobsCount(data);
                }else{
                    setJobsCount(0);
                }
            }catch(err){
                console.error(err);
            }
        };
        fetchData();
    }, [axiosPublic, setJobsCount]);

    // handleItemsPerPage
    const handleItemsPerPage = e => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0);
    }

    // handleReset
    const handleReset = e => {
        e.preventDefault();

        setSearch('');
        setCategorySearch('');
    }

    return (
        <section className='findJobs container mx-auto px-6 py-10'>
            <div className='grid gap-5 grid-cols-1 lg:grid-cols-3'>
                {/* filterDiv starts */}
                <div className='filterDiv hidden lg:grid lg:col-span-1 bg-[#F5F7FC] p-3 rounded-md'>
                    <div>
                        {/* search by keywords */}
                        <div className='searchByKeywords mb-7'>
                            <div className='flex items-center justify-between mb-2'>
                                <h1 className='text-lg text-slate-700 font-medium mb-2'>Search by keywords</h1>

                                <button type="button" className="py-1 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-md border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20" onClick={handleReset}>Reset</button>
                            </div>

                            <form>
                                <div className='flex items-center'>
                                    <input type="search" className="py-3 px-4 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-300 focus:ring-blue-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Job title, keyword" onChange={e => setSearch(e.target.value)} />
                                </div>
                            </form>
                        </div>

                        {/* category */}
                        <div className='category mb-7'>
                            <h1 className='text-lg text-slate-700 font-medium mb-2'>Category</h1>

                            <select className="py-3 px-4 pe-9 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" onChange={e => setCategorySearch(e.target.value)}>
                                <option value="">Select your category</option>
                                <option value="accounting & finance">Accounting & Finance</option>
                                <option value="marketing">Marketing</option>
                                <option value="design">Design</option>
                                <option value="development">Development</option>
                                <option value="human resource">Human Resource</option>
                                <option value="automotive jobs">Automotive Jobs</option>
                                <option value="customer service">Customer Service</option>
                                <option value="health & care">Health & Care</option>
                                <option value="project management">Project Management</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* jobsDiv starts */}
                <div className='jobsDiv grid-cols-1 lg:col-span-2 p-2'>
                    {/* header */}

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

                    {/* pagination div starts */}
                    <div className="pagination flex items-center justify-center py-5">
                        {/* prev button */}
                        <button onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : currentPage)} className={`text-sm px-3 border rounded-md bg-gray-50 hover:bg-gray-100 active:bg-gray-50 mx-1`}>Prev</button>

                        {/* pages */}
                        {
                            pages?.map(page => <button key={page} onClick={() => setCurrentPage(page)} className={`${currentPage === page && 'bg-orange-500 hover:bg-orange-600 active:bg-orange-400  border-orange-500 text-white'} px-2 text-sm rounded-md border mx-1 bg-gray-50 hover:bg-gray-100 active:bg-gray-50`}>{page}</button>)
                        }

                        {/* next button */}
                        <button onClick={() => setCurrentPage(currentPage < pages.length - 1 ? currentPage + 1 : currentPage)} className={`text-sm px-3 border rounded-md bg-gray-50 hover:bg-gray-100 active:bg-gray-50 mx-1`}>Next</button>

                        {/* itemsPerPage dropdown */}
                        <select className="px-3 pe-4 block border-gray-200 rounded-md text-sm outline-none border focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" value={itemsPerPage} onChange={handleItemsPerPage}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FindJobs;