import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { birthday as cfg } from "@/config/birthday";
import { launchConfetti } from "@/lib/confetti";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `Happy Birthday, ${cfg.recipientName} — WishBloom Studio` },
      { name: "description", content: "A personal birthday surprise: photos, a letter, little things and a wish. Crafted by WishBloom Studio." },
      { property: "og:title", content: `A birthday surprise for ${cfg.recipientName}` },
      { property: "og:description", content: "A carefully crafted digital birthday gift by WishBloom Studio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ASPECTS = ["4 / 5", "4 / 3", "4 / 5", "4 / 3", "4 / 5", "4 / 3"];

function themeVars(): CSSProperties {
  const t = cfg.theme;
  return {
    "--ivory": t.ivory, "--blush": t.blush, "--rose": t.rose,
    "--burgundy": t.burgundy, "--gold": t.gold, "--ink": t.ink, "--sage": t.sage,
  } as CSSProperties;
}

function useReveal(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); }
      }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}

function Index() {
  const [opened, setOpened] = useState(false);
  const [round, setRound] = useState(0); // bump to reset all interactive state on replay
  const mainRef = useRef<HTMLElement>(null);
  const openBtnRef = useRef<HTMLButtonElement>(null);
  useReveal(opened);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [opened]);

  const open = () => {
    setOpened(true);
    window.scrollTo({ top: 0 });
    setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 50);
  };

  const replay = () => {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.remove("is-visible"));
    setRound((r) => r + 1);
    setOpened(false);
    window.scrollTo({ top: 0 });
    setTimeout(() => openBtnRef.current?.focus(), 50);
  };

  return (
    <div style={themeVars()}>
      <OpeningScreen hidden={opened} onOpen={open} btnRef={openBtnRef} />

      <main
        ref={mainRef}
        tabIndex={-1}
        aria-hidden={!opened}
        inert={!opened}
        className="outline-none"
        key={round}
      >
        <Intro />
        <Gallery />
        <LetterSection />
        <LittleThings />
        <WishSection />
        <Closing onReplay={replay} />
        <footer className="pb-16 text-center text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Crafted with care by WishBloom Studio
        </footer>
      </main>

      {cfg.isDemo && <p className="demo-ribbon">Demo · fictional names & story</p>}
    </div>
  );
}

