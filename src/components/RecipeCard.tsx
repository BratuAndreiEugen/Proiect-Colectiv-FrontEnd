import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonImg,
} from "@ionic/react";
import classes from "./RecipeCard.module.css";
import { RecipeShort } from "../model/recipe";
import { Link } from "react-router-dom";
import RatingDisplay from "./RatingDisplay";
import Tooltip from "@mui/material/Tooltip";

interface RecipeCardProps {
  recipe: RecipeShort;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = recipe.caption ?? "";
  const textContent =
    recipe.caption?.at(0) === "<"
      ? Array.from(tempDiv.children)
          .map((paragraph) => paragraph.textContent)
          .join("\n")
      : tempDiv.innerText;

  return (
    <Link to={`/post/${recipe.id}`} className={classes.recipeLink}>
      <IonCard className={classes.recipeCard}>
        <IonImg src={recipe.thumbnailLink} />
        <IonCardHeader className={classes.header}>
          <div className={classes.titleContainer}>
            <IonCardTitle className={classes.title}>
              {recipe.title}
            </IonCardTitle>
            <IonCardSubtitle>By {recipe.posterUsername}</IonCardSubtitle>
          </div>
          <div
            className={classes.descriptionContainer}
          >
            <p className={classes.description}>
              {textContent.substring(0, 90) + "..."}
            </p>
            <div
              style={{
                fontSize: "0.6em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <Tooltip title="Healthy">
                <RatingDisplay
                  rating={recipe.healthAverageRating}
                  type="healthy"
                  feed
                />
              </Tooltip>
              <Tooltip title="Nutritional">
                <RatingDisplay
                  rating={recipe.nutritionAverageRating}
                  type="nutritive"
                  feed
                />
              </Tooltip>
              <Tooltip title="Tasty">
                <RatingDisplay
                  rating={recipe.tasteAverageRating}
                  type="tasty"
                  feed
                />
              </Tooltip>
            </div>
          </div>
        </IonCardHeader>
      </IonCard>
    </Link>
  );
};

export default RecipeCard;
