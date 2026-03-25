import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
   return (
      <Tabs screenOptions={{ headerShown: false }}>
         <Tabs.Screen
            name="index"
            options={{
               title: 'Search',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="search" size={size} color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="location"
            options={{
               title: 'Mi ubicación',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="location-sharp" size={size} color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="favorites"
            options={{
               title: 'Favorites',
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="star" size={size} color={color} />
               ),
            }}
         />
      </Tabs>
   );
}
