import React from "react";

type Recipe = {
  id?: string;
  title?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  servings?: number;
  calories?: number;
  tags?: string[];
};

type Props = {
  recipe?: Recipe | null;
  loading?: boolean;
  error?: string | null;
};

export function RecipeCard({ recipe, loading = false, error = null }: Props) {
  // Loading state
  if (loading) {
    return (
      <div className="rounded-xl border bg-background p-4">
        <h3 className="text-sm font-semibold">Recipe</h3>
        <p className="mt-2 text-sm text-muted-foreground">Loading recipe…</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="rounded-xl border bg-background p-4">
        <h3 className="text-sm font-semibold">Recipe</h3>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  // Safe fallbacks (هذا أهم شيء لمنع "Cannot read properties of undefined (reading 'map')")
  const title = recipe?.title?.trim() || "Untitled recipe";
  const description = recipe?.description?.trim() || "";
  const ingredients = Array.isArray(recipe?.ingredients)
    ? recipe!.ingredients!
    : [];
  const instructions = Array.isArray(recipe?.instructions)
    ? recipe!.instructions!
    : [];
  const tags = Array.isArray(recipe?.tags) ? recipe!.tags! : [];

  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold leading-tight">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
        {recipe?.prepTime ? <span>Prep: {recipe.prepTime}</span> : null}
        {recipe?.cookTime ? <span>Cook: {recipe.cookTime}</span> : null}
        {typeof recipe?.servings === "number" ? (
          <span>Servings: {recipe.servings}</span>
        ) : null}
        {typeof recipe?.calories === "number" ? (
          <span>Calories: {recipe.calories}</span>
        ) : null}
      </div>

      {/* Tags */}
      {tags.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {tags.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      ) : null}

      {/* Ingredients */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Ingredients</h4>
        {ingredients.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No ingredients found.
          </p>
        ) : (
          <ul className="mt-2 grid gap-2 sm:grid-cols-2">
            {ingredients.map((ing, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/60" />
                <span>{ing}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold">Instructions</h4>
        {instructions.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">
            No instructions found.
          </p>
        ) : (
          <ol className="mt-2 space-y-2">
            {instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
