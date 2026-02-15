import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Recipe, GenerationMode } from "@/lib/types";
import { generateRecipe } from "@/lib/mock-api";
import { RecipeCard } from "@/components/ui/recipe-card";
import { AdPlaceholder } from "@/components/ad-placeholder";
import { Leaf, Wallet, Zap, Sparkles, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [mode, setMode] = useState<GenerationMode>("diet");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!ingredients.trim()) {
      toast({
        title: "Missing ingredients",
        description: "Please enter some ingredients first!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      // Simulate network delay for better UX even with mock/error
      await new Promise(resolve => setTimeout(resolve, 1500));
      const result = await generateRecipe({ ingredients, mode });
      setRecipe(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="text-center space-y-4 mb-10">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary tracking-tight">
            What's in your <span className="text-primary">fridge?</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Turn your leftover ingredients into a chef-quality meal instantly.
            Choose your cooking style below.
          </p>
        </div>

        <Card className="p-6 border-border/60 shadow-xl bg-card/50 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="relative">
              <Textarea 
                placeholder="e.g., 2 tomatoes, half an onion, some cheddar cheese, stale bread..." 
                className="min-h-[160px] text-lg p-4 rounded-xl border-2 border-border/50 focus-visible:border-primary focus-visible:ring-0 resize-none bg-background/50 shadow-inner"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
              <div className="absolute bottom-3 right-3 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded-md">
                {ingredients.length} chars
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 p-1.5 bg-muted/40 rounded-full border border-border/40">
              <ModeButton 
                active={mode === "diet"} 
                onClick={() => setMode("diet")}
                icon={<Leaf className="w-4 h-4" />}
                label="Healthy"
              />
              <ModeButton 
                active={mode === "budget"} 
                onClick={() => setMode("budget")}
                icon={<Wallet className="w-4 h-4" />}
                label="Budget"
              />
              <ModeButton 
                active={mode === "quick"} 
                onClick={() => setMode("quick")}
                icon={<Zap className="w-4 h-4" />}
                label="Quick"
              />
            </div>

            <Button 
              size="lg" 
              className="w-full text-lg h-14 rounded-xl font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-[0.98]"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                  Cooking magic...
                </>
              ) : (
                <>
                  Generate Recipe <span className="ml-2">✨</span>
                </>
              )}
            </Button>
          </div>
        </Card>

        <AdPlaceholder />

        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive text-center"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="font-medium">{error}</p>
            </motion.div>
          )}

          {recipe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <RecipeCard recipe={recipe} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
}

function ModeButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-sm font-bold transition-all duration-300
        ${active 
          ? "bg-white text-secondary shadow-sm ring-1 ring-black/5" 
          : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
        }
      `}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
