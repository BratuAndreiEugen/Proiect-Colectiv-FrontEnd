import { IonContent, IonPage } from "@ionic/react";
import RecipeCard from "../components/RecipeCard";
import Header from "../components/Header";
import classes from "./Feed.module.css";

import Drawer from "../components/Drawer";
import useRecipes from "../hooks/useRecipes";
import Footer from "../components/Footer";

const RecipeFeed: React.FC = () => {
  const { recipes, loading, error } = useRecipes();

  return (
    <>
      <Drawer contentId="main-content" />
      <IonPage id="main-content">
        <Header />
        <IonContent fullscreen className={classes.content}>
          <div className={classes.recipes}>
            {loading ? (
              <p>Loading...</p> ) : recipes.map((recipe) => (
              <RecipeCard recipe={recipe} key={recipe.id} />
            ))}
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default RecipeFeed;
