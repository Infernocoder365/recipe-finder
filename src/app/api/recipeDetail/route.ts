// src/app/api/recipes/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.SPOONACULAR_API_KEY;

const getRecipeDetail = async (id: number) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,{}
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching recipes');
  }
};

export async function POST(req: Request) {
  const { id }: { id: number } = await req.json();

  if (!id || id === 0) {
    return NextResponse.json({ error: 'No id provided' }, { status: 400 });
  }

  try {
    const recipes = await getRecipeDetail(id);
    return NextResponse.json(recipes);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 });
  }
}
