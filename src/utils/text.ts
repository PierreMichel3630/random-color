import { style } from "typestyle";
import { Colors } from "./color";

export const h1 = style({
  fontFamily: ["Bowlby One SC", "sans-serif"].join(","),
  fontSize: 50,
  fontWeight: 700,
  color: Colors.purple,
  margin: 0,
});

export const h2 = style({
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  fontSize: 30,
  fontWeight: 700,
  color: Colors.purple,
  margin: 0,
});

export const text = style({
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  fontSize: 12,
  color: Colors.purple,
  margin: 0,
});
