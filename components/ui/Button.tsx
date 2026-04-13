import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center rounded-xl px-6 py-3.5 text-center text-sm font-semibold font-sans transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-amber)] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "bg-[var(--brand-amber)] text-[var(--brand-dark)] shadow-card hover:bg-[var(--brand-amber-hover)] hover:shadow-card-hover",
  secondary:
    "border border-white bg-transparent text-white hover:bg-white/10",
  secondaryOnLight:
    "border border-[#e2e8f0] bg-white text-[var(--brand-dark)] shadow-card hover:border-[var(--brand-slate)]/30 hover:shadow-card-hover",
  ghost:
    "border border-transparent bg-transparent text-[var(--brand-slate)] hover:bg-[var(--brand-light)]",
} as const;

type Variant = keyof typeof variants;

type ButtonLinkProps = {
  href: LinkProps["href"];
  prefetch?: boolean;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonNativeProps = {
  href?: undefined;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const cls = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, prefetch } = props;
    return (
      <Link href={href} prefetch={prefetch} className={cls}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonNativeProps;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
