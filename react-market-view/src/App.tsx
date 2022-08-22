import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { getArtifacts } from './api/marketApi';
import ProductCard from './components/ProductCard';
import { Product } from './api/product';
import ProductFilter from './components/ProductFilter';

function App() {
  const [artifacts, setArtifacts] = useState<Product[]>([]);
  useEffect(() => {
    getArtifacts().then(_artifacts => {
      setArtifacts(_artifacts.artifacts);
    });
  }, []);

  return (
    <div className='App'>
      <ProductFilter />
      <div className='contribute-hint'>
        Contribute to the community and build your own connector. <a href='https://dev.axonivy.com/link/market-contribute'>How to?</a>
      </div>
      <div className='products'>
        {artifacts.map(artifact => (
          <ProductCard key={artifact.key} product={artifact} />
        ))}
      </div>
    </div>
  );
}

export default App;
