import { IonContent, IonPage, IonFooter, IonIcon } from "@ionic/react";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import { addCircleOutline } from "ionicons/icons";
import classes from "./Feed.module.css";

import Drawer from "../components/Drawer";
import useRecipes from "../hooks/useRecipes";

const RecipeFeed: React.FC = () => {
  const { recipes, loading, error } = useRecipes();

  return (
    <>
      <Drawer contentId="main-content" />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen className={classes.content}>
          <div className={classes.recipes}>
            {recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </IonContent>
        <IonFooter className={classes.footer} translucent={true}>
          <IonIcon icon={addCircleOutline} className={classes.addButton} />
        </IonFooter>
      </IonPage>
    </>
  );
};

export default RecipeFeed;
