'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface recipe {
  id: string;
  image: string;
  title: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
}

interface RecipeFinderContextType {
  ingredients: string;
  setIngredients: (ingredients: string) => void;
  recipes: recipe[];
  setRecipes: (recipes: recipe[]) => void;
}

const RecipeFinderContext = createContext<RecipeFinderContextType | undefined>(undefined);

export const RecipeFinderProvider = ({ children }: { children: ReactNode }) => {
  const [ingredients, setIngredients] = useState<string>('');
  const [recipes, setRecipes] = useState<recipe[]>([]);

  return (
    <RecipeFinderContext.Provider value={{ ingredients, setIngredients, recipes, setRecipes }}>
      {children}
    </RecipeFinderContext.Provider>
  );
};

export const useRecipeFinder = () => {
  const context = useContext(RecipeFinderContext);
  if (!context) {
    throw new Error('useRecipeFinder must be used within a RecipeFinderProvider');
  }
  return context;
};
