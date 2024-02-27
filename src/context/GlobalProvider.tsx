import { createContext, useContext, useState } from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const GlobalContext = createContext<{
  time: number;
  setTime: (value: number) => void;
}>({
  time: 5,
  setTime: (value: number) => {},
});

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: Props) => {
  const [time, setTime] = useState(5);

  return (
    <GlobalContext.Provider
      value={{
        time,
        setTime,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
