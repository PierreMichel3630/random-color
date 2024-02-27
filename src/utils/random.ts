import { Color } from "../models/Color";

export const getRandomColor = (colors: Array<Color>, previous?: Color) => {
  const colorsFilter = previous
    ? [...colors].filter((el) => el.code !== previous.code)
    : [...colors];
  const random = getRandomNumber(0, colorsFilter.length);
  return colorsFilter[random];
};

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};
