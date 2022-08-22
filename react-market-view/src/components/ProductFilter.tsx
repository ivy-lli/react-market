import React from 'react';
import { Multiselect } from 'react-widgets/cjs';
import './ProductFilter.css';
import 'react-widgets/styles.css';

const ProductFilter = () => {
  return (
    <div className='product-filter'>
      <Multiselect data={['connector', 'demo']} placeholder='Topics' showPlaceholderWithValues={true} />
      <input className='product-filter-search' />
    </div>
  );
};

export default ProductFilter;
