"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_LINK = "gradia-3t9teu/gradia-demo" as const;
const CAL_CONFIG = '{"layout":"month_view"}' as const;

type BookDemoButtonProps = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

export function BookDemoButton({
  className,
  children,
  onClick,
}: BookDemoButtonProps) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", { hideEventTypeDetails: false });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-link={CAL_LINK}
      data-cal-config={CAL_CONFIG}
      className={className}
      onClick={onClick}
    >
      {children ?? "Book a Demo →"}
    </button>
  );
}