function OpeningScreen({ hidden, onOpen, btnRef }: { hidden: boolean; onOpen: () => void; btnRef: React.RefObject<HTMLButtonElement | null> }) {
  return (
    <section className="opening" data-hidden={hidden} aria-hidden={hidden} inert={hidden} aria-labelledby="opening-title">
      <div className="relative max-w-2xl">
        <p className="eyebrow">WishBloom Studio</p>
        <Sprig className="mx-auto my-6 w-32" />
        <p className="eyebrow text-muted-foreground">{cfg.opening.eyebrow}</p>
        <span className="rule-gold mx-auto my-7" aria-hidden />
        <h1 id="opening-title" className="text-[clamp(2.75rem,11vw,6.5rem)] text-primary">
          {cfg.opening.headline.split(",")[0]}
          {cfg.opening.headline.includes(",") && (
            <>
              ,<br />
              <em className="text-rose">{cfg.opening.headline.split(",").slice(1).join(",").trim()}</em>
            </>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-muted-foreground">{cfg.opening.subline}</p>
        <button ref={btnRef} type="button" className="btn-primary mt-10" onClick={onOpen}>
          {cfg.opening.button}
        </button>
        <p className="mt-6 font-serif text-lg italic text-muted-foreground">from {cfg.senderName}</p>
      </div>
    </section>
  );
}

function SectionHead({ eyebrow, title, id }: { eyebrow: string; title: string; id: string }) {
  return (
    <header className="reveal mb-14 text-center md:mb-20">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="mt-4 text-[clamp(2.25rem,6vw,4rem)] text-primary">{title}</h2>
      <span className="rule-gold mx-auto mt-6" aria-hidden />
    </header>
  );
}

function Intro() {
  return (
    <section className="section text-center" aria-labelledby="intro-title">
      <div className="reveal mx-auto max-w-3xl">
        <p className="eyebrow">For {cfg.recipientName}{cfg.ageOrMilestone && ` · ${cfg.ageOrMilestone}`}</p>
        <h2 id="intro-title" className="mt-6 text-[clamp(2.4rem,7vw,5rem)] text-primary">
          {cfg.intro.headline}
        </h2>
        <Sprig className="mx-auto mt-8 w-28" />
        <p className="mx-auto mt-6 max-w-xl text-muted-foreground">{cfg.intro.text}</p>
      </div>
    </section>
  );
}

function Photo({ src, alt, aspect, eager }: { src: string; alt: string; aspect: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="img-wrap" style={{ aspectRatio: aspect }}>
      {!failed && (
        <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />
      )}
      {failed && <div className="img-fallback" role="img" aria-label={alt}>A memory goes here</div>}
    </div>
  );
}

function Gallery() {
  return (
    <section className="section bg-muted/60" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Chapter one" title="Moments I keep" id="gallery-title" />
        <ul className="gallery">
          {cfg.gallery.map((p, i) => (
            <li key={i} className="reveal">
              <figure className="photo-frame">
                <Photo src={p.src} alt={p.alt} aspect={ASPECTS[i % ASPECTS.length] ?? "4 / 5"} />
                <figcaption className="px-2 pb-5 pt-5">
                  <p className="font-serif text-[1.35rem] italic leading-snug text-foreground">{p.caption}</p>
                  <p className="eyebrow mt-3 text-[0.68rem]">{p.meta}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function LetterSection() {
  const [open, setOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);
  const L = cfg.letter;

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) setTimeout(() => letterRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 900);
  };

  return (
    <section className="section" aria-labelledby="letter-title">
      <div className="mx-auto max-w-4xl">
        <SectionHead eyebrow="Chapter two" title="A letter for you" id="letter-title" />
        <div className="reveal text-center">
          <button
            type="button"
            className="envelope"
            aria-expanded={open}
            aria-controls="letter-body"
            aria-label={open ? "Envelope opened. Letter shown below." : "Open the envelope to read the letter"}
            onClick={toggle}
          >
            <span className="env-back" />
            <span className="env-card">for {cfg.recipientName}</span>
            <span className="env-front" />
            <span className="env-flap" />
            <span className="env-seal" aria-hidden>{cfg.senderName.charAt(0)}</span>
          </button>
          <p className="mt-8 text-sm text-muted-foreground">
            {open ? "Tap the envelope again to close it." : "Tap the envelope to open it."}
          </p>
        </div>

        <div id="letter-body" ref={letterRef} className="mt-14 scroll-mt-8" hidden={!open}>
          {open && (
            <article className="letter">
              <p className="font-serif text-2xl italic text-primary">{L.greeting}</p>
              {L.paragraphs.map((para, i) => (
                <p key={i} className="mt-5 text-[1.05rem] leading-[2.1rem]">{para}</p>
              ))}
              <p className="mt-8">{L.signOff}</p>
              <p className="font-serif text-3xl italic text-primary">{L.signature}</p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

function LittleThings() {
  return (
    <section className="section bg-muted/60" aria-labelledby="things-title">
      <div className="mx-auto max-w-6xl">
        <SectionHead eyebrow="Chapter three" title="Little things that make you special" id="things-title" />
        <ol className="things">
          {cfg.littleThings.map((t, i) => (
            <li key={i} className="thing reveal" data-variant={i % 3}>
              <span className="font-serif text-lg italic text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-[1.9rem] text-primary">{t.title}</h3>
              <p className="mt-2 text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function WishSection() {
  const n = cfg.wish.candles;
  const [out, setOut] = useState<boolean[]>(() => Array(n).fill(false));
  const done = out.every(Boolean);
  const celebrated = useRef(false);

  const celebrate = useCallback(() => {
    if (celebrated.current) return;
    celebrated.current = true;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      launchConfetti([cfg.theme.burgundy, cfg.theme.rose, cfg.theme.gold, cfg.theme.blush]);
    }
  }, []);

  useEffect(() => { if (done) celebrate(); }, [done, celebrate]);

  const blowOne = (i: number) => setOut((o) => o.map((v, j) => (j === i ? true : v)));
  const blowAll = () => setOut(Array(n).fill(true));

  return (
    <section className="section" aria-labelledby="wish-title">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHead eyebrow="Chapter four" title={cfg.wish.title} id="wish-title" />
        <p className="reveal mx-auto -mt-6 mb-14 max-w-md text-muted-foreground">{cfg.wish.instruction}</p>

        <div className="reveal cake">
          <div className="candles">
            {out.map((isOut, i) => (
              <button
                key={i}
                type="button"
                className="candle"
                aria-pressed={isOut}
                aria-label={isOut ? `Candle ${i + 1}, blown out` : `Blow out candle ${i + 1}`}
                onClick={() => blowOne(i)}
                disabled={isOut}
              >
                <span className="flame" aria-hidden />
                <span className="smoke" aria-hidden />
                <span className="candle-stick" aria-hidden />
              </button>
            ))}
          </div>
          <div className="cake-tier" aria-hidden />
          <div className="cake-plate" aria-hidden />
        </div>

        <div className="mt-12 min-h-[7rem]" aria-live="polite">
          {done ? (
            <p className="letter-in font-serif text-[clamp(1.5rem,4vw,2rem)] italic text-primary" style={{ animation: "letter-in 1s both" }}>
              {cfg.wish.afterWish}
            </p>
          ) : (
            <button type="button" className="btn-primary" onClick={blowAll}>{cfg.wish.button}</button>
          )}
        </div>
      </div>
    </section>
  );
}

function Closing({ onReplay }: { onReplay: () => void }) {
  return (
    <section className="section" aria-labelledby="closing-title">
      <div className="reveal paper mx-auto max-w-3xl px-6 py-16 text-center sm:px-14 sm:py-20">
        <Sprig className="mx-auto mb-6 w-28" />
        <p className="eyebrow">The last page</p>
        <h2 id="closing-title" className="mt-5 text-[clamp(2rem,6vw,3.6rem)] text-primary">{cfg.closing.headline}</h2>
        <p className="mx-auto mt-6 max-w-lg text-muted-foreground">{cfg.closing.message}</p>
        <p className="mt-6 font-serif text-2xl italic text-rose">{cfg.closing.signature}</p>
        <button type="button" className="btn-ghost mt-10" onClick={onReplay}>{cfg.closing.replayButton}</button>
      </div>
    </section>
  );
}

/** Delicate botanical sprig — decorative only. */
function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 24" className={`sprig ${className}`} aria-hidden="true" focusable="false">
      <path d="M4 12 H116" stroke="currentColor" strokeWidth="0.8" fill="none" />
      {[22, 40, 58, 76, 94].map((x, i) => (
        <g key={x} fill="currentColor" opacity={0.85}>
          <ellipse cx={x} cy={i % 2 ? 16 : 8} rx="6" ry="2.4" transform={`rotate(${i % 2 ? 25 : -25} ${x} ${i % 2 ? 16 : 8})`} />
        </g>
      ))}
      <circle cx="60" cy="12" r="2.2" fill="var(--rose)" />
    </svg>
  );
}
