import { Box, Typography } from "@mui/material";
import { px } from "csx";
import { Colors } from "../utils/color";

interface Props {
  value: number;
}

export const NumberRecap = ({ value }: Props) => (
  <Box
    sx={{
      minWidth: px(60),
      height: px(50),
      borderRadius: px(10),
      padding: px(3),
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "1px solid black",
      backgroundColor: Colors.black,
    }}
  >
    <Typography variant="h2" color="white">
      {value}
    </Typography>
  </Box>
);
