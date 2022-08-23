export interface Product {
  key: string;
  name: string;
  shortDesc: string;
  vendorImage: string;
  type: string;
  tags: string[];
  url: string;
}

export interface Type {
  name: string;
  filter: string;
  icon: string;
}
