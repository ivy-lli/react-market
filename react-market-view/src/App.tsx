import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { getArtifacts } from './api/marketApi';
import ProductCard from './components/ProductCard';
import {Product} from './api/product';

function App() {
  const [artifacts, setArtifacts] = useState<Product[]>([]);
  useEffect(() => {
    getArtifacts().then(_artifacts => {
      setArtifacts(_artifacts.artifacts);
    });
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <div className='products'>
        {artifacts.map(artifact => <ProductCard key={artifact.key} product={artifact} />)}
      </div>
    </div>
  );
}

export default App;
