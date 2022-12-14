import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../api/data';
import { baseUrl } from '../../api/marketApi';

type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  const navigate = useNavigate();
  const productOnClick = (url: string) => navigate(url);

  return (
    <div className='product-card zoom' onClick={() => productOnClick(product.key)}>
      <div className={'product-type ' + product.type}></div>
      <div className='product-tags p-grid p-dir-rev'>
        <span className='product-tag'>{product.tags[0]}</span>
      </div>
      <div className='product-logo'>
        <img src={baseUrl + product.vendorImage} alt={product.name} className='image' />
      </div>
      <div className='product-title'>{product.name}</div>
      <div className='product-desc'>{product.shortDesc}</div>
    </div>
  );
};

export default ProductCard;
