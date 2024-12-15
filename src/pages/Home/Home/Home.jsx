import React from 'react';
import Banner from '../Banner/Banner';
import JobCategories from '../JobCategories/JobCategories';
import FeaturedJobs from '../FeaturedJobs/FeaturedJobs';

const Home = () => {
    return (
        <section className='home'>
            <div className='py-10 bg-gradient-to-r from-[#fafcff] to-[#edf2fc]'>
                <Banner />
            </div>
            <JobCategories />
            <FeaturedJobs />
        </section>
    );
};

export default Home;