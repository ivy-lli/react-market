import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { getMarketData } from './api/marketApi';
import ProductCard from './components/ProductCard';
import { Product, Type } from './api/data';
import ProductFilter from './components/ProductFilter';
import ProductTypeFilter from './components/ProductTypeFilter';
// import 'http://localhost/assets/css/icons.css';

function App() {
  const [artifacts, setArtifacts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [activeType, setActiveType] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchFilter, setSearchFilter] = useState<string>('');
  useEffect(() => {
    getMarketData().then(data => {
      setArtifacts(data.artifacts);
      setProducts(data.artifacts);
      setTypes(data.types);
      setTags(data.tags);
    });
  }, []);

  const filterByType = (newActiveType: string): void => {
    setActiveType(newActiveType);
    if (newActiveType === '') {
      setProducts(artifacts);
    } else {
      setProducts(artifacts.filter(artifact => artifact.type === newActiveType));
    }
  };

  const filterByTags = (newSelectedTags: string[]): void => {
    setSelectedTags(newSelectedTags);
    if (newSelectedTags.length === 0) {
      setProducts(artifacts);
    } else {
      setProducts(artifacts.filter(artifact => artifact.tags.some(tag => newSelectedTags.includes(tag.toLocaleUpperCase()))));
    }
  };

  const filterBySearch = (newSearchInput: string): void => {
    setSearchFilter(newSearchInput);
    const filter = newSearchInput.toLocaleLowerCase();
    if (filter === '') {
      setProducts(artifacts);
    } else {
      setProducts(
        artifacts.filter(
          artifact => artifact.name.toLocaleLowerCase().includes(filter) || artifact.shortDesc.toLocaleLowerCase().includes(filter)
        )
      );
    }
  };

  return (
    <div className='App'>
      <ProductFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={(newSelectedTags: string[]) => filterByTags(newSelectedTags)}
        onInputChange={(newSearchInput: string) => filterBySearch(newSearchInput)}
      />
      <ProductTypeFilter types={types} activeType={activeType} onClick={(newActiveType: string) => filterByType(newActiveType)} />
      <div className='contribute-hint'>
        Contribute to the community and build your own connector. <a href='https://dev.axonivy.com/link/market-contribute'>How to?</a>
      </div>
      <div className='products'>
        {products.map(product => (
          <ProductCard key={product.key} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;
