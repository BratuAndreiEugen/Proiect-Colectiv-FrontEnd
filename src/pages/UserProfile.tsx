import React, {useContext, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from "../requests/userService";
import { getRecipesByUser } from "../requests/recipeService";
import RecipeCard from '../components/RecipeCard';
import {AuthContext} from "../context/AuthProvider";
import classes from './UserProfile.module.css';

const UserProfile: React.FC = () => {
    const { username } = useContext(AuthContext);
    const [user, setUser] = useState<any>(null);
    const [recipes, setRecipes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await getUserByUsername(username);
                setUser(userResponse.data);

                const recipesResponse = await getRecipesByUser(userResponse.data.id);
                setRecipes(recipesResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={classes.userProfile}>]
            <div className={classes.header}>
                <h1 className={classes.username}>User Profile: {user.username}</h1>
                <button className={classes.followButton}>Follow</button>
            </div>

            <p className={classes.description}>Bio: {user.bio}</p>

            <h2>Recipes:</h2>
            <div className={classes.recipeList}>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </div>
    );
};

export default UserProfile;