import clsx from "clsx";
import React from "react";

export function Card({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-3xl px-10 py-4 drop-shadow-xl bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}
