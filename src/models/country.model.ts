export interface Country {
  name: {
    common: string;
  };
  capital: string[];
  cca3: string;
  flags: {
    png: string;
    svg: string;
  };
  population: number;
  region: string;
}
