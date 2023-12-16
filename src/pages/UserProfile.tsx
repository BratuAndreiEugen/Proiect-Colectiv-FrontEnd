import React, { useContext, useEffect, useState } from "react";
import { followWithUsername, getFollowersUserName, getUserByUsername } from "../requests/userService";
import { getRecipesByUser } from "../requests/recipeService";
import RecipeCard from "../components/RecipeCard";
import { AuthContext } from "../context/AuthProvider";
import classes from "./UserProfile.module.css";
import { IonButton, IonContent, IonPage } from "@ionic/react";
import Drawer from "../components/Drawer";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router";
import { User, UserShort } from "../model/user";
import { Follow } from "../model/Follow";

const UserProfile: React.FC = () => {
  const params = useParams() as any;
  const { userId: username } = params;
  const [viewedUser, setViewedUser] = useState<UserShort | null>(null);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchedUser = await getUserByUsername(username);
        const userId = searchedUser.id;

        setBio(searchedUser.bio);
        setViewedUser(searchedUser);

        let recipesResponse = [];
        try {
          if (userId) recipesResponse = await getRecipesByUser(userId);
          setRecipes(recipesResponse);
        } catch (err) {}

        const followers: Follow[] = await getFollowersUserName(username);
        const loggedUserId = localStorage.getItem("id");
        if(loggedUserId) {
          const a = followers.some(follow => follow.foloweeId === parseInt(loggedUserId));
          console.log(a)
          setFollowing(a);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const follow = async () => {
    try{
      const loggedUserId = localStorage.getItem("id");
      if(loggedUserId && viewedUser){
        await followWithUsername({ userName: viewedUser.username, followeeId: parseInt(loggedUserId) })
        setFollowing(!following);
      }
    } catch (error) {
      console.error("Error sending follow request:", error);
      setLoading(false);
    }
  }

  return (
    <>
      <Drawer contentId="user-profile" />
      <IonPage id="user-profile">
        <Header />
        <IonContent fullscreen className={classes.content}>
          <div className={classes.userProfile}>
            <div className={classes.header}>
              <h1 className={classes.username}>{username}</h1>
              {username != localStorage.getItem("username") ?
              (<IonButton className={classes.followButton} onClick={follow}>{following ? 'Unfollow' : 'Follow'}</IonButton>): <p></p>}
            </div>
            <p className={classes.description}>{bio}</p>
            <h2>Recipes:</h2>
            {loading ? (
              <p>Loading...</p>) : recipes.length == 0 && (
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
