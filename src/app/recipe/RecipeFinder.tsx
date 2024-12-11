// src/app/recipe/RecipeFinder.tsx
'use client';

import { useState } from 'react';
import { useRecipeFinder } from '../context/RecipeFinderContext';
import RecipeCard from '../UiUtils/RecipeCard';
import LoadingSpinner from '../UiUtils/LoadingSpinner';

interface recipe {
    id: string;
    image: string;
    title: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
}

const RecipeFinder = () => {
    // const [ingredients, setIngredients] = useState('');
    const { ingredients, setIngredients, recipes, setRecipes } = useRecipeFinder();
    // const [recipes, setRecipes] = useState<recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredients(e.target.value);
    };

    const handleSubmit = async () => {
        if (!ingredients.trim()) return; // Ensure not submitting empty input
        setLoading(true);
        setError('');
        try {
            const response = await fetch('/api/recipes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
            console.log(error);
            setError('Error fetching recipes. Please try again.');
        }
        setLoading(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Input and Button in the same line */}
            <div className="flex items-center mb-6 space-x-4">
                <input
                    type="text"
                    placeholder="Enter ingredients (comma-separated)"
                    value={ingredients}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown} // Added keydown event
                    className="w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg placeholder-gray-500"
                />
                <button
                    onClick={handleSubmit}
                    className="h-12 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    disabled={loading || !ingredients}
                >
                    {loading ? 'Finding Recipes...' : 'Search'}
                </button>
            </div>

            {/* Display LoadingSpinner if loading */}
            {loading && <LoadingSpinner />}

            {/* Error Message */}
            {error && <p className="text-red-500 text-center font-medium mb-6">{error}</p>}

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.length > 0 ? (
                    recipes.map((recipe: recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
                ) : (
                    <p className="col-span-3 text-center text-gray-500">No recipes found</p>
                )}
            </div>
        </div>
    );
};

export default RecipeFinder;
