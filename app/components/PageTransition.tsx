"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type Direction = "left" | "right" | "none";

function getDirection(pathname: string): Direction {
  try {
    const value = window.sessionStorage.getItem("montessori-nav-direction");
    if (!value) return "none";
    const pending = JSON.parse(value) as {
      direction?: Direction;
      target?: string;
      createdAt?: number;
    };

    if (
      pending.target === pathname &&
      (pending.direction === "left" || pending.direction === "right") &&
      typeof pending.createdAt === "number" &&
      Date.now() - pending.createdAt < 3000
    ) {
      return pending.direction;
    }
  } catch {
    return "none";
  }

  return "none";
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    const direction = getDirection(pathname);
    if (!page || direction === "none") return;

    const className = `page-enter-from-${direction}`;
    page.classList.add(className);
    const timer = window.setTimeout(() => page.classList.remove(className), 520);

    return () => {
      window.clearTimeout(timer);
      page.classList.remove(className);
    };
  }, [pathname]);

  return (
    <div className="page-transition" ref={pageRef}>
      {children}
    </div>
  );
}
