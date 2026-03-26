const API_KEY = process.env.EXPO_PUBLIC_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

type CityResult = {
   name: string;
   country: string;
   lat: number;
   lon: number;
};

export const getWeatherByCoords = async (
   lat: number,
   lon: number,
   unit: 'metric' | 'imperial'
) => {
   try {
      const response = await fetch(
         `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );

      if (!response.ok) {
         throw new Error('Error fetching weather');
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error fetching weather:', error);
      return null;
   }
};

export const searchCities = async (query: string): Promise<CityResult[]> => {
   if (!query) return [];

   try {
      const res = await fetch(
         `${GEO_BASE_URL}?q=${query}&limit=5&appid=${API_KEY}`
      );

      if (!res.ok) {
         throw new Error('Error fetching cities');
      }

      return await res.json();
   } catch (error) {
      console.error('Error searching cities:', error);
      return [];
   }
};

export const getForecastByCoords = async (
   lat: number,
   lon: number,
   unit: 'metric' | 'imperial'
) => {
   try {
      const response = await fetch(
         `${FORECAST_BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );

      if (!response.ok) {
         throw new Error('Error fetching forecast');
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error('Error fetching forecast:', error);
      return null;
   }
};
