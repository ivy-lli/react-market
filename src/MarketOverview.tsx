import React, { useEffect, useState } from 'react';
import './MarketOverview.css';
import { getMarketData } from './api/marketApi';
import { Product, Type } from './api/data';
import Loading from './components/Loading';
import ProductFilter from './components/overview/ProductFilter';
import ProductTypeFilter from './components/overview/ProductTypeFilter';
import ResetProductFilter from './components/overview/ResetProductFilter';
import ProductCard from './components/overview/ProductCard';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DEFAULT_ACTIVE_TYPE = '';
const DEFAULT_SELECTED_TAGS: string[] = [];
const DEFAULT_SEARCH_FILTER = '';

type SearchParams = {
  type?: string;
  search?: string;
  tags?: string;
};

function MarketOverview() {
  let [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get('type'));

  const [artifacts, setArtifacts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [activeType, setActiveType] = useState<string>(searchParams.get('type') ? searchParams.get('type')! : DEFAULT_ACTIVE_TYPE);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : DEFAULT_SELECTED_TAGS
  );
  const [searchFilter, setSearchFilter] = useState<string>(
    searchParams.get('search') ? searchParams.get('search')! : DEFAULT_SEARCH_FILTER
  );

  useEffect(() => {
    getMarketData().then(data => {
      setProducts(data.artifacts);
      setTypes(data.types);
      setTags(data.tags);
      setArtifacts(data.artifacts);
    });
  }, []);
  useEffect(() => {
    let filteredProducts = artifacts;
    const searchParams: SearchParams = {};
    if (activeType !== DEFAULT_ACTIVE_TYPE) {
      filteredProducts = filteredProducts.filter(product => product.type === activeType);
      searchParams.type = activeType;
    }
    if (selectedTags.length !== DEFAULT_SELECTED_TAGS.length) {
      filteredProducts = filteredProducts.filter(product => product.tags.some(tag => selectedTags.includes(tag.toLocaleUpperCase())));
      searchParams.tags = selectedTags.join(',');
    }
    const filter = searchFilter.toLocaleLowerCase();
    if (filter !== DEFAULT_SEARCH_FILTER) {
      filteredProducts = filteredProducts.filter(
        product => product.name.toLocaleLowerCase().includes(filter) || product.shortDesc.toLocaleLowerCase().includes(filter)
      );
      searchParams.search = searchFilter;
    }
    setSearchParams(searchParams);
    setProducts(filteredProducts);
  }, [artifacts, activeType, selectedTags, searchFilter]);

  const shouldResetFilterBeVisible = (): boolean => {
    return products.length !== artifacts.length;
  };

  const resetFilters = () => {
    setActiveType(DEFAULT_ACTIVE_TYPE);
    setSelectedTags(DEFAULT_SELECTED_TAGS);
    setSearchFilter(DEFAULT_SEARCH_FILTER);
    setSearchParams({});
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
