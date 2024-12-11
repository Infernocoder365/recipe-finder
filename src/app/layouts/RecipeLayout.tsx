// src/app/layouts/RecipeLayout.tsx
import React from 'react';

const RecipeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-10 text-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Recipe Finder</h1>
        <p className="mt-2 text-xl font-light">Discover delicious recipes with ease</p>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-4 text-black">
        {children}
      </main>
    </div>
  );
};

export default RecipeLayout;
