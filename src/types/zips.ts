export type ZipsResponse = {
  name: string;
  items: Array<Zip>;
};

export type Zip = {
  label: string;
  leaf: boolean;
};
