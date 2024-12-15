import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import JobCard from '../../../components/JobCard/JobCard';
import { Link } from 'react-router-dom';

const FeaturedJobs = () => {
    const [featuredJobs, setFeaturedJobs] = useState([]);
    const axiosPublic = useAxiosPublic();
    console.log(featuredJobs);

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosPublic.get('/jobs');
                const data = await res.data;
                setFeaturedJobs(data);
            }catch(err){
                console.error(err);
            }
        };
        fetchData();
    }, [axiosPublic, setFeaturedJobs]);

    return (
        <section className='featuredJobs container mx-auto px-6 py-10'>
            <SectionTitle title="Featured Jobs" subTitle="Know your worth and find the job that qualify your life" />

            {/* dynamic jobs */}
            {/* <div className='jobs grid gap-5 grid-cols-1 lg:grid-cols-2'> */}
                {
                    featuredJobs.length === 0 ?
                        <div className='w-full mx-auto flex items-center justify-center'>
                            <div className="animate-spin block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                                <span class="sr-only">Loading...</span>
                            </div> 
                        </div> :
                        <div className='jobs grid gap-5 grid-cols-1 lg:grid-cols-2'>
                            {featuredJobs?.slice(0, 6).map(job => <JobCard key={job._id} job={job} />)}
                        </div>
                }
            {/* </div> */}

            {/* load more listing button */}
            <div className='w-full flex items-center justify-center mt-10'>
                <Link to="/findJobs">
                    <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Load More Listing</button>
                </Link>
            </div>
        </section>
    );
};

export default FeaturedJobs;