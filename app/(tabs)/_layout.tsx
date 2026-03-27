import { SettingsPanel } from '@/components/SettingsPanel';
import { useTheme } from '@/context/ThemeContext';
import { themeColors } from '@/utils/themeColors';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function TabsLayout() {
   const [open, setOpen] = useState(false);

   const { theme } = useTheme();
   const colors = themeColors[theme];

   return (
      <View style={{ flex: 1 }}>
         {/* Header custom */}
         <View
            style={{
               height: 60,
               justifyContent: 'center',
               alignItems: 'flex-end',
               paddingHorizontal: 20,
               paddingTop: 20,
               backgroundColor: colors.headerBackground,
               borderBottomWidth: 1,
               borderBottomColor: 'rgba(0,0,0,0.1)',
            }}
         >
            <Pressable onPress={() => setOpen(true)}>
               <Text
                  style={{
                     fontSize: 16,
                     fontFamily: 'Sora_400Regular',
                     color: colors.text,
                  }}
               >
                  Ajustes ⚙️
               </Text>
            </Pressable>
         </View>

         {/* Tabs */}
         <View style={{ flex: 1 }}>
            <Tabs
               screenOptions={{
                  headerShown: false,

                  tabBarStyle: {
                     backgroundColor: colors.background,
                     borderTopColor:
                        theme === 'light'
                           ? 'rgba(0,0,0,0.1)'
                           : 'rgba(255,255,255,0.1)',
                     borderTopWidth: 0,
                     elevation: 0, // Android
                     shadowOpacity: 0, // iOS
                  },

                  tabBarActiveTintColor: colors.text,
                  tabBarInactiveTintColor: theme === 'light' ? '#666' : '#aaa',
               }}
            >
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
                        <Ionicons
                           name="location-sharp"
                           size={size}
                           color={color}
                        />
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
         </View>

         {/* Panel */}
         {open && <SettingsPanel onClose={() => setOpen(false)} />}
      </View>
   );
}
