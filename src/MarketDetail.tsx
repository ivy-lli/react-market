import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from './api/data';
import { getProductData } from './api/marketApi';
import Description from './components/detail/Description';
import Header from './components/detail/Header';
import Meta from './components/detail/Meta';
import ProductData from './components/detail/ProductData';
import Loading from './components/Loading';
import './MarketDetail.css';

function MarketDetail() {
  const params = useParams();
  const key = params.key ? params.key : '';

  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    getProductData(key).then(data => {
      setProduct(data.product);
    });
  }, []);

  return (
    <div className='market-detail'>
      {product === undefined && <Loading />}
      {product && (
        <>
          <Header product={product} />
          <ProductData product={product} />
          <div className='product-info'>
            <Description description='blabla' />
            <Meta product={product} />
          </div>
        </>
      )}
    </div>
  );
}

export default MarketDetail;
