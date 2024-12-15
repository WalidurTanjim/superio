import React from 'react';
import { BookmarkIcon, MapPinIcon, BanknotesIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
    const { _id, title, job_description, responsibilities, requirements, expiration_date, salary, category, job_type, job_category, hr_name, hr_email, company_logo, company_name } = job;

    return (
        <Link to={`/findJobs/${category}/${_id}`}>
            <div className='jobCard p-3 rounded-md border cursor-default group hover:shadow-md transition-all ease-in-out duration-150'>
                {/* company logo, job title & bookmark icon */}
                <div className='flex justify-between'>
                    {/* company logo & job title */}
                    <div className='flex gap-2'>
                        <img src={company_logo} alt="" className='w-[35px] h-[35px] rounded-md' />
                        <h1 className='text-slate-800 text-sm font-medium cursor-pointer group-hover:text-blue-500 transition-all ease-in-out duration-100'>{title}</h1>
                    </div>

                    {/* bookmark icon */}
                    <div className='p-2 rounded-full hover:bg-blue-100 active:bg-transparent'>
                        <BookmarkIcon className='size-5 text-gray-500 hover:text-gray-600 active:text-gray-500' />
                    </div>
                </div>

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
        </Link>
    );
};

export default JobCard;