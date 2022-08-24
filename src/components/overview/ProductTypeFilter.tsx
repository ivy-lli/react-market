import React from 'react';
import { Type } from '../../api/data';
import './ProductTypeFilter.css';

type ProductTypeFilterProps = {
  types: Type[];
  activeType: string;
  onClick: (newActiveType: string) => void;
};

const ProductTypeFilter = (props: ProductTypeFilterProps) => {
  return (
    <div className='product-type-filter types'>
      {props.types.map(type => (
        <ProductType key={type.filter} type={type} selected={type.filter === props.activeType} onClick={props.onClick} />
      ))}
    </div>
  );
};

type ProductTypeProps = {
  type: Type;
  selected: boolean;
  onClick: (newActiveType: string) => void;
};

const ProductType = (props: ProductTypeProps) => (
  <div
    className={'type' + (props.selected ? ' selected' : '')}
    data-filter={props.type.filter}
    onClick={() => props.onClick(props.type.filter)}
  >
    <i className={'si ' + props.type.icon} />
    {props.type.name}
  </div>
);

export default ProductTypeFilter;
