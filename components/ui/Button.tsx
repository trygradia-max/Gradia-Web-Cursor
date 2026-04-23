import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center px-6 py-3.5 text-center text-sm font-semibold font-sans tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-primary)] disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary:
    "rounded-full bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] transition-transform duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  secondary:
    "rounded-[2px] border border-[var(--border-subtle)] bg-transparent text-[var(--foreground)] hover:border-[var(--brand-slate)]/40 hover:bg-[var(--bg-band)]",
  secondaryOnLight:
    "rounded-[2px] border border-[#e2e8f0] bg-white text-[var(--brand-dark)] shadow-card hover:border-[var(--brand-slate)]/30 hover:shadow-card-hover",
  ghost:
    "rounded-[2px] border border-transparent bg-transparent text-[var(--brand-slate)] hover:bg-[var(--brand-light)]",
} as const;

type Variant = keyof typeof variants;

type ButtonLinkProps = {
  href: LinkProps["href"];
  prefetch?: boolean;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
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
    const { href, prefetch, onClick } = props;
    return (
      <Link href={href} prefetch={prefetch} className={cls} onClick={onClick}>
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
