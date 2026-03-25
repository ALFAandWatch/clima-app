import { ForecastCard } from '@/components/ForecastCard';
import WeatherCard from '@/components/WeatherCard';
import { getForecastByCoords, getWeatherByCoords } from '@/services/weatherApi';
import { DailyForecast } from '@/types/weather';
import { getUserLocation } from '@/utils/getUserLocation';
import { getWeatherBackground } from '@/utils/getWeatherBackground';
import { transformForecast } from '@/utils/transformForecast';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function LocationScreen() {
   const [weather, setWeather] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [forecast, setForecast] = useState<DailyForecast[] | null>(null);

   useFocusEffect(
      useCallback(() => {
         loadWeather();
      }, [])
   );

   const loadWeather = async () => {
      setLoading(true);
      try {
         const { lat, lon } = await getUserLocation();

         const [weatherData, forecastData] = await Promise.all([
            getWeatherByCoords(lat, lon),
            getForecastByCoords(lat, lon),
         ]);

         if (!weatherData || weatherData.cod !== 200) {
            alert('Error al obtener clima');
            setLoading(false);
            return;
         }

         if (!forecastData || forecastData.cod != 200) {
            console.warn('Error en forecast');
         }

         const parsedForecast = transformForecast(forecastData);

         setWeather(weatherData);
         setForecast(parsedForecast);
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false);
      }
   };

   if (!weather) return <Text>No se pudo obtener ubicación</Text>;

   return (
      <LinearGradient
         colors={['#89adef', '#ebf2ff']}
         style={{ flex: 1, padding: 20, justifyContent: 'center' }}
      >
         {loading ? (
            <>
               <ActivityIndicator size="large" />
               {/* <SkeletonWeatherCard /> */}
            </>
         ) : (
            <>
               {weather && (
                  <ImageBackground
                     source={getWeatherBackground(weather.weather[0].main)}
                     style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                     }}
                     imageStyle={{
                        borderRadius: 20,
                        marginTop: 20,
                        transform: [{ scale: 2 }],
                     }}
                     resizeMode="cover"
                  >
                     <View
                        style={{
                           backgroundColor: 'rgba(0,0,0,0.1)',
                        }}
                     >
                        <WeatherCard
                           city={`${weather.name}, ${weather.sys.country}`}
                           temperature={weather.main.temp}
                           condition={weather.weather[0].main}
                           humidity={weather.main.humidity}
                           wind={weather.wind.speed}
                        />
                     </View>
                  </ImageBackground>
               )}

               {forecast && (
                  <ScrollView
                     horizontal
                     showsHorizontalScrollIndicator={false}
                     contentContainerStyle={{ alignItems: 'flex-start' }}
                     style={{
                        marginTop: 20,
                        paddingVertical: 20,
                        paddingHorizontal: 5,
                        flexGrow: 0,
                     }}
                  >
                     {forecast.map((day) => (
                        <ForecastCard
                           key={day.date}
                           date={day.date}
                           tempMin={day.tempMin}
                           tempMax={day.tempMax}
                           condition={day.condition}
                           description={day.description}
                        />
                     ))}
                  </ScrollView>
               )}
            </>
         )}
      </LinearGradient>
   );
}
