import { px } from "csx";
import { style } from "typestyle";
import { Color } from "../models/Color";
import { h2 } from "../utils/text";

const divCss = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

interface Props {
  index: number;
  color: Color;
}

export const ColorRecap = ({ index, color }: Props) => (
  <div className={divCss}>
    <p className={h2}>{index}</p>
    <div
      style={{
        backgroundColor: color.code,
        width: px(50),
        height: px(50),
        borderRadius: px(10),
      }}
    />
  </div>
);
