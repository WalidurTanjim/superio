import React from 'react';

const SectionTitle = ({ title, subTitle }) => {
    return (
        <div className='sectionTitle pb-10 w-full text-center'>
            <h1>{title}</h1>
            <p>{subTitle && subTitle}</p>
        </div>
    );
};

export default SectionTitle;