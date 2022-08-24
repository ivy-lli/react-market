import React from 'react';
import { Multiselect } from 'react-widgets/cjs';
import './ProductFilter.css';
import 'react-widgets/styles.css';

type ProductFilterProps = {
  tags: string[];
  selectedTags: string[];
  onTagChange: (newSelectedTags: string[]) => void;
  searchFilter: string;
  onInputChange: (newSearchInput: string) => void;
};

const ProductFilter = (props: ProductFilterProps) => {
  return (
    <div className='product-filter'>
      <Multiselect
        data={props.tags}
        value={props.selectedTags}
        placeholder='Topics'
        showPlaceholderWithValues={true}
        onChange={value => props.onTagChange(value)}
      />
      <input className='product-filter-search' value={props.searchFilter} onChange={event => props.onInputChange(event.target.value)} />
    </div>
  );
};

export default ProductFilter;
