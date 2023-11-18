import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from "../requests/userService";
import { getRecipesByUser } from "../requests/recipeService";
import RecipeCard from '../components/RecipeCard';

interface RouteParams {
    username: string;
}

const UserProfile: React.FC = () => {
    const { username } = useParams<RouteParams>();
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
        <div>
            <h1>User Profile: {user.username}</h1>
            <p>Bio: {user.bio}</p>

            <h2>Recipes:</h2>
            {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </div>
    );
};

export default UserProfile;