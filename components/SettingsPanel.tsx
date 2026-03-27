import { useTheme } from '@/context/ThemeContext';
import { useUnit } from '@/context/UnitContext';
import { themeColors } from '@/utils/themeColors';
import { Pressable, Text, View } from 'react-native';

export const SettingsPanel = ({ onClose }: any) => {
   const { unit, toggleUnit } = useUnit();
   const { theme, toggleTheme } = useTheme();

   const colors = themeColors[theme];

   return (
      <View
         style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 250,
            backgroundColor: colors.background,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
         }}
      >
         <Text style={{ fontSize: 20, marginBottom: 20, color: colors.text }}>
            Settings
         </Text>

         <View style={{ flexDirection: 'row', marginBottom: 20 }}>
            <Pressable
               onPress={() => theme !== 'light' && toggleTheme()}
               style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: theme === 'light' ? '#000' : '#eee',
               }}
            >
               <Text
                  style={{
                     textAlign: 'center',
                     color: theme === 'light' ? '#fff' : '#000',
                  }}
               >
                  ☀️
               </Text>
            </Pressable>

            <Pressable
               onPress={() => theme !== 'dark' && toggleTheme()}
               style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: theme === 'dark' ? '#000' : '#eee',
               }}
            >
               <Text
                  style={{
                     textAlign: 'center',
                     color: theme === 'dark' ? '#fff' : '#000',
                  }}
               >
                  🌙
               </Text>
            </Pressable>
         </View>

         <View
            style={{
               flexDirection: 'row',
               backgroundColor: '#eee',
               borderRadius: 20,
               padding: 4,
               marginBottom: 20,
            }}
         >
            <Pressable
               onPress={() => unit !== 'metric' && toggleUnit()}
               style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: unit === 'metric' ? '#000' : 'transparent',
               }}
            >
               <Text
                  style={{
                     textAlign: 'center',
                     color: unit === 'metric' ? '#fff' : '#000',
                  }}
               >
                  °C
               </Text>
            </Pressable>

            <Pressable
               onPress={() => unit !== 'imperial' && toggleUnit()}
               style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor: unit === 'imperial' ? '#000' : 'transparent',
               }}
            >
               <Text
                  style={{
                     textAlign: 'center',
                     color: unit === 'imperial' ? '#fff' : '#000',
                  }}
               >
                  °F
               </Text>
            </Pressable>
         </View>

         <Pressable onPress={onClose} style={{ marginTop: 20 }}>
            <Text style={{ color: colors.text }}>Cerrar</Text>
         </Pressable>
      </View>
   );
};
