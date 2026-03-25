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

   return <Stack screenOptions={{ headerShown: false }} />;
}
