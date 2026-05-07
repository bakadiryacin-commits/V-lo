import { useEffect, useRef } from "react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=82",
    alt: "Velo charge pour une aventure bikepacking",
    className: "photo photo-a",
  },
  {
    src: "https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&w=900&q=82",
    alt: "Cycliste sur route avec paysage naturel",
    className: "photo photo-b",
  },
  {
    src: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=900&q=82",
    alt: "Detail de velo et d'equipement cycliste",
    className: "photo photo-c",
  },
];

const features = [
  ["01", "Autonomie", "Partir, gerer, reparer, continuer. Le voyage se gagne dans la preparation."],
  ["02", "Precision", "Chaque objet a une fonction. Rien n'est decoratif, tout sert la route."],
  ["03", "Texture", "Poussiere, textile, metal, peau, verre, bitume : le detail fait la tension premium."],
];

function BikeModel() {
  return (
    <div className="bike-3d" aria-label="Velo 3D stylise">
      <div className="wheel wheel-left" />
      <div className="wheel wheel-right" />
      <div className="bar frame-top" />
      <div className="bar frame-down" />
      <div className="bar frame-seat" />
      <div className="bar frame-chain" />
      <div className="seat" />
      <div className="handlebar" />
      <div className="pedal" />
    </div>
  );
}

export default function App() {
  const appRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const reveals = [...document.querySelectorAll("[data-reveal]")];
    const photosToAnimate = [...document.querySelectorAll("[data-scroll-photo]")];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.18 }
    );

    reveals.forEach((item) => observer.observe(item));

    const onPointerMove = (event) => {
      root.style.setProperty("--mx", `${event.clientX}px`);
      root.style.setProperty("--my", `${event.clientY}px`);
    };

    const onScroll = () => {
      const viewport = window.innerHeight;
      photosToAnimate.forEach((photo, index) => {
        const rect = photo.getBoundingClientRect();
        const progress = (viewport - rect.top) / (viewport + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const drift = (clamped - 0.5) * (index % 2 ? -90 : 90);
        const rotate = (clamped - 0.5) * (index % 2 ? -8 : 8);
        photo.style.setProperty("--scroll-y", `${drift}px`);
        photo.style.setProperty("--scroll-r", `${rotate}deg`);
      });
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div ref={appRef} className="app">
      <nav className="nav">
        <a className="brand" href="#accueil"><span>V</span> V-lo</a>
        <div className="nav-links">
          <a href="#territoire">Territoire</a>
          <a href="#equipement">Equipement</a>
          <a href="#systeme">Systeme</a>
          <a href="bikepacking_premium_art_direction_EN.html">Presentation</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-copy" data-reveal>
            <p className="kicker">Univers de marque / Bikepacking premium</p>
            <h1>Rouler au-dela de la carte.</h1>
            <p className="lead">
              Une direction artistique construite autour de la route, de l'equipement et du voyage autonome. Un territoire outdoor, editorial, technique et cinematographique.
            </p>
            <div className="actions">
              <a className="button primary" href="#territoire">Explorer le territoire</a>
              <a className="button" href="bikepacking_premium_art_direction_EN.html">Voir la presentation</a>
            </div>
          </div>

          <div className="hero-visual" data-reveal>
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1500&q=84" alt="Route de montagne au lever du soleil pour une aventure velo" />
            <div className="hero-badge">Visual identity system</div>
            <div className="route-chip">
              <span>Depart imminent</span>
              <strong>72 h</strong>
              <small>autonomie / lumiere basse / route ouverte</small>
            </div>
          </div>
        </section>

        <section className="ticker" aria-hidden="true">
          <div>
            <span>Gravel</span><span>Bikepacking</span><span>Autonomie</span><span>Trace GPS</span><span>Outdoor</span>
            <span>Gravel</span><span>Bikepacking</span><span>Autonomie</span><span>Trace GPS</span><span>Outdoor</span>
          </div>
        </section>

        <section className="territory" id="territoire">
          <div className="section-copy" data-reveal>
            <p className="kicker">01 / Territoire visuel</p>
            <h2>Un monde faconne par la route, le silence et l'obsession du detail.</h2>
            <p>
              L'histoire ne repose pas sur des promesses de performance bruyantes. Elle repose sur la preparation, la precision, l'endurance et la capacite a aller loin avec moins.
            </p>
            <p>
              Chaque visuel doit donner l'impression que le depart est imminent : un velo charge, une carte ouverte, une lumiere basse, un accessoire technique, un corps concentre.
            </p>
          </div>

          <div className="feature-grid">
            {features.map(([num, title, text]) => (
              <article className="feature" data-reveal key={title}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="equipment" id="equipement">
          <div className="image-stack" data-reveal>
            {photos.map((photo) => (
              <img data-scroll-photo key={photo.src} className={photo.className} src={photo.src} alt={photo.alt} />
            ))}
          </div>
          <div className="equipment-copy" data-reveal>
            <p className="kicker">02 / Photographie</p>
            <h2>Macro technique, lumiere chaude, sensation physique.</h2>
            <p>
              Les lunettes, les sacs et les details deviennent des surfaces narratives. Les reflets portent le paysage. Les plans serres creent une tension premium entre sport, produit et imaginaire de route.
            </p>
            <a className="text-link" href="bikepacking_premium_art_direction_EN.html">Ouvrir la presentation complete</a>
          </div>
        </section>

        <section className="system" id="systeme">
          <div className="system-grid">
            <div data-reveal>
              <p className="kicker">03 / Systeme graphique</p>
              <h2>Entre ordre radical et desordre fonctionnel.</h2>
              <p>
                Le systeme alterne entre flatlays tres organises et accumulation presque excessive d'equipement. Ce contraste donne a V-lo une personnalite forte, technique et memorisable.
              </p>
            </div>
            <div className="bike-panel" data-reveal>
              <BikeModel />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
