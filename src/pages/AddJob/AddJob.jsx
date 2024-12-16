import React from 'react';
import { useForm } from "react-hook-form"
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import useAuth from '../../hooks/useAuth';

const AddJob = () => {
    const { user } = useAuth();
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        // responsibilities
        const responsibilities_array = data.responsibilities.split(',').map(item => item.trim()).filter(item => item);
        data.responsibilities = responsibilities_array;

        // requirements
        const requirements_array = data.requirements.split(',').map(item => item.trim()).filter(item => item);
        data.requirements = requirements_array;

        // hr_info
        data.hr_name = user?.displayName;
        data.hr_email = user?.email;

        console.log(data);
    };

    return (
        <section className='addJob container mx-auto px-6 py-10'>
            <SectionTitle title="Add a new job" />

            {/* add new job form */}
            <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
                {/* company_name & company_logo */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {/* company_name */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Company Name</label>
                        <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Company Name" {...register("company_name", { required: true })} />
                    </div>

                    {/* company_logo */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Company Logo</label>
                        <input type="file" name="file-input" id="file-input" className="block w-full border border-gray-200 outline-none shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400" {...register("company_logo", { required: true })} />
                    </div>
                </div>

                {/* title & category */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {/* title */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Job Title</label>
                        <input type="text" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Job Title" {...register("title", { required: true })} />
                    </div>

                    {/* category */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Category</label>
                        <select className="py-2 px-4 pe-9 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" {...register("category", { required: true })}>
                            <option value="accounting/finance">Accounting/Finance</option>
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

                {/* job_type & job_category */}
                <div className='grid gap-5 grid-cols-1 md:grid-cols-2'>
                    {/* job_type */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Job Type</label>
                        <select className="py-2 px-4 pe-9 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" {...register("job_type", { required: true })}>
                            <option value="full time">Full Time</option>
                            <option value="part time">Part Time</option>
                            <option value="intern">Intern</option>
                        </select>
                    </div>

                    {/* job_category */}
                    <div className="w-full mb-3">
                        <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Job Category</label>
                        <select className="py-2 px-4 pe-9 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" {...register("job_category", { required: true })}>
                            <option value="on site">On site</option>
                            <option value="remote">Remote</option>
                            <option value="hybrid">Hybrid</option>
                        </select>
                    </div>
                </div>

                {/* salary */}
                <div>
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Salary</label>

                    <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {/* min */}
                        <div className="w-full mb-3">
                            <input type="number" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Min salary" {...register("salary.min", { required: true })} />
                        </div>

                        {/* max */}
                        <div className="w-full mb-3">
                            <input type="number" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Max salary" {...register("salary.max", { required: true })} />
                        </div>

                        {/* currency */}
                        <div className="w-full mb-3">
                            <select className="py-2 px-4 pe-9 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" {...register("salary.currency", { required: true })}>
                                <option value="bdt">BDT</option>
                                <option value="usd">USD</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* expiration_date */}
                <div className="mb-3">
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Expiration Date</label>
                    <input type="date" id="input-label" className="py-2 px-4 block w-full outline-none border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Job Title" {...register("expiration_date", { required: true })} />
                </div>

                {/* responsibilities */}
                <div className='mb-3'>
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Responsibilities</label>
                    <textarea className="py-2 px-4 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Write every job responsibilities in a new line with comma" {...register("responsibilities", { required: true })}></textarea>
                </div>

                {/* requirements */}
                <div className='mb-3'>
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Requirements</label>
                    <textarea className="py-2 px-4 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Write every job requirements in a new line with comma" {...register("requirements", { required: true })}></textarea>
                </div>

                {/* job_description */}
                <div className='mb-3'>
                    <label htmlFor="input-label" className="block text-sm text-slate-700 mb-1 dark:text-white">Job Description</label>
                    <textarea className="py-2 px-4 block w-full border border-gray-200 outline-none rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" rows="3" placeholder="Write your job description" {...register("job_description", { required: true })}></textarea>
                </div>

                <button type="submit" className="w-full py-2 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 active:bg-blue-100 focus:outline-none focus:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-400 dark:bg-blue-800/30 dark:hover:bg-blue-800/20 dark:focus:bg-blue-800/20">Add Job</button>
            </form>
        </section>
    );
};

export default AddJob;