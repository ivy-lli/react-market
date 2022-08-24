import React from 'react';
import './Description.css';

type DescriptionProps = {
  description: string;
};

const Description = ({ description }: DescriptionProps) => {
  return (
    <div className='product-description'>
      <span className='tab-button selected'>
        <a href='#tabs' className='product-description-tab'>
          Description
        </a>
      </span>
      <div id='description' className='readme-content'>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Description;
