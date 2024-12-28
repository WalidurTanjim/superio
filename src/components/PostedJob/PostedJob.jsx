import React, { useState } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { TrashIcon, PencilSquareIcon, XMarkIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline'

const PostedJob = ({ job }) => {
    const { _id, company_name, company_logo, hr_email, title, category, job_type, job_category, salary } = job;

    const [errMsg, setErrMsg] = useState('');
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    // deleteHandler
    const deleteHandler = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try{
                    const fetchData = async() => {
                        const res = await axiosPublic.delete(`/myPostedJobs/${id}?email=${user?.email}`)
                        // const res = await axiosPublic.delete(`/myPostedJobs/${id}?email=tanjim@gmail.com`)
                        const data = await res.data;

                        if(data?.deletedCount > 0){
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your job post has been deleted.",
                                icon: "success"
                            });
                            navigate('/');
                        }
                    };
                    fetchData();
                }catch(err){
                    setErrMsg(err?.response?.data?.message);
                    console.error(err);
                }
            }
        });
    };

    return (
        <tr>
            {/* company_logo & company_name */}
            <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div className="flex items-center gap-x-2">
                    <img className="object-cover w-10 h-10 rounded-full" src={company_logo} alt="" />

                    <div>
                        <h2 className="font-medium text-gray-800 dark:text-white ">{company_name}</h2>
                        <p className="text-xs font-normal text-gray-600 dark:text-gray-400">Total bids: <span className='text-blue-500 font-medium'>{job?.applicants && job?.applicants}</span></p>
                    </div>
                </div>
            </td>

            {/* role */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{title}</td>
            
            {/* salary */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <span>{salary?.min}</span> -
                <span> {salary?.max}</span> 
                <span> {salary?.currency}</span>
            </td>

            {/* hr_email */}
            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{hr_email}</td>

            {/* terms */}
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-2">
                    <p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">{category}</p>
                    <p className="px-3 py-1 text-xs text-blue-500 rounded-full dark:bg-gray-800 bg-blue-100/60">{job_type}</p>
                    <p className="px-3 py-1 text-xs text-pink-500 rounded-full dark:bg-gray-800 bg-pink-100/60">{job_category}</p>
                </div>
            </td>

            {/* delete & edit btns */}
            <td className="px-4 py-4 text-sm whitespace-nowrap">
                <div className="flex items-center gap-x-6">
                    {/* view application btn */}
                    <Link to={`/viewApplications/${category}/${_id}`}>
                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                        <EyeIcon className="size-5 text-gray-500" />
                    </button>
                    </Link>

                    {/* accept btn */}
                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => deleteHandler(_id)}>
                        <CheckIcon className="size-5 text-gray-500" />
                    </button>

                    {/* reject btn */}
                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => deleteHandler(_id)}>
                        <XMarkIcon className="size-5 text-gray-500" />
                    </button>

                    {/* delete btn */}
                    <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" onClick={() => deleteHandler(_id)}>
                        <TrashIcon className="size-5 text-gray-500" />
                    </button>

                    {/* edit btn */}
                    <Link to={`/updateJob/${category}/${_id}`}>
                        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                            <PencilSquareIcon className="size-5 text-gray-500" />
                        </button>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default PostedJob;