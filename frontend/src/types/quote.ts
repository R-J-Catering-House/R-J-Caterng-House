export type Addons = {
  entradas: boolean;
  postres: boolean;
  dj: boolean;
  fotocabina: boolean;
};

export type QuoteRequest = {
  customer_name?: string;
  customer_email?: string;
  guests: number;
  package_id: number;
  addons: Addons;
};

export type QuoteResponse = {
  subtotal_package: number;
  extras_total: number;
  total: number;
  breakdown: Array<{ concept: string; amount: number }>;
};
