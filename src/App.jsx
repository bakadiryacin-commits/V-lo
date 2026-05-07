import { useEffect, useRef } from "react";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=82",
    alt: "Velo equipe pour une aventure bikepacking",
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
  ["01", "Autonomie", "Preparer l'essentiel, retirer le superflu et rouler avec une vraie marge."],
  ["02", "Route", "Lire l'itineraire comme une sequence : distance, denivele, lumiere, pause."],
  ["03", "Materiel", "Sacoches, lunettes, textile, outils et navigation deviennent un systeme clair."],
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
          <a href="#experience">Experience</a>
          <a href="#equipement">Equipement</a>
          <a href="#guide">Guide</a>
          <a href="bikepacking_premium_art_direction_EN.html">Deck</a>
        </div>
      </nav>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-bg" />
          <div className="hero-copy" data-reveal>
            <p className="kicker">Bikepacking premium</p>
            <h1>La route commence ici.</h1>
            <p className="lead">
              V-lo aide les cyclistes a preparer leurs sorties, choisir leur equipement et partir plus loin avec une experience visuelle fluide, moderne et immersive.
            </p>
            <div className="actions">
              <a className="button primary" href="#experience">Explorer</a>
              <a className="button" href="#equipement">Voir l'equipement</a>
            </div>
          </div>

          <div className="hero-stage" data-reveal>
            <BikeModel />
            <div className="glass-card">
              <span>Sortie preparee</span>
              <strong>148 km</strong>
              <small>2 430 m D+ / autonomie 72 h</small>
            </div>
          </div>
        </section>

        <section className="ticker" aria-hidden="true">
          <div>
            <span>Gravel</span><span>Bikepacking</span><span>Autonomie</span><span>Trace GPS</span><span>Outdoor</span>
            <span>Gravel</span><span>Bikepacking</span><span>Autonomie</span><span>Trace GPS</span><span>Outdoor</span>
          </div>
        </section>

        <section className="experience" id="experience">
          <div className="section-copy" data-reveal>
            <p className="kicker">Experience</p>
            <h2>Plus calme, plus premium, plus lisible.</h2>
            <p>
              Les textes sont reduits, l'espace respire mieux, et les animations servent la navigation au lieu de prendre toute la place.
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
            <p className="kicker">Equipement & terrain</p>
            <h2>Des images qui bougent avec le scroll.</h2>
            <p>
              Les visuels flottent, pivotent et se decalent pendant la descente pour donner une sensation de profondeur, proche des sites produit haut de gamme.
            </p>
            <a className="text-link" href="bikepacking_premium_art_direction_EN.html">Ouvrir la presentation complete</a>
          </div>
        </section>

        <section className="guide" id="guide">
          <div data-reveal>
            <p className="kicker">SEO francais</p>
            <h2>Une base propre pour Google.</h2>
            <p>
              La page principale contient maintenant un H1 clair, des textes en francais, une description SEO, des balises sociales et une structure lisible.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
