import { useContext, useEffect, useState } from "react";
import { getAllRecipes, recipesMock } from "../requests/recipeService";
import { RecipeList } from "../model/recipe";
import { AuthContext } from "../context/AuthProvider";

const useRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userId } = useContext(AuthContext);

  console.log(userId);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipesData = await getAllRecipes(userId!);
        setRecipes(recipesData);
      } catch (error) {
        setError("Error fetching recipes");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return { recipes, loading, error };
};

export default useRecipes;
