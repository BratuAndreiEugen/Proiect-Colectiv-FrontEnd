import React, { useRef } from "react";
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
import RatingDisplay from "./RatingDisplay";

interface RecipeCardProps {
  recipe: RecipeShort;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const cardRef = useRef(null);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = recipe.caption ?? '';
  const textContent = recipe.caption?.at(0) === '<' ?  Array.from(tempDiv.children)
    .map(paragraph => paragraph.textContent)
    .join('\n') : tempDiv.innerText;

  return (
    <Link to={`/post/${recipe.id}`} className={classes.recipeLink}>
      <IonCard
        className={classes.recipeCard}
      >
        <IonImg src={recipe.thumbnailLink} />
        <IonCardHeader className={classes.header}>
          <div className={classes.titleContainer}>
            <IonCardTitle className={classes.title}>{recipe.title}</IonCardTitle>
            <IonCardSubtitle>By {recipe.posterUsername}</IonCardSubtitle>

          </div>
          <div className={classes.descriptionContainer} style={{ position: "relative" }}>
            <p className={classes.description}>{textContent.substring(0,90)+"..." }</p>
            <div style={{ position: "absolute", top: "-30px"}}>
              <RatingDisplay rating={recipe.averageRating ?? 0} type="tasty"/>
            </div>
          </div>
        </IonCardHeader>
      </IonCard>
    </Link>
  );
};

export default RecipeCard;
