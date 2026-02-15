import { Recipe, GenerateRequest } from "./types";

export const API_BASE_URL = "https://late-cloud-3f0c.adilsoumebati.workers.dev";

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
    servings: 2,
    calories: 180,
    tags: ["Vegan", "Gluten-Free", "Quick"],
  },
};

export async function generateRecipe(
  request: GenerateRequest,
): Promise<Recipe> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error("API failed");
    }

    return await response.json();
  } catch (error) {
    console.log("Using mock recipe fallback");
    return MOCK_RECIPES["1"];
  }
}
