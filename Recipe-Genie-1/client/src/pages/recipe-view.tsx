import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { Layout } from "@/components/layout";
import { RecipeCard } from "@/components/ui/recipe-card";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { getRecipe } from "@/lib/mock-api";
import { Recipe } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function RecipeView() {
  const [location] = useLocation();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse ID from URL query params manually since wouter's useLocation doesn't parse query strings by default in all versions
  // Or simpler: use URLSearchParams
  const searchParams = new URLSearchParams(window.location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchRecipe() {
      if (!id) {
        setError("No recipe ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getRecipe(id);
        setRecipe(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading deliciousness...</p>
        </div>
      </Layout>
    );
  }

  if (error || !recipe) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-secondary mb-4">Recipe Not Found</h2>
          <p className="text-muted-foreground mb-8">{error || "We couldn't find the recipe you're looking for."}</p>
          <Link href="/">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Generator
          </Button>
        </Link>
      </div>

      <RecipeCard recipe={recipe} />
      
      <AdPlaceholder />
    </Layout>
  );
}
