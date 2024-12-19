import React, { useEffect, useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { BookmarkIcon, MapPinIcon, BanknotesIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import useAuth from '../../hooks/useAuth';
import moment from 'moment';

const JobDetails = () => {
    const [applyBtnDisabled, setApplyBtnDisabled] = useState(false);
    const loadedJob = useLoaderData();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const formattedDate = moment().format('YYYY-MM-DD');
    const { _id, title, job_description, responsibilities, requirements, expiration_date, salary, category, job_type, job_category, hr_name, hr_email, company_logo, company_name } = loadedJob;
    // console.log({formattedDate, expiration_date});

    useEffect(() => {
        if(formattedDate > expiration_date){
            setApplyBtnDisabled(true);
        }
    }, []);

    // handleApplyJob
    const handleApplyJob = id => {
        if(user){
            // console.log('apply job:', id);
            navigate(`/applyJob/${category}/${_id}`)
        }else{
            navigate('/signIn', { state: { from: location } }, { replace: true })
        }
    }

    return (
        <section className='jobDetails py-10'>
            {/* jobHeader div starts */}
            <div className='jobHeader container mx-auto px-6 py-10 rounded-md grid grid-cols-1 lg:grid-cols-3 bg-[#F3F7FC]'>
                {/* company logo, title, category, salary & location div starts */}
                <div className='flex flex-col md:flex-row gap-3 col-span-1 lg:col-span-2 mb-5 lg:mb-0'>
                    <img src={company_logo} alt="" className='rounded-md w-[95px] h-[95px]' />

                    {/* title, category, salary & location div starts */}
                    <div className='title_category_salary_locationDiv'>
                        <h1 className='text-lg md:text-2xl text-slate-700 font-medium'>{title}</h1>

                        {/* category, salary & location */}
                        <div className='my-2 flex flex-wrap gap-2'>
                            {/* category */}
                            <h1 className='text-xs text-gray-500 flex items-center'>
                                <AdjustmentsHorizontalIcon className='size-3' />
                                <span className='ps-1'>{category}</span>
                            </h1>
        
                            {/* salary */}
                            <h1 className='text-xs text-gray-500 flex items-center'>
                                <BanknotesIcon className='size-3' />
                                <span className='ps-1'>{salary.min} - {salary.max} {salary.currency}</span>
                            </h1>
        
                            {/* location */}
                            <h1 className='text-xs text-gray-500 flex items-center'>
                                <MapPinIcon className='size-3' />
                                <span className='ps-1'>London</span>
                            </h1>
                        </div>

                        {/* job_type & job_category */}
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-800/30 dark:text-blue-500 me-2">{job_type}</span>
                        <span className="inline-flex items-center gap-x-1.5 py-1 px-3 rounded-full text-xs bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500 me-2">{job_category}</span>
                    </div>
                </div>

                {/* apply for jobs button & bookmark icon */}
                <div className='col-span-1 lg:col-span-1'>
                    <div className='flex gap-3'>
                        <div>
                            <button type="button" disabled={applyBtnDisabled} className={`${applyBtnDisabled ? 'cursor-not-allow' : ''} py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20`} onClick={() => handleApplyJob(_id)}>Apply for job</button>
                            {applyBtnDisabled ? <p className='text-xs text-red-500 mt-2'>Expiration date over. You can't apply this job. Try another.</p> : undefined}
                        </div>

                        <div className='p-2 rounded-lg hover:bg-blue-100 active:bg-transparent'>
                            <BookmarkIcon className='size-5 text-gray-500 hover:text-gray-600 active:text-gray-500' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JobDetails;