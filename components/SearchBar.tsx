import { useState } from 'react';
import {
   FlatList,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import { searchCities } from '../services/weatherApi';

type CityResult = {
   name: string;
   country: string;
   lat: number;
   lon: number;
};

type Props = {
   onSelectCity: (city: CityResult) => void;
};

export default function SearchBar({ onSelectCity }: Props) {
   const [query, setQuery] = useState('');
   const [results, setResults] = useState<CityResult[]>([]);

   const handleChange = async (text: string) => {
      setQuery(text);

      if (text.length < 2) {
         setResults([]);
         return;
      }

      const cities = await searchCities(text);
      setResults(cities);
   };

   return (
      <View>
         <TextInput
            value={query}
            onChangeText={handleChange}
            placeholder="Buscar ciudad..."
            style={{
               backgroundColor: '#fff',
               padding: 10,
               borderRadius: 10,
            }}
         />

         {results.length > 0 && (
            <FlatList
               data={results}
               keyExtractor={(item, index) => index.toString()}
               style={{
                  backgroundColor: '#fff',
                  marginTop: 5,
                  borderRadius: 10,
               }}
               renderItem={({ item }) => (
                  <TouchableOpacity
                     onPress={() => {
                        setQuery(`${item.name}, ${item.country}`);
                        setResults([]);
                        onSelectCity(item); // 👈 importante
                     }}
                     style={{ padding: 10 }}
                  >
                     <Text>
                        {item.name}, {item.country}
                     </Text>
                  </TouchableOpacity>
               )}
            />
         )}
      </View>
   );
}
