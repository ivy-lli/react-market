import React from 'react';
import './ProductData.css';
import { Product } from '../../api/data';
import DataTag from './DataTag';

type ProductDataProps = {
  product: Product;
};

const ProductData = ({ product }: ProductDataProps) => {
  return (
    <div className='product-data'>
      <DataTag name='Review' content={product.platformReview} starCount={Number(product.platformReview)} />
      <DataTag name='Installations' content={product.installationCount} info='times' />
      <DataTag name='Type' icon={product.typeIcon} info={product.type} />
    </div>
  );
};

export default ProductData;
