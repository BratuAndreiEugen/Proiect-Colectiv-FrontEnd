import React, { useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../requests/userService";
import { getRecipesByUser } from "../requests/recipeService";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthProvider";
import classes from "./UserProfile.module.css";
import { IonContent, IonPage } from "@ionic/react";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfile: React.FC = () => {
  const { username, userId, bio } = useContext(AuthContext);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let recipesResponse = [];
        try {
          if (userId) recipesResponse = await getRecipesByUser(userId);
          setRecipes(recipesResponse);
        } catch (err) {}

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return (
    <>
      <Drawer contentId="user-profile" />
      <IonPage id="user-profile">
        <Header />
        <IonContent fullscreen>
          <div className={classes.userProfile}>
            <div className={classes.header}>
              <h1 className={classes.username}>User Profile: {username}</h1>
              <button className={classes.followButton}>Follow</button>
            </div>
            <p className={classes.description}>Bio: {bio}</p>
            <h2>Recipes:</h2>
            {recipes.length == 0 && (
              <p className={classes.description}>No recipes found</p>
            )}
            <div className={classes.recipeList}>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </IonContent>
        <Footer />
      </IonPage>
    </>
  );
};

export default UserProfile;
