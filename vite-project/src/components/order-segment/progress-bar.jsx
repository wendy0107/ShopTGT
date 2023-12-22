import React from "react";
import { Slider, Box } from "@mui/material";

function ProgressBar({ currentStage, disabled }) {

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
      }}
    >
      <Slider
        value={currentStage}
        disabled
        sx={{
          "&.Mui-disabled": {
            color:"blue",
          },
          width: "70vw",
          display: "inline-block",
          transform: "translate(0, 0.4rem)",
          "& .MuiSlider-thumb": {
            height: 16,
            width: 16,
          },
        }}
        marks={[
          { value: 0, label: "Make order" },
          { value: 1, label: "View summary" },
          { value: 2, label: "Check final order" },
          { value: 3, label: "Collect order" },
        ]}
        step={1} // Ensure discrete steps
        min={0}
        max={3}
        valueLabelDisplay="off"
      />
    </Box>
  );
}

export default ProgressBar;
