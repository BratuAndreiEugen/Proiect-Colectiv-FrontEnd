import Tooltip from "@mui/material/Tooltip";
import RatingDisplay from "./RatingDisplay";
import React from "react";

interface ShortRatingDisplayProps {
  rating: number;
}
const ShortRatingDisplay = ({ rating }: ShortRatingDisplayProps) => {
  return(
    <div style={{  background: "white", fontSize: "1.3em" }}>
      <Tooltip title="Average Rating" arrow>
        <RatingDisplay rating={rating} type="tasty"/>
      </Tooltip>
    </div>
  )
}

export default ShortRatingDisplay;