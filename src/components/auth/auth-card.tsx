import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
};

export function AuthCard({
  title,
  description,
  children,
  footer,
}: AuthCardProps) {
  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-[-0.045em]">
        {title}
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      <div className="mt-8">{children}</div>

      {footer && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}