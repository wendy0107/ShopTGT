import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function ClickableCopyCard({ text }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error copying text:", error));
  };

  return (
    <Card
      onClick={handleClick}
      sx={{ margin: "1rem 1rem 1rem 1rem", padding: '0rem', backgroundColor: "rgb(229, 246, 253)"     }}
    >
      <CardContent>
        {copied ? (
          <Typography variant="caption">Copied!</Typography>
        ) : (
          <Typography variant="caption">
            Click to copy shareable link
          </Typography>
        )}
        <Typography variant="body2"> Link: {text}</Typography>
      </CardContent>
    </Card>
  );
}

export default ClickableCopyCard;
