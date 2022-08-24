import React from 'react';
import { render, screen } from '@testing-library/react';
import MarketOverview from './MarketOverview';
// import { rest } from 'msw';
// import { setupServer } from 'msw/node';

// // declare which API requests to mock
// const server = setupServer(
//   // capture "GET /greeting" requests
//   rest.get('/api/market', (req, res, ctx) => {
//     // respond using a mocked JSON body
//     return res(ctx.json({ types: [{ name: 'Test', filter: 'test', icon: 'si-test' }] }));
//   })
// );

// // establish API mocking before all tests
// beforeAll(() => server.listen());
// // reset any request handlers that are declared as a part of our tests
// // (i.e. for testing one-time error scenarios)
// afterEach(() => server.resetHandlers());
// // clean up once the tests are done
// afterAll(() => server.close());

// // ...

test('contribute hint', () => {
  const { container } = render(<MarketOverview />);
  const contributeHint = container.querySelector('.contribute-hint');
  expect(contributeHint).toHaveTextContent('Contribute to the community and build your own connector.');
});

test('loading', () => {
  const { container } = render(<MarketOverview />);
  const contributeHint = container.querySelector('.axonivy-loader');
  expect(contributeHint).toBeVisible();
});
