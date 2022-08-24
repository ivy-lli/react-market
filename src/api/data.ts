export interface Product {
  key: string;
  name: string;
  version: string;
  shortDesc: string;
  vendor: string;
  vendorImage: string;
  vendorUrl: string;
  type: string;
  typeIcon: string;
  tags: string[];
  platformReview: string;
  cost: string;
  sourceUrl: string;
  statusBadgeUrl: string;
  language: string;
  industry: string;
  compatibility: string;
  installationCount: number;
  contactUs: boolean;
}

export interface Type {
  name: string;
  filter: string;
  icon: string;
}
