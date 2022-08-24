import React from 'react';
import './Header.css';
import { Product } from '../../api/data';
import { baseUrl } from '../../api/marketApi';

type HeaderProps = {
  product: Product;
};

const Header = ({ product }: HeaderProps) => {
  return (
    <div className='product-detail-header'>
      <h1>
        <img src={baseUrl + product.vendorImage} className='image' alt={product.name} />
        {product.name}
      </h1>
    </div>
  );
};

export default Header;
