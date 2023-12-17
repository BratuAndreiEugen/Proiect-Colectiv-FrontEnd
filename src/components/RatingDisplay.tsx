import {
  BsEmojiAngryFill,
  BsEmojiExpressionlessFill,
  BsEmojiGrinFill,
  BsEmojiHeartEyesFill,
  BsEmojiNeutralFill,
  BsEmojiSmileFill,
  BsFillEmojiDizzyFill,
} from "react-icons/bs";

interface RatingDisplayProps {
  rating: number;
  type: "healthy" | "nutritive" | "tasty";
  feed?: boolean;
}

const RatingDisplay = ({ rating, type, feed }: RatingDisplayProps) => {
  const displayedRating = rating / 10;
  const color =
    type === "healthy" ? "#68c468" : type === "tasty" ? "#fb8846" : "#dad74e";

  return (
    <div
      style={{
        color: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: feed ? "4px" : "5px",
      }}
    >
      {displayedRating <= 1 ? (
        <BsFillEmojiDizzyFill style={{ fontSize: "1.5em" }} />
      ) : displayedRating <= 2 ? (
        <BsEmojiAngryFill style={{ fontSize: "1.5em" }} />
      ) : displayedRating <= 4 ? (
        <BsEmojiExpressionlessFill style={{ fontSize: "1.5em" }} />
      ) : displayedRating <= 5 ? (
        <BsEmojiNeutralFill style={{ fontSize: "1.5em" }} />
      ) : displayedRating <= 7 ? (
        <BsEmojiSmileFill style={{ fontSize: "1.5em" }} />
      ) : displayedRating <= 9 ? (
        <BsEmojiGrinFill style={{ fontSize: "1.5em" }} />
      ) : (
        <BsEmojiHeartEyesFill style={{ fontSize: "1.5em" }} />
      )}
      <p style={{ fontSize: "1.1em" }}>{displayedRating}</p>
    </div>
  );
};

export default RatingDisplay;
