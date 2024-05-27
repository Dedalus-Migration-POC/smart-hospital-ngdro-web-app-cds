export type NationsResponse = {
  name: string;
  items: Array<Nation>;
};

export type Nation = {
  key: string;
  label: string;
  childName: string;
  leaf: boolean;
};
