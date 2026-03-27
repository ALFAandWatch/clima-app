import { useTheme } from '@/context/ThemeContext';
import { useUnit } from '@/context/UnitContext';
import { Pressable, Text, View } from 'react-native';

export const SettingsPanel = ({ onClose }: any) => {
   const { unit, toggleUnit } = useUnit();
   const { theme, toggleTheme } = useTheme();

   return (
      <View
         style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: 250,
            backgroundColor: '#fff',
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 10,
         }}
      >
         <Text style={{ fontSize: 20, marginBottom: 20 }}>Settings</Text>

         <Pressable onPress={toggleTheme}>
            <Text>Tema: {theme === 'light' ? 'Claro' : 'Oscuro'}</Text>
         </Pressable>

         <Pressable onPress={toggleUnit}>
            <Text>Unidad: {unit === 'metric' ? 'Celsius' : 'Fahrenheit'}</Text>
         </Pressable>

         <Pressable onPress={onClose} style={{ marginTop: 20 }}>
            <Text>Cerrar</Text>
         </Pressable>
      </View>
   );
};
