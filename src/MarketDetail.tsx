import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MarketDetail.css';

function MarketDetail() {
  let params = useParams();

  return (
    <div className='market-detail'>
      <span>Hello World {params.key}</span>
    </div>
  );
}

export default MarketDetail;
