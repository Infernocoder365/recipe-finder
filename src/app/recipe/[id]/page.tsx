// src/app/recipeDetail/RecipeDetail.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'; // Import the useRouter hook
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
  const router = useRouter(); // Initialize the router
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
        console.log(error);
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
      <div className="max-w-5xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        {/* Back Button */}
        <button
          onClick={() => router.back()} // Navigate to the previous page
          className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 text-sm font-medium active:scale-95 cursor-pointer"
        >
          ← Back
        </button>

        {/* Recipe Title */}
        <h1 className="text-2xl sm:text-4xl font-semibold text-center mb-6">{recipe.title}</h1>

        {/* Image and Summary Section */}
        <div className="flex flex-col md:flex-row md:items-start md:space-x-8 mb-8">
          {/* Recipe Image */}
          <div className="w-full md:w-1/3 mb-4 md:mb-0 flex-shrink-0">
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover w-full h-full"
            />
          </div>

          {/* Recipe Summary */}
          <div className="md:w-2/3 text-gray-700">
            <div
              className="summary-html text-sm sm:text-lg"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </div>
        </div>

        {/* Ingredients, Health Score, Price per Serving, Source */}
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Ingredients</h2>

          {/* Ingredients Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            {recipe.extendedIngredients.map((ingredient: recipeItem) => (
              <div key={ingredient.id} className="flex items-center space-x-2">
                <Image
                  src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
                  alt={ingredient.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
                <span className="text-sm sm:text-base font-medium">{ingredient.original}</span>
              </div>
            ))}
          </div>

          {/* Additional Details */}
          <div className="text-sm sm:text-base">
            <p><strong>Health Score:</strong> {recipe.healthScore}</p>
            <p><strong>Price per Serving:</strong> ${recipe.pricePerServing.toFixed(2)}</p>
            <p>
              <strong>Source:</strong>{' '}
              <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                Recipe Source
              </a>
            </p>
          </div>
        </div>
      </div>
    </RecipeLayout>
  );
};

export default RecipeDetail;
