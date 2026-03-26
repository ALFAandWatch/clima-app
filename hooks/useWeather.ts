import { useUnit } from '@/context/UnitContext';
import { getForecastByCoords, getWeatherByCoords } from '@/services/weatherApi';
import { DailyForecast } from '@/types/weather';
import { transformForecast } from '@/utils/transformForecast';
import { useState } from 'react';

export const useWeather = () => {
   const { unit } = useUnit();
   const [weather, setWeather] = useState<any>(null);
   const [forecast, setForecast] = useState<DailyForecast[] | null>(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fetchByCoords = async (lat: number, lon: number) => {
      try {
         setLoading(true);
         setError(null);

         const [weatherData, forecastData] = await Promise.all([
            getWeatherByCoords(lat, lon, unit),
            getForecastByCoords(lat, lon, unit),
         ]);

         if (!weatherData || weatherData.cod !== 200) {
            throw new Error('Error al obtener clima');
         }

         const parsedForecast = transformForecast(forecastData);

         setWeather(weatherData);
         setForecast(parsedForecast);
      } catch (err: any) {
         setError(err.message || 'Error desconocido');
      } finally {
         setLoading(false);
      }
   };

   return {
      weather,
      forecast,
      loading,
      error,
      fetchByCoords,
   };
};
