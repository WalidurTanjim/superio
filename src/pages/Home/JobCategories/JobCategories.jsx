import React, { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import './JobCategories.css';
import { Link } from 'react-router-dom';

const JobCategories = () => {
    const [categories, setCategories] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const res = await axiosPublic.get('/categories');
                const data = await res.data;
                setCategories(data);
            }catch(err){
                console.error(err);
            }
        };
        fetchData();
    }, [axiosPublic, setCategories]);


    return (
        <section className='jobCategories container mx-auto px-6 py-10'>
            <SectionTitle title="Popular Job Categories" subTitle="2020 jobs live - 293 added today" />

            <div className='categories grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    categories?.map(ctg => {
                        const { _id, category, icon } = ctg;

                        return (
                            <Link to={`/findJobs/${_id}`}>
                                <div key={_id} className='category p-3 border rounded-xl flex gap-2 cursor-default hover:shadow-md transform transition-all ease-in-out duration-150'>
                                    <div className='categoryIconDiv border rounded-md p-2 bg-blue-50'>
                                        <img src={icon} alt="" className='categoryIcon w-[25px]' />
                                    </div>
                                    <span className='text-slate-700 font-medium'>{category}</span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default JobCategories;