import { ForecastCard } from '@/components/ForecastCard';
import WeatherCard from '@/components/WeatherCard';
import { useUnit } from '@/context/UnitContext';
import { useWeather } from '@/hooks/useWeather';
import { getUserLocation } from '@/utils/getUserLocation';
import { getWeatherBackground } from '@/utils/getWeatherBackground';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function LocationScreen() {
   const { weather, forecast, loading, error, fetchByCoords } = useWeather();

   const { unit } = useUnit();

   useFocusEffect(
      useCallback(() => {
         getLocationAndFetch();
      }, [])
   );

   useEffect(() => {
      if (weather?.coord) {
         fetchByCoords(weather.coord.lat, weather.coord.lon);
      }
   }, [unit]);

   const getLocationAndFetch = async () => {
      try {
         const { lat, lon } = await getUserLocation();
         fetchByCoords(lat, lon);
      } catch (error) {
         console.error(error);
      }
   };

   if (loading) {
      return <ActivityIndicator size="large" />;
   }

   if (!weather) {
      return <Text>No se pudo obtener ubicación</Text>;
   }

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
