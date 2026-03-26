// context/UnitContext.tsx

import { createContext, useContext, useState } from 'react';

type Unit = 'metric' | 'imperial';

const UnitContext = createContext<{
   unit: Unit;
   toggleUnit: () => void;
}>({
   unit: 'metric',
   toggleUnit: () => {},
});

export const UnitProvider = ({ children }: any) => {
   const [unit, setUnit] = useState<Unit>('metric');

   const toggleUnit = () => {
      setUnit((prev) => (prev === 'metric' ? 'imperial' : 'metric'));
   };

   return (
      <UnitContext.Provider value={{ unit, toggleUnit }}>
         {children}
      </UnitContext.Provider>
   );
};

export const useUnit = () => useContext(UnitContext);
