import {
  Box,
  Button,
  Container,
  Grid,
  Slider,
  Typography,
} from "@mui/material";
import { percent, px, viewHeight } from "csx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ColorRecap } from "../components/ColorRecap";
import { useGlobal } from "../context/GlobalProvider";
import { Color } from "../models/Color";
import { getRandom } from "../utils/random";

import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { useTranslation } from "react-i18next";
import { NumberRecap } from "../components/NumberRecap";
import { Colors } from "../utils/color";

export const PlayPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { time, setTime, colorMode, numberMode, colors, minNumber, maxNumber } =
    useGlobal();

  const [isPlay, setIsPlay] = useState(true);
  const [value, setValue] = useState<Color | number>(
    getRandom(
      { color: colorMode, number: numberMode },
      colors,
      Number(minNumber),
      Number(maxNumber)
    )
  );
  const [prevValue, setPrevValue] = useState<Array<Color | number>>([]);

  useEffect(() => {
    setPrevValue((prev) => [...prev, value]);
  }, [value]);

  const timeInterval = time ?? 5;

  useEffect(() => {
    if (isPlay) {
      const interval = setInterval(() => {
        setValue((prev) =>
          getRandom(
            { color: colorMode, number: numberMode },
            colors,
            Number(minNumber),
            Number(maxNumber),
            prev
          )
        );
      }, timeInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [
    colors,
    timeInterval,
    isPlay,
    colorMode,
    numberMode,
    minNumber,
    maxNumber,
  ]);

  const goHome = () => {
    navigate(`/`);
  };

  const handleChangeTime = (_event: Event, newValue: number | number[]) => {
    setTime(newValue as number);
  };

  return isPlay ? (
    <Box>
      <Box
        sx={{
          backgroundColor: Number.isInteger(value)
            ? Colors.black
            : (value as Color).code,
          width: percent(100),
          height: viewHeight(100),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Number.isInteger(value) && (
          <Typography
            variant="h2"
            sx={{ fontSize: "100px !important", color: Colors.white }}
          >
            {Number(value)}
          </Typography>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            width: percent(100),
            display: "flex",
            flexDirection: "column",
            pl: 6,
            pr: 6,
            alignItems: "center",
          }}
        >
          <StopCircleOutlinedIcon
            sx={{
              fontSize: 80,
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => setIsPlay(false)}
          />
          <Slider
            size="small"
            color="secondary"
            valueLabelDisplay="auto"
            defaultValue={timeInterval}
            value={timeInterval}
            onChange={handleChangeTime}
            valueLabelFormat={(value: number) => `${value} ${t("seconds")}`}
            min={1}
            max={timeInterval > 20 ? timeInterval * 2 : 20}
          />
        </Box>
      </Box>
    </Box>
  ) : (
    <Container maxWidth="sm">
      <Grid
        container
        alignContent="space-between"
        sx={{
          height: viewHeight(100),
          overflow: "auto",
        }}
      >
        <Grid item xs={12} sx={{ pt: 2 }}>
          <Grid container spacing={2} justifyContent="center">
            {prevValue.map((el, index) => (
              <Grid item key={index}>
                {Number.isInteger(el) ? (
                  <NumberRecap value={Number(el)} />
                ) : (
                  <ColorRecap color={el as Color} index={index} />
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            position: "sticky",
            bottom: 0,
            zIndex: 3,
            p: 1,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: px(50),
              p: 2,
            }}
            onClick={goHome}
          >
            <Typography variant="h2" sx={{ fontSize: 30 }}>
              {t("gobackhome")}
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
