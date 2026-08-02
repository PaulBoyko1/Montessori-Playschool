"use client";

import { useState } from "react";
import { curriculum } from "../site-data";

export default function CurriculumAccordion({ compact = false }: { compact?: boolean }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`curriculum-accordion ${compact ? "curriculum-compact" : ""}`}>
      {curriculum.map((area, index) => {
        const isOpen = openIndex === index;
        const panelId = `curriculum-panel-${index}`;

        return (
          <section className={isOpen ? "is-open" : ""} key={area.title}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span>{area.title}</span>
                <span className="accordion-indicator" aria-hidden="true">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div className="accordion-panel" id={panelId} aria-hidden={!isOpen}>
              <div>
                <p>{area.description}</p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

