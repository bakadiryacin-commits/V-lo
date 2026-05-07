import { useEffect, useState } from "react";
import { assets } from "./assets.js";

const pillars = [
  ["01", "Autonomie", "Partir, gérer, réparer, continuer."],
  ["02", "Précision", "Chaque objet a une fonction. Rien n'est décoratif."],
  ["03", "Silence", "La direction artistique évite l'agressivité. Elle laisse respirer les paysages."],
  ["04", "Texture", "Poussière, textile, métal, peau, verre, route."],
];

const gallery = [
  ["map", "Carte ouverte avant le départ"],
  ["glassesOrange", "Lunettes orange avec reflet de route"],
  ["glassesMountain", "Montagne reflétée dans une lentille"],
  ["rainLens", "Lunette sous la pluie"],
  ["blueLens", "Reflet bleu sur verre technique"],
  ["pause", "Moment de pause dans le paysage"],
  ["flatlayDark", "Équipement organisé avant voyage"],
  ["riderSea", "Cycliste chargé près de l'eau"],
  ["flatlayLight", "Flatlay vélo complet"],
  ["roadMountain", "Route vers les montagnes"],
  ["sunsetBikes", "Vélos chargés au coucher du soleil"],
  ["cockpit", "Cockpit vélo équipé"],
  ["productKit", "Accessoires cyclistes"],
  ["dustWheel", "Roue dans la poussière"],
  ["overpacked", "Accumulation d'équipement"],
  ["roadWide", "Route ouverte"],
];

const routeWords = ["Road", "Gear", "Silence", "Texture", "Autonomy", "Endurance", "Departure"];

const specs = [
  ["01", "Loaded bike", "Vélo chargé, prêt à quitter le bord de carte."],
  ["02", "Low light", "Aube, poussière, fin de journée, tension cinéma."],
  ["03", "Technical detail", "Lunettes, cockpit, textile, sacs, outils."],
];

const lightboxItems = gallery.map(([key, alt]) => ({
  key,
  alt,
  src: assets[key],
}));

