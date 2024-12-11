// src/app/api/recipes/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY;

const getRecipes = async (ingredients: string[]) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredients.join(','),
          apiKey: API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching recipes');
  }
};

export async function POST(req: Request) {
  const { ingredients }: { ingredients: string[] } = await req.json();

  if (!ingredients || ingredients.length === 0) {
    return NextResponse.json({ error: 'No ingredients provided' }, { status: 400 });
  }

  try {
    const recipes = await getRecipes(ingredients);
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 });
  }
}
