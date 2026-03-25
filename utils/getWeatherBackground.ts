export const getWeatherBackground = (condition: string) => {
   switch (condition) {
      case 'Clear':
         return require('../assets/images/sunny.jpeg');
      case 'Clouds':
         return require('../assets/images/clouds.jpeg');
      case 'Rain':
         return require('../assets/images/rain.jpeg');
      case 'Thunderstorm':
         return require('../assets/images/thunderstorm.jpg');
      case 'Snow':
         return require('../assets/images/snow.webp');
      default:
         return;
   }
};
