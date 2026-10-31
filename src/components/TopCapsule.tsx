"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { Glass } from "@samasante/liquid-glass";
import { glassEdge, pillOpticsFor, pillTint } from "@/lib/pillStyle";

export default function TopCapsule({
  children,
  ariaLabel = "Top navigation",
}: {
  children: ReactNode;
  ariaLabel?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 47.9375rem)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 h-0 pointer-events-none"
      aria-label={ariaLabel}
    >
      <div className="flex justify-center px-4 pt-4 sm:pt-5">
        <Glass
          className={`pointer-events-auto ${glassEdge}`}
          style={pillTint}
          optics={pillOpticsFor(isMobile)}
        >
          <div className="flex items-center gap-6 px-5 py-2.5 sm:gap-8 sm:px-6 sm:py-3">
            {children}
          </div>
        </Glass>
      </div>
    </nav>
  );
}