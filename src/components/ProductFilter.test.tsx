import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ProductFilter from './ProductFilter';

const testTypes = [
  { name: 'Test', filter: 'test', icon: 'si-test' },
  { name: 'Bla', filter: 'bla', icon: 'si-bla' }
];

test('tags empty', () => {
  const { container } = render(
    <ProductFilter tags={[]} selectedTags={[]} onTagChange={() => {}} searchFilter='' onInputChange={() => {}} />
  );
  const types = container.querySelectorAll('.rw-multiselect .rw-multiselect-tag');
  expect(types).toHaveLength(0);
});

test('tags selected', () => {
  const { container } = render(
    <ProductFilter tags={['TEST', 'BLA']} selectedTags={['TEST', 'BLA']} onTagChange={() => {}} searchFilter='' onInputChange={() => {}} />
  );
  const selectedTags = container.querySelectorAll('.rw-multiselect .rw-multiselect-tag');
  expect(selectedTags).toHaveLength(2);
});

test('filter empty', () => {
  const { container } = render(
    <ProductFilter tags={[]} selectedTags={[]} onTagChange={() => {}} searchFilter='' onInputChange={() => {}} />
  );
  const filterInput = container.querySelector('.product-filter-search');
  expect(filterInput).toHaveValue('');
});

test('filter', () => {
  const { container } = render(
    <ProductFilter tags={[]} selectedTags={[]} onTagChange={() => {}} searchFilter='test filter' onInputChange={() => {}} />
  );
  const filterInput = container.querySelector('.product-filter-search');
  expect(filterInput).toHaveValue('test filter');
});

test('filter change', () => {
  let changedFilter = '';
  const onInputChange = (newFilterInput: string) => (changedFilter = newFilterInput);
  const { container } = render(
    <ProductFilter tags={[]} selectedTags={[]} onTagChange={() => {}} searchFilter='test filter' onInputChange={onInputChange} />
  );
  const filterInput = container.querySelector('.product-filter-search') as HTMLInputElement;
  expect(changedFilter).toContain('');
  fireEvent.change(filterInput, { target: { value: 'bla' } });
  expect(changedFilter).toContain('bla');
});
