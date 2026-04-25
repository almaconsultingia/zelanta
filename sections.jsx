// Zelanda — section components

const { useState, useEffect, useRef } = React;

// ===== ICONS =====
const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLeaf = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 12C2 12 2 6 7 4C12 2 12 2 12 2C12 2 12 8 9 11C7 13 4 13 2 12Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M2 12L7 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);
const IconShield = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L2 3V7C2 9.5 4 12 7 13C10 12 12 9.5 12 7V3L7 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
  </svg>
);
const IconTruck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M1 3H8V10H1V3Z" stroke="currentColor" strokeWidth="1"/>
    <path d="M8 5H11L13 7V10H8" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
    <circle cx="3.5" cy="11" r="1.2" stroke="currentColor" strokeWidth="1"/>
    <circle cx="10.5" cy="11" r="1.2" stroke="currentColor" strokeWidth="1"/>
  </svg>
);
const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1.5V12.5M1.5 7H12.5M2.8 2.8L11.2 11.2M11.2 2.8L2.8 11.2" stroke="currentColor" strokeWidth="0.8"/>
  </svg>
);
const IconArrow = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
    <path d="M2 6H10M10 6L6.5 2.5M10 6L6.5 9.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ===== NAV =====
function Nav({ cartCount, onShopClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  const close = () => setOpen(false);
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="container nav__inner">
        <a href="#" className="nav__logo">ZELANTA</a>
        <div className="nav__links">
          <a href="#products" className="nav__link">Products</a>
          <a href="#science" className="nav__link">Science</a>
          <a href="#about" className="nav__link">About</a>
          <a href="#stockists" className="nav__link">Stockists</a>
        </div>
        <div className="nav__cta">
          <span className="cart-pill">
            CART
            <span className="cart-pill__count">{cartCount}</span>
          </span>
          <button className="btn btn--outline btn--sm" onClick={onShopClick}>Shop</button>
          <button
            className={`nav__burger${open ? " open" : ""}`}
            aria-label="Menu"
            onClick={() => setOpen(o => !o)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div className={`nav__mobile${open ? " open" : ""}`}>
        <a href="#products" onClick={close}>Products</a>
        <a href="#science" onClick={close}>Science</a>
        <a href="#about" onClick={close}>About</a>
        <a href="#stockists" onClick={close}>Stockists</a>
        <button className="btn btn--primary" onClick={() => { close(); onShopClick(); }}>
          Shop the Collection
        </button>
      </div>
    </nav>
  );
}

// ===== HERO ART (variants) =====
function HeroArt({ variant }) {
  // Three variants: leg-silhouette wave, gradient compression rings, abstract topo lines
  if (variant === "rings") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" style={{width: "70%", height: "70%"}}>
        {Array.from({length: 8}).map((_, i) => (
          <ellipse key={i} cx="200" cy="250" rx={60 + i * 18} ry={120 + i * 24}
            fill="none" stroke="var(--sage)" strokeWidth="0.6" opacity={0.85 - i * 0.08}/>
        ))}
        <line x1="200" y1="80" x2="200" y2="420" stroke="var(--sage)" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 4"/>
        <circle cx="200" cy="250" r="3" fill="var(--sage)"/>
      </svg>
    );
  }
  if (variant === "topo") {
    return (
      <svg viewBox="0 0 400 500" preserveAspectRatio="xMidYMid meet" style={{width: "82%", height: "82%"}}>
        {Array.from({length: 14}).map((_, i) => {
          const y = 30 + i * 32;
          const wave = `M 20 ${y} Q 100 ${y - 12 + (i%3)*4} 200 ${y + (i%2)*6} T 380 ${y - (i%3)*3}`;
          return <path key={i} d={wave} fill="none" stroke="var(--sage)" strokeWidth="0.6" opacity={0.4 + (i%4)*0.15}/>;
        })}
      </svg>
    );
  }
  // default: leg silhouette w/ compression bands
  return (
    <svg viewBox="0 0 320 460" preserveAspectRatio="xMidYMid meet" style={{width: "70%", height: "85%"}}>
      <defs>
        <clipPath id="legclip">
          <path d="M140 30 Q 130 30 128 50 L 120 180 Q 110 260 105 320 Q 100 380 110 420 L 175 420 Q 185 380 180 320 Q 175 260 165 180 L 158 50 Q 156 30 146 30 Z"/>
        </clipPath>
      </defs>
      <path d="M140 30 Q 130 30 128 50 L 120 180 Q 110 260 105 320 Q 100 380 110 420 L 175 420 Q 185 380 180 320 Q 175 260 165 180 L 158 50 Q 156 30 146 30 Z"
            fill="none" stroke="var(--sage)" strokeWidth="1"/>
      <g clipPath="url(#legclip)">
        {Array.from({length: 32}).map((_, i) => (
          <line key={i} x1="80" y1={40 + i * 12} x2="200" y2={40 + i * 12}
            stroke="var(--sage)" strokeWidth="0.5" opacity={0.25 + (i / 60)}/>
        ))}
      </g>
      {/* compression bands */}
      <line x1="98" y1="120" x2="190" y2="120" stroke="var(--sage)" strokeWidth="0.8"/>
      <line x1="100" y1="240" x2="186" y2="240" stroke="var(--sage)" strokeWidth="0.8"/>
      <line x1="103" y1="360" x2="183" y2="360" stroke="var(--sage)" strokeWidth="0.8"/>
      {/* tick markers */}
      <g fontFamily="var(--mono)" fontSize="8" fill="var(--ink-soft)" letterSpacing="1">
        <text x="210" y="124">15 mmHg</text>
        <text x="210" y="244">22 mmHg</text>
        <text x="210" y="364">30 mmHg</text>
      </g>
    </svg>
  );
}

