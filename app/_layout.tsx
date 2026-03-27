import { ThemeProvider } from '@/context/ThemeContext';
import { UnitProvider } from '@/context/UnitContext';
import {
   Sora_400Regular,
   Sora_600SemiBold,
   Sora_700Bold,
   useFonts,
} from '@expo-google-fonts/sora';
import { Stack } from 'expo-router';

export default function RootLayout() {
   const [fontsLoaded] = useFonts({
      Sora_400Regular,
      Sora_600SemiBold,
      Sora_700Bold,
   });

   if (!fontsLoaded) return null;

   return (
      <ThemeProvider>
         <UnitProvider>
            <Stack screenOptions={{ headerShown: false }} />
         </UnitProvider>
      </ThemeProvider>
   );
}
