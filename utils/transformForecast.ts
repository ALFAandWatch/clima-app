import { DailyForecast } from '@/types/weather';

export const transformForecast = (data: any): DailyForecast[] => {
   const days: Record<string, any[]> = {};

   data.list.forEach((item: any) => {
      const date = item.dt_txt.split(' ')[0];

      if (!days[date]) {
         days[date] = [];
      }

      days[date].push(item);
   });

   return Object.entries(days).map(([date, items]) => {
      const temps = items.map((i) => i.main.temp);

      return {
         date,
         tempMin: Math.min(...temps),
         tempMax: Math.max(...temps),
         description: items[0].weather[0].description,
         condition: items[0].weather[0].main,
      };
   });
};
