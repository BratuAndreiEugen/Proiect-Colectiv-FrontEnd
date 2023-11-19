import React, { useContext, useEffect, useState } from "react";
import { getUserByUsername } from "../requests/userService";
import { getRecipesByUser } from "../requests/recipeService";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthProvider";
import classes from "./UserProfile.module.css";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router";

const UserProfile: React.FC = () => {
  const params = useParams() as any;
  const { userId: username } = params;
  const [recipes, setRecipes] = useState<any[]>([]);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchedUser = await getUserByUsername(username);
        const userId = searchedUser.id;
        setBio(searchedUser.bio);

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
        <IonContent fullscreen className={classes.content}>
          <div className={classes.userProfile}>
            <div className={classes.header}>
              <h1 className={classes.username}>User Profile: {username}</h1>
              <IonButton className={classes.followButton}>Follow</IonButton>
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
