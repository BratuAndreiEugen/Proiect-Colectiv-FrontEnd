import { useEffect, useState } from "react";
import { getAllRecipes, recipesMock } from "../requests/recipeService";
import { RecipeList } from "../model/recipe";

const useRecipes = () => {
  const [recipes, setRecipes] = useState<RecipeList>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const recipesData = await getAllRecipes();
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