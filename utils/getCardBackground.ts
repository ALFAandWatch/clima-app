type GradientColors = [string, string, ...string[]];

export const getCardBackground = (condition: string): GradientColors => {
   switch (condition.toLowerCase()) {
      case 'clear':
         return ['#4facfe', '#00f2fe']; // cielo azul

      case 'clouds':
         return ['#bdc3c7', '#2c3e50']; // gris nublado

      case 'rain':
         return ['#4b6cb7', '#182848']; // azul oscuro lluvia

      case 'snow':
         return ['#e6dada', '#274046']; // frío/blanco

      case 'thunderstorm':
         return ['#141e30', '#243b55']; // tormenta

      default:
         return ['#89f7fe', '#66a6ff']; // fallback
   }
};
