import { useUnit } from '@/context/UnitContext';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { getCardBackground } from '../utils/getCardBackground';

type Props = {
   city: string;
   temperature: number;
   condition: string;
   humidity: number;
   wind: number;
   onAddFavorite?: () => void;
   onRemoveFavorite?: () => void;
};

export default function WeatherCard({
   city,
   temperature,
   condition,
   humidity,
   wind,
   onAddFavorite,
   onRemoveFavorite,
}: Props) {
   const icon = getWeatherIcon(condition);
   const [added, setAdded] = useState(false);

   const { unit } = useUnit();

   const tempUnit = unit === 'metric' ? '°C' : '°F';

   const handleAdd = () => {
      if (!onAddFavorite) return;

      onAddFavorite();
      setAdded(true);

      setTimeout(() => setAdded(false), 2000);
   };

   const colors = getCardBackground(condition);

   return (
      <View style={[styles.card]}>
         {/* Ciudad */}
         <Text style={styles.city}>{city}</Text>

         <View
            style={{
               flexDirection: 'row',
               justifyContent: 'center',
               gap: 15,
               marginBottom: 10,
            }}
         >
            {/* Temperatura */}
            <Text style={styles.temp}>
               {Math.round(temperature)}
               {tempUnit}
            </Text>

            {/* Icono */}
            <Text style={styles.icon}>{icon}</Text>
         </View>
         <View style={styles.extra}>
            <Text style={styles.extraText}>💧 {humidity}%</Text>
            <Text style={styles.extraText}>🌬 {wind} m/s</Text>
         </View>

         {/* Botones */}
         {onAddFavorite && (
            <Button
               title={added ? '✅ Agregado' : '⭐ Agregar a favoritos'}
               onPress={handleAdd}
            />
         )}
         {onRemoveFavorite && (
            <Button
               title="🗑 Eliminar"
               onPress={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite();
               }}
            />
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   card: {
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
   },
   city: {
      fontSize: 25,
      fontWeight: '600',
      marginBottom: 10,
      fontFamily: 'Sora_600SemiBold',
      textAlign: 'center',
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
   },
   temp: {
      fontSize: 54,
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: 'Sora_400Regular',
      color: '#fff',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
   },
   icon: {
      fontSize: 56,
      color: '#666',
      textAlign: 'center',
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
   },
   button: {
      backgroundColor: '#222',
      padding: 10,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 5,
   },
   removeButton: {
      backgroundColor: '#b00020',
   },
   buttonText: {
      color: '#fff',
      fontWeight: '600',
   },
   extra: {
      flexDirection: 'row',
      gap: 15,
      marginBottom: 15,
      justifyContent: 'center',
   },
   extraText: {
      color: '#fff',
      fontSize: 22,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 3,
   },
});
