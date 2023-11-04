import { IonContent, IonPage, IonFooter, IonIcon } from "@ionic/react";
import RecipeCard from "../components/RecipeCard";
import { recipes } from "../data/recipe";
import Header from "../components/Header";
import { addCircleOutline } from "ionicons/icons";
import classes from "./Feed.module.css";

const RecipeFeed: React.FC = () => {
  return (
    <IonPage>
      <Header />
      <IonContent fullscreen className={classes.content}>
        <div className={classes.recipes}>
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} />
          ))}
        </div>
      </IonContent>
      <IonFooter className={classes.footer} translucent={true}>
        <IonIcon icon={addCircleOutline} className={classes.addButton} />
      </IonFooter>
    </IonPage>
  );
};

export default RecipeFeed;
