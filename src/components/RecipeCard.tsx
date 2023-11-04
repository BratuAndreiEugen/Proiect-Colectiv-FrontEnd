import React from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonImg,
} from "@ionic/react";
import { Recipe } from "../data/recipe";
import classes from "./RecipeCard.module.css";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <IonCard className={classes.recipeCard}>
      <IonImg src={recipe.photoUrl} />
      <IonCardHeader>
        <IonCardTitle>{recipe.title}</IonCardTitle>
        <IonCardSubtitle>By {recipe.username}</IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  );
};

export default RecipeCard;
