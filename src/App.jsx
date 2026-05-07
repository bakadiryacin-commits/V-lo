import { useEffect } from "react";
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

export default function App() {
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
          </div>

          <div className="hero-board" data-reveal>
            <img className="board-main" src={assets.map} alt="Carte papier tenue en main" />
            <img className="board-float board-one" data-drift src={assets.glassesOrange} alt="Macro lunettes vélo orange" />
            <img className="board-float board-two" data-drift src={assets.cockpit} alt="Cockpit vélo bikepacking" />
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
            <p className="kicker">01 / Moodboard</p>
            <h2>Un territoire visuel entre route, silence et obsession du détail.</h2>
          </div>
          <div className="mood-grid">
            {gallery.slice(0, 8).map(([key, alt], index) => (
              <figure className={`mood mood-${index + 1}`} data-reveal data-drift key={key}>
                <img src={assets[key]} alt={alt} />
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
          </div>
          <div className="lens-wall">
            {["glassesOrange", "glassesMountain", "rainLens", "blueLens", "productKit"].map((key, index) => (
              <img className={`lens lens-${index + 1}`} data-reveal data-drift src={assets[key]} alt="Détail produit vélo premium" key={key} />
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
            <img data-reveal data-drift src={assets.flatlayDark} alt="Flatlay sombre bikepacking" />
            <img data-reveal data-drift src={assets.overpacked} alt="Accumulation d'équipement outdoor" />
          </div>
        </section>

        <section className="social">
          <div className="section-head" data-reveal>
            <p className="kicker">05 / Social media system</p>
            <h2>Une grille sociale pensée comme un carnet de route premium.</h2>
            <p>
              Le feed alterne immersion, détails produit, route, équipement et moments de pause. Chaque post doit fonctionner seul tout en construisant un monde cohérent.
            </p>
          </div>
          <div className="social-grid">
            {gallery.slice(8).map(([key, alt], index) => (
              <img className={`social-card card-${index + 1}`} data-reveal data-drift src={assets[key]} alt={alt} key={key} />
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
    </div>
  );
}
