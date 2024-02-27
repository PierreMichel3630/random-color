import { px, viewHeight } from "csx";
import { useNavigate } from "react-router-dom";
import { style } from "typestyle";
import { useGlobal } from "../context/GlobalProvider";
import { Colors } from "../utils/color";
import { h1, text } from "../utils/text";

const bodyCss = style({
  display: "flex",
  paddingTop: viewHeight(15),
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

const buttonCss = style({
  backgroundColor: Colors.purple,
  padding: px(8),
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  color: "white",
  border: 0,
  fontSize: px(20),
  fontWeight: 700,
  textTransform: "uppercase",
  cursor: "pointer",
  borderRadius: px(50),
});

const inputDivCss = style({
  fontSize: px(13),
  fontWeight: 500,
  fontFamily: ["Montserrat", "sans-serif"].join(","),
  color: Colors.purple,
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  width: "100%",
  border: "3px solid #eeeeee",
  backgroundColor: "#fff",
  height: px(50),
  borderRadius: px(15),
  textAlign: "center",
});

const inputCss = style({
  border: "none",
  color: "currentcolor",
  fontSize: px(25),
  fontWeight: 500,
  fontFamily: ["Montserrat", "sans-serif"].join(","),
});

export const HomePage = () => {
  const { time, setTime } = useGlobal();
  const navigate = useNavigate();

  const launch = () => {
    navigate(`/play`);
  };

  return (
    <div className={bodyCss}>
      <div className={blockCss}>
        <p className={h1}>Random Color</p>
        <p className={text}>Délai entre chaque couleur (en secondes) :</p>
        <div className={inputDivCss}>
          <input
            name="age"
            type="number"
            value={time}
            className={inputCss}
            onChange={(event) => setTime(Number(event.target.value))}
          />
        </div>
        <button className={buttonCss} onClick={() => launch()}>
          Start
        </button>
      </div>
    </div>
  );
};
