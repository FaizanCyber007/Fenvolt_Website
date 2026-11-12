import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  arrow?: boolean;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  className,
  arrow = true,
  external,
}: ButtonLinkProps) {
  const classes = cn("btn group", variant === "ghost" && "btn-ghost", className);

  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          strokeWidth={1.5}
          className="btn-arrow size-4"
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noreferrer noopener"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
