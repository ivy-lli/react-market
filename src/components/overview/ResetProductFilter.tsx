import React from 'react';
import './ResetProductFilter.css';

type ResetProductFilterProps = {
  onClick: () => void;
};

const ResetProductFilter = (props: ResetProductFilterProps) => {
  return (
    <div className='product-filter-reset'>
      <a href='#' onClick={props.onClick}>
        <i className='si si-undo'></i> Reset Filter
      </a>
    </div>
  );
};

export default ResetProductFilter;
