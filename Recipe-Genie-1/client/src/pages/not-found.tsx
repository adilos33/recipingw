import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-4 bg-destructive/10 rounded-full">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-display font-bold text-secondary">Page Not Found</h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Oops! The page you're looking for seems to have been eaten.
          </p>
        </div>

        <Link href="/">
          <Button size="lg" className="rounded-full">
            Return to Kitchen
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
