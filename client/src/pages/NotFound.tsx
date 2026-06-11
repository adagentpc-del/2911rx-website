import { Link } from "wouter";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="py-28 text-center">
      <p className="font-display text-6xl font-bold text-teal">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page Not Found</h1>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist.</p>
      <Link href="/">
        <Button className="mt-7">Back to Home</Button>
      </Link>
    </section>
  );
}
