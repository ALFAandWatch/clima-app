import { useTheme } from '@/context/ThemeContext';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import { themeColors } from '@/utils/themeColors';
import { StyleSheet, Text, View } from 'react-native';

type ForecastCardProps = {
   date: string;
   tempMin: number;
   tempMax: number;
   condition: string;
   description: string;
};

export const ForecastCard = ({
   date,
   tempMin,
   tempMax,
   condition,
   description,
}: ForecastCardProps) => {
   const formattedDate = new Date(date).toLocaleDateString('es-UY', {
      weekday: 'short',
   });

   const icon = getWeatherIcon(condition);

   const { theme } = useTheme();
   const colors = themeColors[theme];

   return (
      <View style={[styles.card, { backgroundColor: colors.forecastCard }]}>
         {/* Día */}
         <Text style={[styles.day, { color: colors.text }]}>
            {formattedDate}
         </Text>

         {/* Icono */}
         <Text style={styles.icon}>{icon}</Text>

         {/* Temperaturas */}
         <Text style={[styles.temp, { color: colors.text }]}>
            {Math.round(tempMax)}° / {Math.round(tempMin)}°
         </Text>

         {/* Descripción */}
         <Text style={[styles.description, { color: colors.text }]}>
            {description}
         </Text>
      </View>
   );
};

const styles = StyleSheet.create({
   card: {
      padding: 10,
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 10,
      width: 150,

      // iOS
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,

      // Android
      elevation: 5,
   },
   day: {
      fontSize: 14,
      marginBottom: 5,
   },
   icon: {
      width: 50,
      height: 50,
      fontSize: 30,
      textAlign: 'center',
   },
   temp: {
      fontSize: 16,
      fontWeight: 'bold',
   },
   description: {
      fontSize: 12,
      textAlign: 'center',
   },
});
