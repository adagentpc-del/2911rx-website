/**
 * Lifestyle imagery for 2911Rx.
 * Free, commercially-licensed Unsplash photos (no attribution required),
 * served from the Unsplash CDN with on-the-fly sizing. Each band is a
 * responsive two-column image + copy block with a graceful muted fallback
 * if an image ever fails to load.
 */
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

export function unsplash(id: string, w = 1400) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export function Photo({
  id,
  alt,
  className,
  ratio = "aspect-[4/3]",
}: {
  id: string;
  alt: string;
  className?: string;
  ratio?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-[0_24px_60px_-30px_hsl(214_45%_11%/0.35)]", ratio, className)}>
      <img
        src={unsplash(id)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export function LifestyleBand({
  id,
  alt,
  eyebrow,
  title,
  body,
  reverse = false,
}: {
  id: string;
  alt: string;
  eyebrow: string;
  title: string;
  body: string;
  reverse?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
      <motion.div {...fadeUp} className={cn(reverse && "lg:order-2")}>
        <Photo id={id} alt={alt} />
      </motion.div>
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(reverse && "lg:order-1")}
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal-dark">
          {eyebrow}
        </p>
        <h2 className="text-3xl tracking-tight md:text-[2.4rem]">{title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{body}</p>
      </motion.div>
    </div>
  );
}
