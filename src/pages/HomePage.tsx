import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FilledInput,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { px, viewHeight } from "csx";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ColorSelector } from "../components/ColorSelector";
import { useGlobal } from "../context/GlobalProvider";
import { Color } from "../models/Color";
import { LANGUAGES, Language } from "../models/Language";
import { COLORLIST, Colors } from "../utils/color";

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const HomePage = () => {
  const {
    time,
    setTime,
    colors,
    setColors,
    language,
    setLanguage,
    colorMode,
    setColorMode,
    numberMode,
    setNumberMode,
    minNumber,
    setMinNumber,
    maxNumber,
    setMaxNumber,
  } = useGlobal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const colorsCode = useMemo(() => colors.map((el) => el.code), [colors]);
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  };

  const selectLanguage = (language: Language) => {
    setLanguage(language);
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const launch = () => {
    if (!isErrorMax) navigate(`/play`);
  };

  const onSelectColor = (value: Color) => {
    const codes = colors.map((el) => el.code);
    const isAdd = codes.includes(value.code);
    const filterArray = [...colors].filter((el) => el.code !== value.code);
    setColors(
      isAdd
        ? filterArray.length > 0
          ? filterArray
          : [...colors]
        : [...colors, value]
    );
  };

  const isErrorMax =
    numberMode &&
    (minNumber === undefined ||
      maxNumber === undefined ||
      (minNumber && maxNumber && minNumber > maxNumber))
      ? true
      : false;

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: viewHeight(100),
      }}
    >
      <Box sx={{ position: "absolute", top: 10, right: 10 }}>
        <IconButton
          aria-label="language"
          color="inherit"
          onClick={handleOpenMenu}
        >
          <Avatar src={language.icon} />
        </IconButton>
        <Menu
          sx={{ mt: "50px" }}
          id="menu-appbar"
          anchorEl={anchor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchor)}
          onClose={handleCloseMenu}
        >
          {LANGUAGES.map((language) => (
            <MenuItem
              key={language.iso}
              onClick={() => selectLanguage(language)}
              sx={{ pl: 1, pr: 1 }}
            >
              <ListItemIcon>
                <Avatar
                  src={language.icon}
                  sx={{ width: 32, height: 32, mr: 1 }}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h6">{language.name}</Typography>
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Grid container spacing={1} sx={{ mt: 1, mb: 1 }}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h1">{t("appname")}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <Typography variant="h6">{t("description")}</Typography>
        </Grid>
        <Grid item xs={12}>
          <OutlinedInput
            id="time"
            fullWidth
            type="number"
            endAdornment={
              <InputAdornment position="end" sx={{ color: "inherit" }}>
                <Typography variant="h6">{t("seconds")}</Typography>
              </InputAdornment>
            }
            sx={{ backgroundColor: "white" }}
            value={time}
            onChange={(event) =>
              setTime(
                event.target.value !== ""
                  ? Number(event.target.value)
                  : undefined
              )
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <CancelIcon
                    sx={{
                      fontSize: 35,
                      color: Colors.red2,
                    }}
                  />
                }
                checkedIcon={
                  <CheckCircleIcon
                    sx={{
                      fontSize: 35,
                      color: Colors.green2,
                    }}
                  />
                }
                checked={colorMode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setColorMode(event.target.checked)
                }
              />
            }
            label={
              <Typography
                variant="h4"
                sx={{
                  color: colorMode ? Colors.green2 : Colors.red2,
                }}
              >
                {t("color")}
              </Typography>
            }
          />
          {colorMode && (
            <Grid container spacing={2} justifyContent="center">
              {COLORLIST.map((el) => (
                <Grid item key={el.code}>
                  <ColorSelector
                    color={el}
                    selected={colorsCode.includes(el.code)}
                    onSelect={() => onSelectColor(el)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                icon={
                  <CancelIcon
                    sx={{
                      fontSize: 35,
                      color: Colors.red2,
                    }}
                  />
                }
                checkedIcon={
                  <CheckCircleIcon
                    sx={{
                      fontSize: 35,
                      color: Colors.green2,
                    }}
                  />
                }
                checked={numberMode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setNumberMode(event.target.checked)
                }
              />
            }
            label={
              <Typography
                variant="h4"
                sx={{
                  color: numberMode ? Colors.green2 : Colors.red2,
                }}
              >
                {t("number")}
              </Typography>
            }
          />
          {numberMode && (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={6}>
                <FormControl variant="filled" error={isErrorMax} fullWidth>
                  <InputLabel htmlFor="minNumber">{t("minimum")}</InputLabel>
                  <FilledInput
                    id="minNumber"
                    type="number"
                    sx={{ backgroundColor: "white !important" }}
                    value={minNumber}
                    onChange={(event) =>
                      setMinNumber(
                        event.target.value !== ""
                          ? Number(event.target.value)
                          : undefined
                      )
                    }
                  />
                  {isErrorMax && (
                    <FormHelperText id="minNumber">
                      {t("error.min")}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="filled" error={isErrorMax} fullWidth>
                  <InputLabel htmlFor="maxNumber">{t("maximum")}</InputLabel>
                  <FilledInput
                    id="maxNumber"
                    fullWidth
                    type="number"
                    sx={{
                      backgroundColor: "white !important",
                    }}
                    value={maxNumber}
                    onChange={(event) => {
                      const value =
                        event.target.value !== ""
                          ? Number(event.target.value)
                          : undefined;
                      setMaxNumber(value);
                    }}
                  />
                  {isErrorMax && (
                    <FormHelperText id="maxNumber">
                      {t("error.max")}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ borderRadius: px(50), p: 2 }}
            onClick={() => launch()}
          >
            <Typography variant="h2" sx={{ fontSize: 30 }}>
              Start
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
