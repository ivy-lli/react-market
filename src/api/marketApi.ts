import { handleResponse, handleError } from './apiUtils';
export const baseUrl = process.env.REACT_APP_API_URL;
const marketUrl = baseUrl + '/api/market';

export function getMarketData(): Promise<any> {
  return fetch(marketUrl).then(handleResponse).catch(handleError);
}

export function getProductData(key: string): Promise<any> {
  return fetch(`${marketUrl}/${key}`).then(handleResponse).catch(handleError);
}
