import React, { useEffect, useState } from 'react';
import './MarketOverview.css';
import { getMarketData } from './api/marketApi';
import { Product, Type } from './api/data';
import Loading from './components/Loading';
import ProductFilter from './components/overview/ProductFilter';
import ProductTypeFilter from './components/overview/ProductTypeFilter';
import ResetProductFilter from './components/overview/ResetProductFilter';
import ProductCard from './components/overview/ProductCard';

const DEFAULT_ACTIVE_TYPE = '';
const DEFAULT_SELECTED_TAGS: string[] = [];
const DEFAULT_SEARCH_FILTER = '';

function MarketOverview() {
  const [artifacts, setArtifacts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [activeType, setActiveType] = useState<string>(DEFAULT_ACTIVE_TYPE);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(DEFAULT_SELECTED_TAGS);
  const [searchFilter, setSearchFilter] = useState<string>(DEFAULT_SEARCH_FILTER);
  useEffect(() => {
    getMarketData().then(data => {
      setArtifacts(data.artifacts);
      setProducts(data.artifacts);
      setTypes(data.types);
      setTags(data.tags);
    });
  }, []);
  useEffect(() => {
    let filteredProducts = artifacts;
    if (activeType !== DEFAULT_ACTIVE_TYPE) {
      filteredProducts = filteredProducts.filter(product => product.type === activeType);
    }
    if (selectedTags.length !== DEFAULT_SELECTED_TAGS.length) {
      filteredProducts = filteredProducts.filter(product => product.tags.some(tag => selectedTags.includes(tag.toLocaleUpperCase())));
    }
    const filter = searchFilter.toLocaleLowerCase();
    if (filter !== DEFAULT_SEARCH_FILTER) {
      filteredProducts = filteredProducts.filter(
        product => product.name.toLocaleLowerCase().includes(filter) || product.shortDesc.toLocaleLowerCase().includes(filter)
      );
    }
    setProducts(filteredProducts);
  }, [activeType, selectedTags, searchFilter]);

  const shouldResetFilterBeVisible = (): boolean => {
    return products.length !== artifacts.length;
  };

  const resetFilters = () => {
    setActiveType(DEFAULT_ACTIVE_TYPE);
    setSelectedTags(DEFAULT_SELECTED_TAGS);
    setSearchFilter(DEFAULT_SEARCH_FILTER);
  };

  return (
    <div className='market'>
      <ProductFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={(newSelectedTags: string[]) => setSelectedTags(newSelectedTags)}
        searchFilter={searchFilter}
        onInputChange={(newSearchFilter: string) => setSearchFilter(newSearchFilter)}
      />
      <ProductTypeFilter types={types} activeType={activeType} onClick={(newActiveType: string) => setActiveType(newActiveType)} />
      {shouldResetFilterBeVisible() && <ResetProductFilter onClick={() => resetFilters()} />}
      <div className='contribute-hint'>
        Contribute to the community and build your own connector. <a href='https://dev.axonivy.com/link/market-contribute'>How to?</a>
      </div>
      <div className='products'>
        {products.length > 0 && products.map(product => <ProductCard key={product.key} product={product} />)}
        {artifacts.length === 0 && <Loading />}
      </div>
    </div>
  );
}

export default MarketOverview;