export default function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const activeImage = activeImageIndex === null ? null : lightboxItems[activeImageIndex];

  useEffect(() => {
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const driftItems = [...document.querySelectorAll("[data-drift]")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    reveals.forEach((item) => observer.observe(item));

    const onScroll = () => {
      const viewport = window.innerHeight;
      driftItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const progress = (viewport - rect.top) / (viewport + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const direction = index % 2 === 0 ? 1 : -1;
        item.style.setProperty("--move", `${(clamped - 0.5) * 120 * direction}px`);
        item.style.setProperty("--spin", `${(clamped - 0.5) * 8 * direction}deg`);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const showImage = (direction) => {
    setActiveImageIndex((current) => {
      if (current === null) return 0;
      return (current + direction + lightboxItems.length) % lightboxItems.length;
    });
  };

  useEffect(() => {
    if (activeImageIndex === null) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActiveImageIndex(null);
      if (event.key === "ArrowRight") showImage(1);
      if (event.key === "ArrowLeft") showImage(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImageIndex]);

  const openImage = (key) => {
    const index = lightboxItems.findIndex((item) => item.key === key);
    if (index !== -1) setActiveImageIndex(index);
  };

  const openImageFromKeyboard = (event, key) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openImage(key);
  };

  const zoomProps = (key) => ({
    role: "button",
    tabIndex: 0,
    title: "Agrandir l'image",
    onClick: () => openImage(key),
    onKeyDown: (event) => openImageFromKeyboard(event, key),
  });

  return (
    <div className="site">
      <header className="hero" id="top">
        <nav className="nav" aria-label="Navigation principale">
          <a className="brand" href="#top">
            <span className="brand-mark">V</span>
            <span>V-lo</span>
          </a>
          <div className="nav-links">
            <a href="#territoire">Territoire</a>
            <a href="#photo">Photo</a>
            <a href="#systeme">Système</a>
            <a href="bikepacking_premium_art_direction_EN.html">Deck</a>
          </div>
        </nav>

        <img className="hero-bg" src={assets.roadWide} alt="Route ouverte vers les montagnes" />
        <div className="hero-shade" />

        <div className="hero-content">
          <div className="hero-copy" data-reveal>
            <p className="kicker">Brand world / Bikepacking premium</p>
            <h1>
              Ride beyond
              <span>the map.</span>
            </h1>
            <p>
              Direction artistique construite autour de la route, de l'équipement et du voyage autonome. Une esthétique outdoor, éditoriale, technique et cinématographique.
            </p>
            <div className="hero-actions">
              <a href="#territoire">Explorer le territoire</a>
              <a href="#photo">Voir les visuels</a>
            </div>
            <div className="hero-specs" aria-label="Axes créatifs">
              {specs.map(([num, title, text]) => (
                <div key={title}>
                  <span>{num}</span>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-board" data-reveal>
            <img className="board-main zoomable" src={assets.map} alt="Carte papier tenue en main" {...zoomProps("map")} />
            <img className="board-float board-one zoomable" data-drift src={assets.glassesOrange} alt="Macro lunettes vélo orange" {...zoomProps("glassesOrange")} />
            <img className="board-float board-two zoomable" data-drift src={assets.cockpit} alt="Cockpit vélo bikepacking" {...zoomProps("cockpit")} />
            <div className="hero-stat">
              <span>Départ imminent</span>
              <strong>72h</strong>
              <small>autonomie / route / lumière basse</small>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="word-strip" aria-hidden="true">
          <div>
            {[...routeWords, ...routeWords].map((word, index) => (
              <span key={`${word}-${index}`}>{word}</span>
            ))}
          </div>
        </section>

        <section className="section territory" id="territoire">
          <div className="section-head" data-reveal>
            <div>
              <p className="kicker">01 / Moodboard</p>
              <p>Route, silence, équipement, peau, verre, métal. La marque se construit dans les détails qui donnent envie de partir.</p>
            </div>
            <h2>Un territoire visuel entre route, silence et obsession du détail.</h2>
          </div>
          <div className="mood-grid">
            {gallery.slice(0, 8).map(([key, alt], index) => (
              <figure className={`mood mood-${index + 1}`} data-reveal data-drift key={key}>
                <img className="zoomable" src={assets[key]} alt={alt} {...zoomProps(key)} />
              </figure>
            ))}
          </div>
        </section>

        <section className="section story">
          <div className="story-copy" data-reveal>
            <p className="kicker">02 / Storytelling</p>
            <h2>Le voyage comme preuve. L'équipement comme langage.</h2>
            <p>
              Le récit ne repose pas sur la performance criée. Il repose sur la préparation, la précision, l'endurance et la capacité à aller loin avec moins.
            </p>
            <p>
              Chaque visuel doit donner l'impression d'un départ imminent. Un vélo chargé. Une carte ouverte. Une lumière basse. Un accessoire technique. Un corps concentré.
            </p>
          </div>
          <div className="pillar-grid">
            {pillars.map(([num, title, text]) => (
              <article className="pillar" data-reveal key={title}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="photo-section" id="photo">
          <div className="photo-copy" data-reveal>
            <p className="kicker">03 / Photography</p>
            <h2>Macro technique, lumière chaude, sensation physique.</h2>
            <p>
              Les lunettes deviennent un écran narratif. Les reflets racontent le paysage. Les gros plans créent une tension premium entre sport, produit et imaginaire de route.
            </p>
            <div className="caption-row">
              <span>Natural skin</span>
              <span>Orange glass</span>
              <span>Black details</span>
            </div>
          </div>
          <div className="lens-wall">
            {["glassesOrange", "glassesMountain", "rainLens", "blueLens", "productKit"].map((key, index) => (
              <img className={`lens lens-${index + 1} zoomable`} data-reveal data-drift src={assets[key]} alt="Détail produit vélo premium" key={key} {...zoomProps(key)} />
            ))}
          </div>
        </section>

        <section className="system" id="systeme">
          <div className="system-copy" data-reveal>
            <p className="kicker">04 / Composition</p>
            <h2>Entre ordre radical et désordre fonctionnel.</h2>
            <p>
              Le système graphique alterne deux tensions : le flatlay très organisé et l'accumulation presque excessive d'équipement. Ce contraste donne à la marque une personnalité forte.
            </p>
            <p>
              À utiliser : grilles nettes, marges généreuses, superpositions éditoriales, objets détourés, légendes techniques courtes.
            </p>
          </div>
          <div className="split-visuals">
            <img className="zoomable" data-reveal data-drift src={assets.flatlayDark} alt="Flatlay sombre bikepacking" {...zoomProps("flatlayDark")} />
            <img className="zoomable" data-reveal data-drift src={assets.overpacked} alt="Accumulation d'équipement outdoor" {...zoomProps("overpacked")} />
          </div>
        </section>

        <section className="social">
          <div className="section-head" data-reveal>
            <div>
              <p className="kicker">05 / Social media system</p>
              <p>Chaque post doit fonctionner seul tout en construisant un monde cohérent : immersion, détail produit, route, équipement, pause.</p>
            </div>
            <h2>Une grille sociale pensée comme un carnet de route premium.</h2>
          </div>
          <div className="social-grid">
            {gallery.slice(8).map(([key, alt], index) => (
              <img className={`social-card card-${index + 1} zoomable`} data-reveal data-drift src={assets[key]} alt={alt} key={key} {...zoomProps(key)} />
            ))}
          </div>
        </section>

        <section className="manifesto">
          <img src={assets.sunsetBikes} alt="Deux vélos chargés au coucher du soleil" />
          <div data-reveal>
            <p className="kicker">Final statement</p>
            <h2>The road is the identity.</h2>
            <p>
              Une direction artistique pour une marque de bikepacking qui vend plus qu'un produit : une manière de partir, de s'équiper et d'habiter la route.
            </p>
          </div>
        </section>
      </main>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Image agrandie" onClick={() => setActiveImageIndex(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActiveImageIndex(null)} aria-label="Fermer l'image">
            Fermer
          </button>
          <button className="lightbox-nav lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); showImage(-1); }} aria-label="Image précédente">
            Prev
          </button>
          <figure className="lightbox-frame" onClick={(event) => event.stopPropagation()}>
            <img src={activeImage.src} alt={activeImage.alt} />
            <figcaption>
              <span>{String(activeImageIndex + 1).padStart(2, "0")} / {String(lightboxItems.length).padStart(2, "0")}</span>
              {activeImage.alt}
            </figcaption>
          </figure>
          <button className="lightbox-nav lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); showImage(1); }} aria-label="Image suivante">
            Next
          </button>
        </div>
      )}
    </div>
  );
}
