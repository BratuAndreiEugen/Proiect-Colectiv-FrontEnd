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

interface RecipeCardProps {
  recipe: RecipeShort;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <IonCard className={classes.recipeCard}>
      <IonImg src={recipe.thumbnailLink} />
      <IonCardHeader>
        <IonCardTitle>{recipe.title}</IonCardTitle>
        <IonCardSubtitle>By {recipe.posterUsername}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default RecipeCard;
