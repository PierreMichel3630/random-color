import i18next from "i18next";
import { createContext, useContext, useEffect, useState } from "react";
import { Color } from "../models/Color";
import { LANGUAGES, Language } from "../models/Language";
import { DEFAULTCOLORLIST } from "../utils/color";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const GlobalContext = createContext<{
  colorMode: boolean;
  setColorMode: (value: boolean) => void;
  colors: Array<Color>;
  setColors: (value: Array<Color>) => void;
  numberMode: boolean;
  setNumberMode: (value: boolean) => void;
  minNumber?: number;
  setMinNumber: (value: number | undefined) => void;
  maxNumber?: number;
  setMaxNumber: (value: number | undefined) => void;
  time?: number;
  setTime: (value: number | undefined) => void;
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  colorMode:
    localStorage.getItem("colorMode") !== null
      ? (JSON.parse(localStorage.getItem("colorMode")!) as boolean)
      : true,
  setColorMode: (value: boolean) => {},
  colors:
    localStorage.getItem("colors") !== null
      ? (JSON.parse(localStorage.getItem("colors")!) as Array<Color>)
      : DEFAULTCOLORLIST,
  setColors: (value: Array<Color>) => {},
  numberMode:
    localStorage.getItem("numberMode") !== null
      ? (JSON.parse(localStorage.getItem("numberMode")!) as boolean)
      : false,
  setNumberMode: (value: boolean) => {},
  minNumber:
    localStorage.getItem("minNumber") !== null
      ? (JSON.parse(localStorage.getItem("minNumber")!) as number)
      : 1,
  setMinNumber: (value: number | undefined) => {},
  maxNumber:
    localStorage.getItem("maxNumber") !== null
      ? (JSON.parse(localStorage.getItem("maxNumber")!) as number)
      : 10,
  setMaxNumber: (value: number | undefined) => {},
  time:
    localStorage.getItem("time") !== null
      ? Number(JSON.parse(localStorage.getItem("time")!))
      : 5,
  setTime: (value: number | undefined) => {},
  language:
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : LANGUAGES[0],
  setLanguage: (language: Language) => {},
});

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }: Props) => {
  const [time, setTime] = useState<number | undefined>(
    localStorage.getItem("time") !== null
      ? Number(JSON.parse(localStorage.getItem("time")!))
      : 5
  );

  const [numberMode, setNumberMode] = useState<boolean>(
    localStorage.getItem("numberMode") !== null
      ? (JSON.parse(localStorage.getItem("numberMode")!) as boolean)
      : false
  );
  const [minNumber, setMinNumber] = useState<number | undefined>(
    localStorage.getItem("minNumber") !== null
      ? (JSON.parse(localStorage.getItem("minNumber")!) as number)
      : 1
  );
  const [maxNumber, setMaxNumber] = useState<number | undefined>(
    localStorage.getItem("maxNumber") !== null
      ? (JSON.parse(localStorage.getItem("maxNumber")!) as number)
      : 10
  );

  const [colorMode, setColorMode] = useState<boolean>(
    localStorage.getItem("colorMode") !== null
      ? (JSON.parse(localStorage.getItem("colorMode")!) as boolean)
      : true
  );
  const [colors, setColors] = useState<Array<Color>>(
    localStorage.getItem("colors") !== null
      ? (JSON.parse(localStorage.getItem("colors")!) as Array<Color>)
      : DEFAULTCOLORLIST
  );

  const changeLanguage = async (language: string) => {
    await i18next.changeLanguage(language);
  };

  const getDefaultLanguage = () => {
    let result: undefined | Language = undefined;
    if (navigator.languages.length > 0) {
      const languageBrower = navigator.languages[0].split(/-|_/)[0];

      result = LANGUAGES.find((el) => el.browser === languageBrower);
    }
    return result ?? LANGUAGES[0];
  };

  const getLanguage = () =>
    localStorage.getItem("language") !== null
      ? (JSON.parse(localStorage.getItem("language")!) as Language)
      : getDefaultLanguage();
  const [language, setLanguage] = useState<Language>(getLanguage());

  useEffect(() => {
    if (language) {
      changeLanguage(language.iso);
      localStorage.setItem("language", JSON.stringify(language));
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem("colors", JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    if (time) {
      localStorage.setItem("time", time.toString());
    }
  }, [time]);

  useEffect(() => {
    if (maxNumber) {
      localStorage.setItem("maxNumber", maxNumber.toString());
    }
  }, [maxNumber]);

  useEffect(() => {
    if (minNumber) {
      localStorage.setItem("minNumber", minNumber.toString());
    }
  }, [minNumber]);

  useEffect(() => {
    localStorage.setItem("numberMode", numberMode.toString());
  }, [numberMode]);

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode.toString());
  }, [colorMode]);

  return (
    <GlobalContext.Provider
      value={{
        time,
        setTime,
        colorMode,
        setColorMode,
        colors,
        setColors,
        numberMode,
        setNumberMode,
        minNumber,
        setMinNumber,
        maxNumber,
        setMaxNumber,
        language,
        setLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
