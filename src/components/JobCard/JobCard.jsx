import React from 'react';
import { BookmarkIcon, MapPinIcon, BanknotesIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline'
import bookmark from '../../assets/bookmark.png';
import bookmark_fill from '../../assets/bookmark-fill.png';

const JobCard = ({ job }) => {
    const { _id, title, job_description, responsibilities, requirements, expiration_date, salary, category, job_type, hr_name, hr_email, company_logo, company_name } = job;

    return (
        <div className='jobCard p-2 rounded-md border cursor-default'>
            {/* company logo, job title & bookmark icon */}
            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <img src={company_logo} alt="" className='w-[35px] h-[35px] rounded-md' />
                    <h1 className='text-slate-800 text-sm font-medium cursor-pointer'>{title}</h1>
                </div>

                {/* bookmark icon */}
                <div className='p-2 rounded-full hover:bg-blue-100 active:bg-transparent'>
                    <BookmarkIcon className='size-5 text-gray-500 hover:text-gray-600 active:text-gray-500' />
                </div>
            </div>

            <div className='mt-2 flex flex-wrap gap-2'>
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
        </div>
    );
};

export default JobCard;