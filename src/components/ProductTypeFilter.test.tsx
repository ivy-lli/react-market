import React from 'react';
import { render } from '@testing-library/react';
import ProductTypeFilter from './ProductTypeFilter';

const testTypes = [
  { name: 'Test', filter: 'test', icon: 'si-test' },
  { name: 'Bla', filter: 'bla', icon: 'si-bla' }
];

test('types empty', () => {
  const { container } = render(<ProductTypeFilter types={[]} activeType='' onClick={() => {}} />);
  const types = container.querySelectorAll('.types .type');
  expect(types).toHaveLength(0);
});

test('types', () => {
  const { container } = render(<ProductTypeFilter types={testTypes} activeType='' onClick={() => {}} />);
  const types = container.querySelectorAll('.types .type');
  expect(types).toHaveLength(2);
  const testType = types[0];
  expect(testType).toHaveTextContent('Test');
  expect(testType).toHaveClass('type');
  expect(testType).not.toHaveClass('selected');
  expect(testType.querySelector('i')).toHaveClass('si si-test');
});

test('types selected', () => {
  const { container } = render(<ProductTypeFilter types={testTypes} activeType='test' onClick={() => {}} />);
  const types = container.querySelectorAll('.types .type');
  const testType = types[0];
  expect(testType).toHaveClass('type selected');
});

test('types onclick', () => {
  let clickedFilter = '';
  const onClick = (newFilter: string) => (clickedFilter = newFilter);
  const { container } = render(<ProductTypeFilter types={testTypes} activeType='test' onClick={onClick} />);
  const selectedType = container.querySelector('.types .selected') as HTMLElement;
  expect(clickedFilter).toContain('');
  selectedType.click();
  expect(clickedFilter).toContain('test');
});
