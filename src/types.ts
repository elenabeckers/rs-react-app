export interface Country {
  name: { common: string };
  population: number;
  region: string;
  flags: {
    png: string;
    alt: string;
  };
}
