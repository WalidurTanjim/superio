import React, { useEffect, useState } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useForm } from "react-hook-form"
import { AdjustmentsHorizontalIcon, BanknotesIcon, BookmarkIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Swal from 'sweetalert2';

const ApplyJob = () => {
    const [errMsg, setErrMsg] = useState('');
    const [job, setJob] = useState({});
    const { _id, title, job_description, responsibilities, requirements, expiration_date, salary, category: ctg, job_type, job_category, hr_name, hr_email, company_logo, company_name } = job;
    // console.log(salary);
    const { category, id } = useParams();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

    // fetch data & set to job state
    useEffect(() => {
        try{
            const fetchData = async() => {
                const res = await axiosPublic.get(`/findJobs/${category}/${id}`);
                const data = await res?.data;

                if(data){
                    setJob(data);

                    // set default value using react-hook-form setValue
                    setValue('fullname', user?.displayName),
                    setValue('email', user?.email)
                }else{
                    setJob({});
                }
            };
            fetchData();
        }catch(err){
            console.error(err);
            setErrMsg(err.message);
        }
    }, []);

    const onSubmit = (data) => {
        setErrMsg('');

        // add _id as job_id
        data.job_id = _id;
        const newData = data;
        // console.log(newData);

        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to apply this job?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, apply it!"
        }).then((result) => {
            if (result.isConfirmed) {
                try{
                    const fetchData = async() => {
                        const res = await axiosPublic.post('/applyJob', newData);
                        // console.log(res?.data);
        
                        if(res?.data?.insertedId){
                            Swal.fire({
                                title: "Congratulations",
                                text: "Your application submitted",
                                icon: "success"
                            });
                            navigate('/');
                        }
                    }
                    fetchData();
                }catch(err){
                    console.error(err);
                    setErrMsg(err.message);
                }
            }
        });
    }
    
    return (
        <section className='applyJob container mx-auto px-6 py-10'>
            <SectionTitle title="Apply this job" />

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
                                <span className='ps-1'>{ctg}</span>
                            </h1>
        
                            {/* salary */}
                            <h1 className='text-xs text-gray-500 flex items-center'>
                                <BanknotesIcon className='size-3' />
                                <span className='ps-1'>{salary?.min} - {salary?.max} {salary?.currency}</span>
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
                        {/* <button type="button" className="py-1.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20" onClick={() => handleApplyJob(_id)}>Apply for job</button> */}

                        <div className='p-2 rounded-lg hover:bg-blue-100 active:bg-transparent'>
                            <BookmarkIcon className='size-5 text-gray-500 hover:text-gray-600 active:text-gray-500' />
                        </div>
                    </div>
                </div>
            </div>

            <form className='mt-10' onSubmit={handleSubmit(onSubmit)}>
                {/* user fullname & email */}
                <div className='grid gap-x-5 grid-cols-1 md:grid-cols-2'>
                    {/* fullname */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Full Name</label>
                        <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Full Name" {...register("fullname", { required: true})} />
                    </div>

                    {/* email */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Email Address</label>
                        <input type="email" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email Address" {...register("email", { required: true})} />
                    </div>
                </div>

                {/* user phone & resume url */}
                <div className='grid gap-x-5 grid-cols-1 md:grid-cols-2'>
                    {/* phone */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Phone Number</label>
                        <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Phone Number" {...register("phone", { required: true})} />
                    </div>

                    {/* resume */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Resume URL</label>
                        <input type="url" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Resume URL" {...register("resume", { required: true})} />
                    </div>
                </div>

                {/* why_choose_you */}
                <div className='mb-3'>
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Why should I hire you?</label>
                    <textarea className="py-2 px-4 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Write your comment here..." {...register("why_choose_you", { required: true })}></textarea>
                </div>

                {errMsg ? <p className='text-xs font-medium text-red-500'>{errMsg}</p> : undefined}

                <button type="submit" className="w-full py-2 px-4 mt-3 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Apply Job</button>
            </form>
        </section>
    );
};

export default ApplyJob;