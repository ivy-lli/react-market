import React from 'react';
import { baseUrl } from '../api/marketApi';
import { Product } from '../api/product';
import './ProductCard.css';

type ProductProps = {
  product: Product;
};

function ProductCard({product}: ProductProps) {
  return (
    <div className='product-card zoom' onClick={() => productOnClick(product.url)}>
      <div className={'product-type ' + product.type }></div>
      <div className='product-tags p-grid p-dir-rev'>
        <span className='product-tag'>{ product.tags[0] }</span>
      </div>
      <div className='product-logo'>
        <img src={ baseUrl + product.vendorImage } alt={ product.name } className='image' />
      </div>
      <div className='product-title'>
        { product.name }
      </div>
      <div className='product-desc'>
        { product.shortDesc }
      </div>
    </div>
  );
}

const productOnClick = (url: string) => location.href = url;

export default ProductCard;
