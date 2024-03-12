import { brown, green, pink, purple, red } from "@mui/material/colors";
import { Color } from "../models/Color";

export const Colors = {
  purple: "#512da8",
  purple2: purple[500],
  red: "#f44336",
  red2: red["A700"],
  pink: pink[300],
  blue: "#2196f3",
  green: "#4caf50",
  green2: green[800],
  yellow: "#ffeb3b",
  orange: "#ff9800",
  brown: brown[700],
  black: "black",
  white: "white",
};

export const DEFAULTCOLORLIST: Array<Color> = [
  { name: "Bleu", code: Colors.blue },
  { name: "Vert", code: Colors.green },
  { name: "Jaune", code: Colors.yellow },
  { name: "Rouge", code: Colors.red },
];

export const COLORLIST: Array<Color> = [
  { name: "Bleu", code: Colors.blue },
  { name: "Vert", code: Colors.green },
  { name: "Jaune", code: Colors.yellow },
  { name: "Orange", code: Colors.orange },
  { name: "Rose", code: Colors.pink },
  { name: "Rouge", code: Colors.red },
  { name: "Violet", code: Colors.purple2 },
  { name: "Marron", code: Colors.brown },
];
