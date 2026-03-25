import WeatherCard from '@/components/WeatherCard';
import { getWeatherBackground } from '@/utils/getWeatherBackground';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
   FlatList,
   ImageBackground,
   StyleSheet,
   Text,
   View,
} from 'react-native';
import { getWeatherByCoords } from '../../services/weatherApi';

type CityResult = {
   name: string;
   country: string;
   lat: number;
   lon: number;
};

export default function FavoritesScreen() {
   const [favoritesWeather, setFavoritesWeather] = useState<any[]>([]);

   useFocusEffect(
      useCallback(() => {
         loadFavorites();
      }, [])
   );

   const loadFavorites = async () => {
      // await AsyncStorage.removeItem('favorites'); // 👈 para limpiar favoritos durante desarrollo
      const stored = await AsyncStorage.getItem('favorites');
      const cities = stored ? JSON.parse(stored) : [];

      // 👇 debug útil
      console.log('Favorites RAW:', cities);

      const validCities = cities.filter(
         (city: any) => city && city.lat && city.lon
      );

      const results = await Promise.all(
         validCities.map((city: CityResult) =>
            getWeatherByCoords(city.lat, city.lon)
         )
      );

      const validResults = results.filter((r) => r && r.cod === 200);

      setFavoritesWeather(validResults);
   };

   const removeFavorite = async (cityToRemove: CityResult) => {
      const stored = await AsyncStorage.getItem('favorites');
      const favorites: CityResult[] = stored ? JSON.parse(stored) : [];

      const updated = favorites.filter(
         (c) => c.lat !== cityToRemove.lat || c.lon !== cityToRemove.lon
      );

      await AsyncStorage.setItem('favorites', JSON.stringify(updated));

      loadFavorites();
   };

   return (
      <LinearGradient
         colors={['#89adef', '#ebf2ff']}
         style={{ flex: 1, padding: 20, justifyContent: 'center' }}
      >
         <Text
            style={{
               fontSize: 32,
               textAlign: 'center',
               marginBottom: 20,
               fontWeight: '600',
               letterSpacing: 0.5,
            }}
         >
            Favoritos
         </Text>
         {favoritesWeather.length === 0 ? (
            <Text>No hay favoritos aún</Text>
         ) : (
            <FlatList
               data={favoritesWeather}
               keyExtractor={(item) => item.id.toString()}
               ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
               renderItem={({ item }) => (
                  <ImageBackground
                     source={getWeatherBackground(item.weather[0].main)}
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
                           city={`${item.name}, ${item.sys.country}`}
                           temperature={item.main.temp}
                           condition={item.weather[0].main}
                           humidity={item.main.humidity}
                           wind={item.wind.speed}
                           onRemoveFavorite={() =>
                              removeFavorite({
                                 name: item.name,
                                 country: item.sys.country,
                                 lat: item.coord.lat,
                                 lon: item.coord.lon,
                              })
                           }
                        />
                     </View>
                  </ImageBackground>
               )}
            />
         )}
      </LinearGradient>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#eef1f5',
   },
   item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
      borderBottomWidth: 1,
   },
   city: {
      fontSize: 18,
   },
   delete: {
      color: 'red',
   },
});
