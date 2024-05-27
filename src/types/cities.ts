export type CitiesResponse = {
  name: string;
  description: string;
  items: Array<City>;
};

export type City = {
  key: string;
  label: string;
  childName: string;
  leaf: boolean;
};
