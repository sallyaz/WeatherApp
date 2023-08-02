export interface CityType {
  name: string;
  continent: string;
  active: boolean;
  country: string;
  description: string;
  image: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface WeatherDetailsType {
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
    main: string;
  }[];
}
