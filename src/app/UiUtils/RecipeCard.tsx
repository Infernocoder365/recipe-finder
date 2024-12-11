'use client';

import Link from 'next/link';
import Image from 'next/image';
interface recipe {
    id: string;
    image: string;
    title: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
}
interface RecipeCardProps {
    recipe: recipe
}

const RecipeCard = (props: RecipeCardProps) => {
    const recipe = props.recipe;
    return (
        <div
            key={recipe.id}
            className="cursor-pointer group p-4 border rounded-md shadow-md hover:bg-gray-100 hover:shadow-lg transition-all duration-200 text-black"
        >
            <Link href={`/recipe/${recipe.id}`}>
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    width={240}
                    height={180}
                    className="w-full h-40 object-cover rounded-md transform transition-transform duration-300 group-hover:scale-110"
                />
                <h3 className="mt-2 font-bold text-lg">
                    {recipe.title}
                </h3>
                <p>Used Ingredients: {recipe.usedIngredientCount}</p>
                <p>Missing Ingredients: {recipe.missedIngredientCount}</p>
            </Link>
        </div>
    );
};

export default RecipeCard;
