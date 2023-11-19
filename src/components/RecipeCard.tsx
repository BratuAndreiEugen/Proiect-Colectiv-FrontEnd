import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import classes from "./RecipeCard.module.css";
import { RecipeShort } from "../model/recipe";
import { Link } from "react-router-dom";

interface RecipeCardProps {
  recipe: RecipeShort;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <Link to={`/post/${recipe.id}`} className={classes.recipeLink}>
      <IonCard className={classes.recipeCard}>
        <IonImg src={recipe.thumbnailLink} />
        <IonCardHeader className={classes.header}>
          <IonCardTitle className={classes.title}>{recipe.title}</IonCardTitle>
          <IonCardSubtitle>By {recipe.posterUsername}</IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    </Link>
  );
};

export default RecipeCard;
