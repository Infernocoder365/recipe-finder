// src/app/recipeDetail/RecipeDetail.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import RecipeLayout from '../../layouts/RecipeLayout'; // Import the shared layout
import LoadingSpinner from '../../UiUtils/LoadingSpinner'; // Import the LoadingSpinner

interface recipeItem {
  id: number;
  image: string;
  name: string;
  original: string;
}

interface recipe {
  id: string;
  image: string;
  title: string;
  summary: string;
  extendedIngredients: recipeItem[];
  healthScore: number;
  pricePerServing: number;
  sourceUrl: string;
  // missedIngredientCount: number;
}

const RecipeDetail = () => {
  const { id } = useParams(); // Accessing the dynamic `id` from the URL
  const [recipe, setRecipe] = useState<recipe | null>(null); // Recipe state
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(''); // Error state

  useEffect(() => {
    if (!id) return; // Don't fetch if no id is present

    const fetchRecipe = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`/api/recipeDetail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch recipe');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        setError('Error fetching recipe details. Please try again.');
      }
      setLoading(false);
    };

    fetchRecipe();
  }, [id]);

  // Return loading, error or no recipe found states
  if (loading) return <div className="flex justify-center items-center h-screen"><LoadingSpinner /></div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
  if (!recipe) return <div className="text-center p-6">No recipe found</div>;

  return (
    <RecipeLayout>
      <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        {/* Recipe Title */}
        <h1 className="text-4xl font-semibold text-center mb-6">{recipe.title}</h1>

        {/* Image and Summary Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-start sm:space-x-8 mb-8">
          {/* Recipe Image */}
          <div className="flex-shrink-0 w-full sm:w-1/3 mb-6 sm:mb-0">
            <Image
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 sm:h-auto object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Recipe Summary */}
          <div className="sm:w-2/3 text-lg text-gray-700">
            <div
              className="summary-html"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        </div>

        {/* Ingredients, Health Score, Price per Serving, Source */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>

          {/* Ingredient Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {recipe.extendedIngredients.map((ingredient: recipeItem) => (
              <div key={ingredient.id} className="flex items-center space-x-2">
                <Image
                  src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                  alt={ingredient.name}
                  className="w-16 h-16 rounded-full border-2 border-gray-300"
                />
                <span className="text-lg font-medium">{ingredient.original}</span>
              </div>
            ))}
          </div>

          {/* Health Score, Price per Serving, Source Link */}
          <div className="mt-4">
            <p><strong>Health Score:</strong> {recipe.healthScore}</p>
            <p><strong>Price per Serving:</strong> ${recipe.pricePerServing.toFixed(2)}</p>
            <p>
              Source: <a href={recipe.sourceUrl} target="_blank" className="text-blue-600">Recipe Source</a>
            </p>
          </div>
        </div>
      </div>
    </RecipeLayout>
  );
};

export default RecipeDetail;
