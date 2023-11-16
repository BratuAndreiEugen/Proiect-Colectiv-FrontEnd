import React from 'react';
import { IonContent, IonPage, IonIcon, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonImg } from '@ionic/react';
import { personAddOutline } from 'ionicons/icons';
import { Recipe } from '../data/recipe';
import { users, User } from '../data/user';
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header';
import classes from './UserProfile.module.css';

interface UserProfileProps {
}

const UserProfile: React.FC<UserProfileProps> = () => {
    useParams<{ username: string }>();

    const { isAuthenticated, username } = useContext(AuthContext);

    if (!isAuthenticated || !username) {
        return null;
    }

    const user: User | undefined = users.find((u) => u.username === username);

    if (!user) {
        console.log(`User with username ${username} not found.`);
        return null;
    }

    const { description, recipes } = user;


    return (
        <IonPage>
            <Header />
            <IonContent fullscreen>
                <div className={classes.userProfile}>
                    <div className={classes.header}>
                        <h2 className={classes.username}>{username}</h2>
                        <IonButton fill="outline" className={classes.followButton}>
                            Follow
                        </IonButton>
                    </div>
                    <p className={classes.description}>{description}</p>
                    <h3 className={classes.recipeTitle}>Recipes</h3>
                    <div className={classes.recipeList}>
                        {recipes.map((recipe: Recipe) => (
                            <RecipeCard key={recipe.id} recipe={recipe} />
                        ))}
                    </div>
                </div>

            </IonContent>
        </IonPage>
    );
};

export default UserProfile;