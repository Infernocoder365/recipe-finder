# Recipe Finder

A responsive web application built with Next.js, TailwindCSS, and TypeScript for finding recipes based on user-provided ingredients. It also features a detailed recipe page for more information about a specific recipe.

---

## Features

### Recipe Finder Page
- Users can input a comma-separated list of ingredients to find recipes.
- Responsive design ensures usability across devices.
- Displays recipes with their title, image, and ingredient counts (used and missed).
- Allows navigation to a detailed view of each recipe.

### Recipe Detail Page
- Displays detailed information about a recipe, including an image, summary, ingredients, health score, price per serving, and source link.
- Responsive layout with optimized design for images and text.
- Includes a back button to return to the previous page.

### Loading Spinner
- A modal-style loading spinner provides feedback during data fetching.

### Button Effects
- Buttons include hover and active animations for better interactivity.

### Input State Persistence
- User input on the Recipe Finder page is preserved when navigating back from the Recipe Detail page.

---

## Tech Stack
- **Next.js**: Framework for server-side rendering and routing.
- **TailwindCSS**: Utility-first CSS framework for responsive and modern designs.
- **TypeScript**: Strongly typed language for better maintainability and developer experience.
- **Spoonacular API**: Fetch recipes and detailed information using their API.

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Cool-Dev100/recipe-finder.git
   cd recipe-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your Spoonacular API key:
   ```env
   SPOONACULAR_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## File Structure

```
.
├── src
│   ├── app
        ├── api
        │   ├── recipeDetail
        │   │   └── route.ts
        │   ├── recipes
        │   │   └── route.ts
        ├── context
        │   ├── RecipeFinderContext.tsx
        ├── layouts
        │   └── RecipeLayout.tsx
        ├── recipe
        │   └── [id]
        │       └── page.tsx
        │   ├── RecipeFinder.tsx
        ├── UiUtils
        │   ├── LoadingSpinner.tsx
        │   └── RecipeCard.tsx
        └── globals.css
        └── layout.tsx
        └── page.tsx
```

---

## Components

### `RecipeFinder`
- Input field for entering ingredients.
- Fetches and displays recipe results.

### `RecipeDetail`
- Shows recipe details fetched by ID.

### `LoadingSpinner`
- A modal-style spinner for indicating data loading.

### `RecipeCard`
- Displays an individual recipe card with a link to the detail page.

---

## Responsive Design
- **Mobile**: The layout stacks elements vertically for smaller screens.
- **Tablet/Desktop**: Uses horizontal layouts and grids for larger screens.

---

## Enhancements
- Add user authentication to save favorite recipes.
- Implement pagination for recipe results.
- Allow users to filter recipes by dietary preferences.

---

## License
This project is open source and available under the [MIT License](LICENSE).

