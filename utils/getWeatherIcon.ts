export const getWeatherIcon = (condition: string) => {
   switch (condition) {
      case 'Clear':
         return '☀️';
      case 'Clouds':
         return '☁️';
      case 'Rain':
         return '🌧️';
      case 'Thunderstorm':
         return '⛈️';
      case 'Snow':
         return '❄️';
      default:
         return '🌡️';
   }
};
