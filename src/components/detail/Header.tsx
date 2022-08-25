import React, { useState } from 'react';
import './Header.css';
import { Product } from '../../api/data';
import { baseUrl } from '../../api/marketApi';
import { CSSTransition } from 'react-transition-group';

type HeaderProps = {
  product: Product;
};

const Header = ({ product }: HeaderProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  const getInTouchLink = `https://www.axonivy.com/marketplace/contact/?market_solutions=${product.key}`;
  const buttonOnClick = (newActiveSection: string) => {
    if (activeSection === newActiveSection) {
      setActiveSection('');
    } else {
      setActiveSection(newActiveSection);
    }
  };

  return (
    <>
      <div className='product-detail-header'>
        <h1>
          <img src={baseUrl + product.vendorImage} className='image' alt={product.name} />
          {product.name}
        </h1>

        <HeaderButton name='Install now' section='install-warn' onClick={buttonOnClick} />
        <HeaderButton name='Download' section='download' onClick={buttonOnClick} outlined={true} />
        {product.contactUs && <ContactUsButton getInTouchLink={getInTouchLink} />}
      </div>
      <CSSTransition in={activeSection === 'install-warn'} timeout={300} classNames='section' unmountOnExit>
        <InstallSection />
      </CSSTransition>
    </>
  );
};

type HeaderButtonProps = {
  name: string;
  section: string;
  onClick: (newActiveSection: string) => void;
  outlined?: boolean;
};

const HeaderButton = (props: HeaderButtonProps) => {
  return (
    <button className={props.outlined ? 'outlined' : ''} onClick={() => props.onClick(props.section)}>
      <span>{props.name}</span>
    </button>
  );
};

type ContactUsButtonProps = {
  getInTouchLink: string;
};

const ContactUsButton = ({ getInTouchLink }: ContactUsButtonProps) => {
  return (
    <a className='button' href={getInTouchLink}>
      <span>Contact us</span>
    </a>
  );
};

const InstallSection = () => {
  const section = 'install-warn';
  return (
    <div className='product-install-open-market'>
      <i className='si si-info'></i>
      <span> Please open the </span>
      <a href={`${baseUrl}/doc/dev/market/index.html`}>Axon Ivy Market</a> inside your
      <a href={`${baseUrl}/download`}>Axon Ivy Designer</a> (min 9.2.0)
    </div>
  );
};

export default Header;
