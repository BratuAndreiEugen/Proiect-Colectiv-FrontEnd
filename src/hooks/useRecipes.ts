import { useContext, useEffect, useState } from "react";
import { getAllRecipes, recipesMock } from "../requests/recipeService";
import { RecipeList } from "../model/recipe";
import { AuthContext } from "../context/AuthProvider";
import { getUserByUsername } from "../requests/userService";

const useRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const userData = await getUserByUsername(localStorage.getItem("username")!);
        const recipesData = await getAllRecipes(userData.id);
        setRecipes(recipesData);
      } catch (error) {
        setError("Error fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [userId]);

  return { recipes, loading, error };
};

export default useRecipes;
