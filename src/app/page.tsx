// src/app/page.tsx
import RecipeFinder from './recipe/RecipeFinder';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-purple-600 to-pink-500 p-10 text-center text-white shadow-lg">
        <h1 className="text-4xl font-extrabold">Recipe Finder</h1>
        <p className="mt-2 text-xl font-light">Discover delicious recipes with ease</p>
      </header>
      <main className="flex-grow p-4">
        <RecipeFinder />
      </main>
    </div>
  );
};

export default HomePage;
