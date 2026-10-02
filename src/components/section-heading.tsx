import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="text-xs font-bold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="max-w-[20ch] text-[2rem] leading-[1.08] font-extrabold tracking-[-0.03em] text-balance sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </FadeIn>
  );
}
