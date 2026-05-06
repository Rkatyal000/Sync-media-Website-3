import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const DEFAULT_FAQS = [
  {
    q: "What is single-source cross-media measurement?",
    a: "SYNC answers this by connecting exposure, audience de-duplication and outcome signals in one explainable measurement framework.",
  },
  {
    q: "Why does de-duplication matter?",
    a: "SYNC answers this by connecting exposure, audience de-duplication and outcome signals in one explainable measurement framework.",
  },
  {
    q: "What outcomes can SYNC measure?",
    a: "SYNC answers this by connecting exposure, audience de-duplication and outcome signals in one explainable measurement framework.",
  },
  {
    q: "Who is this useful for?",
    a: "SYNC answers this by connecting exposure, audience de-duplication and outcome signals in one explainable measurement framework.",
  },
  {
    q: "How does this differ from platform reporting?",
    a: "SYNC answers this by connecting exposure, audience de-duplication and outcome signals in one explainable measurement framework.",
  },
];

function FaqItem({ q, a, isOpen, onToggle, idx }) {
  const bodyRef = useRef(null);
  const [maxH, setMaxH] = useState(0);

  useEffect(() => {
    if (bodyRef.current) {
      setMaxH(isOpen ? bodyRef.current.scrollHeight : 0);
    }
  }, [isOpen, a]);

  return (
    <div className={`faq-item ${isOpen ? "faq-item--open" : ""}`} data-testid={`faq-item-${idx}`}>
      <button
        type="button"
        className="faq-q"
        onClick={onToggle}
        aria-expanded={isOpen}
        data-testid={`faq-toggle-${idx}`}
      >
        <span className="faq-q-text">{q}</span>
        <span className="faq-q-icon" aria-hidden="true">
          <Plus size={18} />
        </span>
      </button>
      <div
        className="faq-a-wrap"
        style={{ maxHeight: maxH }}
        aria-hidden={!isOpen}
      >
        <div ref={bodyRef} className="faq-a">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ({
  eyebrow = "FAQ",
  heading = "Questions teams ask before they decide.",
  sub = "Short, plain-English answers from the SYNC team.",
  faqs = DEFAULT_FAQS,
}) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section className="faq-section" data-testid="faq-section">
      <div className="container">
        <div className="faq-grid">
          <Reveal>
            <div className="faq-head">
              <span className="eyebrow">{eyebrow}</span>
              <h2>{heading}</h2>
              <p className="faq-sub">{sub}</p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="faq-list">
              {faqs.map((f, i) => (
                <FaqItem
                  key={f.q}
                  idx={i}
                  q={f.q}
                  a={f.a}
                  isOpen={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
