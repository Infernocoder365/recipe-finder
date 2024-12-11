// src/app/page.tsx
import RecipeLayout from './layouts/RecipeLayout'; // Import the shared layout
import RecipeFinder from './recipe/RecipeFinder';

const HomePage = () => {
  return (
    <RecipeLayout>
      <RecipeFinder />
    </RecipeLayout>
  );
};

export default HomePage;
