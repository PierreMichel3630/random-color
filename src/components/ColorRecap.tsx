import { Box, Typography } from "@mui/material";
import { px } from "csx";
import { Color } from "../models/Color";

interface Props {
  index: number;
  color: Color;
}

export const ColorRecap = ({ index, color }: Props) => (
  <Box
    sx={{
      backgroundColor: color.code,
      minWidth: px(60),
      height: px(50),
      borderRadius: px(10),
      padding: px(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Typography variant="h2" color="white">
      {index}
    </Typography>
  </Box>
);
