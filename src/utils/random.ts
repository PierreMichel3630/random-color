import { Color } from "../models/Color";

export const getRandom = (
  mode: { color: boolean; number: boolean },
  colors: Array<Color>,
  min: number,
  max: number,
  previous?: number | Color
) => {
  if (mode.color && mode.number) {
    const randomMode = getRandomNumber(0, 2);
    return randomMode === 1
      ? getRandomColor(colors, previous ? (previous as Color) : undefined)
      : getRandomNumber(min, max, previous ? Number(previous) : undefined);
  } else if (mode.color) {
    return getRandomColor(colors, previous ? (previous as Color) : undefined);
  } else if (mode.number) {
    return getRandomNumber(min, max, previous ? Number(previous) : undefined);
  } else {
    return getRandomColor(colors, previous ? (previous as Color) : undefined);
  }
};

export const getRandomColor = (colors: Array<Color>, previous?: Color) => {
  const colorsFilter = previous
    ? [...colors].filter((el) => el.code !== previous.code)
    : [...colors];
  const random = getRandomNumber(0, colorsFilter.length);
  return colorsFilter[random];
};

export const getRandomNumber = (
  min: number,
  max: number,
  previous?: number
) => {
  const random = Math.floor(Math.random() * (max - min) + min);
  if (previous && random === previous) {
    return getRandomNumber(min, max, previous);
  } else {
    return random;
  }
};