// ===== HERO =====
function Hero({ heroArt }) {
  return (
    <section className="hero">
      <div className="container hero__grid">
        <div>
          <div className="hero__eyebrow-row">
            <span className="dot"></span>
            <span className="eyebrow">Est. Perth · 2024</span>
            <span style={{color:"var(--line-strong)"}}>—</span>
            <span className="eyebrow">Vol. 01 / Ed. Australis</span>
          </div>
          <h1 className="hero__title">
            Compression.<br/><em>Refined.</em>
          </h1>
          <p className="hero__sub">
            Clinically-engineered compression wear for everyday Australians —
            designed in Perth, manufactured to medical-grade standard,
            worn from boardroom to long-haul.
          </p>
          <div className="hero__ctas">
            <a href="#products" className="btn btn--primary">Shop the Collection <IconArrow/></a>
            <a href="#science" className="btn btn--ghost">The Science <IconArrow/></a>
          </div>
          <div className="hero__meta">
            <div className="hero__meta-item">
              <span className="num">15–30</span>
              <span className="lab">mmHg Graduated</span>
            </div>
            <div className="hero__meta-item">
              <span className="num">04</span>
              <span className="lab">Compression Tiers</span>
            </div>
            <div className="hero__meta-item">
              <span className="num">TGA</span>
              <span className="lab">Class I Registered</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero__visual-tag">
            <span className="v">FIG. 01</span>
            <span className="v">GRADUATED PROFILE</span>
          </div>
          <div className="hero__visual-frame">
            <HeroArt variant={heroArt}/>
          </div>
          <div className="hero__visual-spec">
            <span>ANKLE → CALF</span>
            <span style={{opacity: 0.6}}>NM/CM² · ISO 22612</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== TRUST =====
function Trust() {
  const items = [
    { icon: <IconShield/>, label: "TGA Registered" },
    { icon: <IconCheck size={12}/>, label: "Clinically Tested" },
    { icon: <IconTruck/>, label: "Free AU Shipping" },
    { icon: <IconLeaf/>, label: "Podiatrist Approved" },
    { icon: <IconStar/>, label: "OEKO-TEX® Certified" },
  ];
  return (
    <section className="trust">
      <div className="container trust__row">
        {items.map((it, i) => (
          <div key={i} className="trust__item">
            <span style={{color: "var(--sage)"}}>{it.icon}</span>
            {it.label}
          </div>
        ))}
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Trust, IconCheck, IconArrow, IconLeaf, IconShield, IconTruck, IconStar });
