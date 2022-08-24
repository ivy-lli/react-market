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

      <HeaderButton name='Install now' />
      <HeaderButton name='Download' outlined={true} />
      {product.contactUs && <HeaderButton name='Contact us' />}
    </div>
  );
};

type HeaderButtonProps = {
  name: string;
  outlined?: boolean;
};

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <button className={props.outlined ? 'outlined' : ''}>
      <span>{props.name}</span>
    </button>
  );
};

export default Header;
