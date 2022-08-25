import { link } from 'fs';
import React from 'react';
import { Product, VersionedProductData } from '../../api/data';
import { baseUrl } from '../../api/marketApi';
import './Meta.css';

type MetaProps = {
  product: Product;
  versionedData: VersionedProductData;
};

const Meta = ({ product, versionedData }: MetaProps) => {
  const sourceUrlDomain = (sourceUrl: string) => new URL(sourceUrl).host;
  const getInTouchLink = `https://www.axonivy.com/marketplace/contact/?market_solutions=${product.key}`;

  return (
    <div className='product-meta'>
      <div className='product-meta-title'>Information</div>
      <a className='product-meta-vendor' href={product.vendorUrl}>
        <img className='image fit' src={baseUrl + product.vendorImage} alt={product.vendor} />
      </a>
      <MetaInfo type='Author/Support' data={product.vendor} />
      <MetaInfo type='Version' data={product.version} />
      <MetaInfo type='Compatibility' data={product.compatibility} />
      <MetaInfo type='Cost' data={product.cost} />
      {product.language && <MetaInfo type='Language' data={product.language} />}
      <MetaInfo type='Type' data={product.type} />

      <div className='product-meta-spaceer'></div>

      {product.industry && <MetaInfo type='Industry' data={product.industry} />}
      <MetaInfo type='Tags' data={product.tags.join(', ')} />

      <div className='product-meta-spaceer'></div>

      {versionedData.docUrl && (
        <MetaInfo type='Documentation' link={{ url: `${baseUrl}/${versionedData.docUrl}`, text: 'External Link' }} />
      )}
      {versionedData.openApiUrl && (
        <MetaInfo type='Public API' link={{ url: `${baseUrl}/api-browser?url=${versionedData.openApiUrl}`, text: 'Browse API' }} />
      )}
      {product.sourceUrl && <MetaInfo type='Source' link={{ url: product.sourceUrl, text: sourceUrlDomain(product.sourceUrl) }} />}
      {product.statusBadgeUrl && <MetaInfo type='Status' imgUrl={product.statusBadgeUrl} />}

      <div className='product-meta-spaceer'></div>

      <MetaInfo type='More Information' link={{ url: getInTouchLink, text: 'Contact us' }} />
    </div>
  );
};

type MetaInfoProps = {
  type: string;
  data?: string;
  link?: { url: string; text: string };
  imgUrl?: string;
};

const MetaInfo = (props: MetaInfoProps) => {
  return (
    <div className='product-meta-info'>
      <span className='meta-type'>{props.type}</span>
      <span className='meta-data'>
        {props.data && props.data}
        {props.link && <a href={props.link.url}>{props.link.text}</a>}
        {props.imgUrl && <img src={props.imgUrl} />}
      </span>
    </div>
  );
};

export default Meta;
