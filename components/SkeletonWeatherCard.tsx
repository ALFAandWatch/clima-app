import { View } from 'react-native';

export const SkeletonWeatherCard = () => {
   return (
      <View
         style={{
            padding: 20,
            borderRadius: 20,
            backgroundColor: '#E5E7EB',
         }}
      >
         <View
            style={{
               height: 20,
               width: 120,
               backgroundColor: '#D1D5DB',
               borderRadius: 6,
            }}
         />
         <View
            style={{
               height: 40,
               width: 80,
               backgroundColor: '#D1D5DB',
               borderRadius: 6,
               marginTop: 10,
            }}
         />
      </View>
   );
};
