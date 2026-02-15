import { Recipe, GenerateRequest } from "./types";

export const API_BASE_URL = "https://late-cloud-3f0c.adlisoumbati.workers.dev";

// Mock data for fallback/demo purposes
const MOCK_RECIPES: Record<string, Recipe> = {
  "1": {
    id: "1",
    title: "Rustic Tomato Basil Soup",
    description:
      "A warming, hearty soup made with fresh tomatoes and aromatic basil. Perfect for a quick lunch or light dinner.",
    image: "https://images.unsplash.com/photo-1604908176997-431e5e3f5f4d",
    ingredients: [
      "4 large tomatoes, chopped",
      "1 onion, diced",
      "2 cloves garlic, minced",
      "1 cup vegetable broth",
      "Fresh basil leaves",
      "Olive oil",
      "Salt and pepper",
    ],
    instructions: [
      "Sauté onion and garlic in olive oil until soft.",
      "Add chopped tomatoes and cook for 5 minutes.",
      "Pour in vegetable broth and simmer for 15 minutes.",
      "Blend until smooth (optional) and stir in fresh basil.",
      "Season with salt and pepper to taste.",
    ],
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 4,
  },
};

// ✅ FIXED EXPORTS

export function getRecipe(id: string): Recipe | undefined {
  return MOCK_RECIPES[id];
}

export async function generateRecipe(
  data: GenerateRequest
): Promise<Recipe> {
  return {
    id: "generated",
    title: data.prompt,
    description: "AI generated recipe (mock)",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    instructions: ["Step 1", "Step 2"],
    prepTime: "10 mins",
    cookTime: "20 mins",
    servings: 2,
  };
}
