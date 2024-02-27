import { percent, px, viewHeight } from "csx";
import { useEffect, useState } from "react";
import { style } from "typestyle";
import { ColorRecap } from "../components/ColorRecap";
import { useGlobal } from "../context/GlobalProvider";
import { Color } from "../models/Color";
import { Colors } from "../utils/color";
import { getRandomColor } from "../utils/random";
import { h1 } from "../utils/text";
import { useNavigate } from "react-router-dom";

const bodyCss = style({
  display: "flex",
  paddingTop: px(15),
  justifyContent: "center",
});

const blockCss = style({
  display: "flex",
  flexDirection: "column",
  gap: px(10),
  padding: px(5),
  textAlign: "center",
  maxWidth: px(600),
});

const divColorCss = style({
  display: "grid",
  gridAutoFlow: "row",
  gridTemplateColumns: "repeat(4, 1fr)",
  gridTemplateRows: "repeat(2, 1fr)",
});

const buttonCss = style({
  position: "absolute",
  bottom: 5,
  right: "45%",
  backgroundColor: Colors.purple,
  padding: px(10),
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  color: "white",
  border: 0,
  fontSize: px(45),
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: px(50),
});

const buttonMenuCss = style({
  backgroundColor: Colors.purple,
  padding: px(10),
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  color: "white",
  border: 0,
  fontSize: px(20),
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: px(50),
});

export const PlayPage = () => {
  const navigate = useNavigate();

  const COLORLIST: Array<Color> = [
    { name: "Bleu", code: Colors.blue },
    { name: "Rouge", code: Colors.red },
    { name: "Jaune", code: Colors.yellow },
    { name: "Vert", code: Colors.green },
  ];
  const { time } = useGlobal();

  const [isPlay, setIsPlay] = useState(true);
  const [color, setColor] = useState(getRandomColor(COLORLIST));
  const [colors, setColors] = useState<Array<Color>>([]);
  const [idInterval, setIdInterval] = useState<number | undefined>(undefined);

  useEffect(() => {
    setColors((prev) => [...prev, color]);
  }, [color]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColor((prev) => getRandomColor(COLORLIST, prev));
    }, time * 1000);
    setIdInterval(interval);
  }, []);

  useEffect(() => {
    if (idInterval && !isPlay) {
      clearInterval(idInterval);
    }
  }, [isPlay, idInterval]);

  const goHome = () => {
    navigate(`/`);
  };

  return isPlay ? (
    <>
      <div
        style={{
          backgroundColor: color.code,
          width: percent(100),
          height: viewHeight(100),
        }}
      />
      <button className={buttonCss} onClick={() => setIsPlay(false)}>
        Stop
      </button>
    </>
  ) : (
    <div className={bodyCss}>
      <div className={blockCss}>
        <p className={h1}>Récapitulatif</p>
        <div className={divColorCss}>
          {colors.map((el, index) => (
            <ColorRecap color={el} index={index} />
          ))}
        </div>
        <button className={buttonMenuCss} onClick={goHome}>
          Retour Accueil
        </button>
      </div>
    </div>
  );
};
