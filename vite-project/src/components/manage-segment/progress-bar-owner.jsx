import React from "react";
import { Slider, Box } from "@mui/material";

function ProgressBarOwner({ currentStage }) {
  const renderSlider = () => {
    const stageToValueMap = {
      OPEN: 0,
      CLOSED: 1,
      FINALIZED: 2,
      ARRIVED: 3,
    };
    return (
      <Slider
        value={stageToValueMap[currentStage]}
        disabled
        sx={{
          "&.Mui-disabled": {
            color: "blue",
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
          { value: 0, label: "Accept orders" },
          { value: 1, label: "Make order" },
          { value: 2, label: "Wait for order" },
          { value: 3, label: "Order arrived" },
        ]}
        step={1} // Ensure discrete steps
        min={0}
        max={3}
        valueLabelDisplay="off"
      />
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4rem",
      }}
    >
      {renderSlider()}
    </Box>
  );
}

export default ProgressBarOwner;
