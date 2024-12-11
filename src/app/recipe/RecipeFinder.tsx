'use client';

import { useState } from 'react';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIngredients(e.target.value);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredients.split(',').map((ingredient) => ingredient.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      setError('Error fetching recipes. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <input
        type="text"
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Find Recipes'}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.length > 0 ? (
          recipes.map((recipe: any) => (
            <div key={recipe.id} className="p-4 border rounded-md shadow-md">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 font-bold text-lg">{recipe.title}</h3>
              <p>Used Ingredients: {recipe.usedIngredientCount}</p>
              <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
            </div>
          ))
        ) : (
          <p>No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;
