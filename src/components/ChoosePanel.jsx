import { Box, Grid2 } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useState } from "react";

export default function ChoosePanel(props) {
  const [selectedChip, setSelectedChip] = useState(props.chips[0]);

  const handleChipClick = (chip) => {
    console.log(chip);
    setSelectedChip(chip);
    props.changeChip(chip);
  };

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        gap: 3,
        overflow: "auto",
      }}
    >
      {props.chips.map((chip) => (
        <Chip
          key={chip}
          label={chip}
          onClick={() => handleChipClick(chip)}
          sx={{
            backgroundColor:
              selectedChip === chip ? "primary.main" : "grey.300",
            color: selectedChip === chip ? "white" : "black",
            "&:hover": {
              backgroundColor:
                selectedChip === chip ? "primary.dark" : "grey.400",
            },
          }}
        />
      ))}
    </Box>
  );
}
