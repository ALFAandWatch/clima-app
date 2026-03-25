import { ForecastCard } from '@/components/ForecastCard';
import { useWeather } from '@/hooks/useWeather';
import { getWeatherBackground } from '@/utils/getWeatherBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import {
   ActivityIndicator,
   ImageBackground,
   ScrollView,
   Text,
   View,
} from 'react-native';
import SearchBar from '../../components/SearchBar';
import WeatherCard from '../../components/WeatherCard';

type CityResult = {
   name: string;
   country: string;
   lat: number;
   lon: number;
};

export default function HomeScreen() {
   const [history, setHistory] = useState<CityResult[]>([]);

   const { weather, forecast, loading, error, fetchByCoords } = useWeather();

   useEffect(() => {
      loadLastCity();
      loadHistory();
   }, []);

   const handleSelectCity = async (city: CityResult) => {
      await fetchByCoords(city.lat, city.lon);

      await AsyncStorage.setItem('lastCity', JSON.stringify(city));
      await saveToHistory(city);
      await loadHistory();
   };

   const loadLastCity = async () => {
      const stored = await AsyncStorage.getItem('lastCity');

      if (!stored) return;

      try {
         const city = JSON.parse(stored);
         handleSelectCity(city);
      } catch (error) {
         console.log('Formato viejo detectado, limpiando...');
         await AsyncStorage.removeItem('lastCity');
      }
   };

   const loadHistory = async () => {
      const stored = await AsyncStorage.getItem('history');
      const parsed = stored ? JSON.parse(stored) : [];
      setHistory(parsed);
   };

   const addFavorite = async (city: CityResult) => {
      const stored = await AsyncStorage.getItem('favorites');
      let favorites: CityResult[] = stored ? JSON.parse(stored) : [];

      const exists = favorites.some(
         (c) => c.lat === city.lat && c.lon === city.lon
      );

      if (exists) {
         alert('Ya está en favoritos');
         return;
      }

      favorites.push(city);

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
   };

   const saveToHistory = async (city: CityResult) => {
      const stored = await AsyncStorage.getItem('history');
      let history: CityResult[] = stored ? JSON.parse(stored) : [];

      // evitar duplicados por lat/lon
      history = history.filter((c) => c.lat !== city.lat || c.lon !== city.lon);

      history.unshift(city);
      history = history.slice(0, 5);

      await AsyncStorage.setItem('history', JSON.stringify(history));
   };

   return (
      <LinearGradient
         colors={['#89adef', '#ebf2ff']}
         style={{ flex: 1, padding: 20, justifyContent: 'center' }}
      >
         <SearchBar onSelectCity={handleSelectCity} />

         {history.length > 0 && (
            <View style={{ marginVertical: 10 }}>
               {history.map((item, index) => (
                  <Text
                     key={index}
                     onPress={() => handleSelectCity(item)}
                     style={{
                        padding: 8,
                        backgroundColor: '#ddd',
                        marginBottom: 5,
                        borderRadius: 8,
                     }}
                  >
                     {item.name}, {item.country}
                  </Text>
               ))}
            </View>
         )}

         {loading && <ActivityIndicator size="large" />}

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
                     onAddFavorite={() =>
                        addFavorite({
                           name: weather.name,
                           country: weather.sys.country,
                           lat: weather.coord.lat,
                           lon: weather.coord.lon,
                        })
                     }
                  />
               </View>
            </ImageBackground>
         )}

         {forecast && (
            <ScrollView
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{ alignItems: 'flex-start' }}
               style={{ marginTop: 20, flexGrow: 0 }}
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
      </LinearGradient>
   );
}
