export interface Recipe {
  id: string;
  title: string;
  description: string;

  // صورة رئيسية للوصفة
  image: string;

  ingredients: string[];
  instructions: string[];

  prepTime: string;
  cookTime: string;
  servings: number;

  calories?: number;
  tags: string[];
}

export type GenerationMode = "diet" | "budget" | "quick";

export interface GenerateRequest {
  ingredients: string;
  mode: GenerationMode;
}
