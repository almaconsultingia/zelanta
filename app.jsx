// Zelanda — main app
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroArt": "leg",
  "fontScale": 100,
  "showTrustBar": true,
  "sageTone": "default",
  "showAnnouncementBar": false
}/*EDITMODE-END*/;

function App() {
  const { values, set } = window.useTweaks(TWEAK_DEFAULTS);

  const [cart, setCart] = useState([]);
  const [sizes, setSizes] = useState({ everyday: "M", recovery: "M", active: "M" });
  const [toast, setToast] = useState(null);

  // Apply tweaks
  useEffect(() => {
    document.documentElement.style.fontSize = `${(values.fontScale / 100) * 16}px`;
  }, [values.fontScale]);

  useEffect(() => {
    const root = document.documentElement;
    if (values.sageTone === "darker") {
      root.style.setProperty("--sage", "#1F362C");
      root.style.setProperty("--sage-deep", "#13241D");
    } else if (values.sageTone === "muted") {
      root.style.setProperty("--sage", "#456859");
      root.style.setProperty("--sage-deep", "#314A3F");
    } else {
      root.style.setProperty("--sage", "#2D4A3E");
      root.style.setProperty("--sage-deep", "#1F362C");
    }
  }, [values.sageTone]);

  const cartCount = cart.reduce((a, c) => a + c.qty, 0);

  const setSize = (id, s) => setSizes(p => ({ ...p, [id]: s }));

  const addToCart = (product) => {
    const size = sizes[product.id];
    setCart(p => {
      const key = `${product.id}-${size}`;
      const existing = p.find(c => c.key === key);
      if (existing) return p.map(c => c.key === key ? { ...c, qty: c.qty + 1 } : c);
      return [...p, { key, id: product.id, name: product.name, size, price: product.price, qty: 1 }];
    });
    setToast(`Added — ${product.name} (${size})`);
    setTimeout(() => setToast(null), 2400);
  };

  const onShopClick = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <React.Fragment>
      {values.showAnnouncementBar && (
        <div style={{
          background: "var(--ink)",
          color: "var(--white)",
          textAlign: "center",
          padding: "10px 16px",
          fontFamily: "var(--mono)",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase"
        }}>
          FREE EXPRESS AU SHIPPING ON ORDERS OVER $120 · AUTUMN COLLECTION OUT NOW
        </div>
      )}
      <Nav cartCount={cartCount} onShopClick={onShopClick}/>
      <Hero heroArt={values.heroArt}/>
      {values.showTrustBar && <Trust/>}
      <Products onAdd={addToCart} sizes={sizes} setSize={setSize}/>
      <Science/>
      <Testimonial/>
      <Newsletter/>
      <Footer/>

      <div className={`toast${toast ? " show" : ""}`}>
        {toast && <React.Fragment><IconCheck size={14}/> {toast}</React.Fragment>}
      </div>

      <window.TweaksPanel title="Tweaks">
        <window.TweakSection label="Hero">
          <window.TweakRadio
            label="Hero artwork"
            value={values.heroArt}
            onChange={(v) => set("heroArt", v)}
            options={[
              { value: "leg", label: "Leg silhouette" },
              { value: "rings", label: "Compression rings" },
              { value: "topo", label: "Topographic" }
            ]}
          />
        </window.TweakSection>
        <window.TweakSection label="Brand">
          <window.TweakRadio
            label="Sage tone"
            value={values.sageTone}
            onChange={(v) => set("sageTone", v)}
            options={[
              { value: "default", label: "Deep sage (brief)" },
              { value: "darker", label: "Forest" },
              { value: "muted", label: "Eucalypt" }
            ]}
          />
          <window.TweakSlider
            label="Type scale"
            min={90} max={115} step={1}
            value={values.fontScale}
            onChange={(v) => set("fontScale", v)}
            unit="%"
          />
        </window.TweakSection>
        <window.TweakSection label="Layout">
          <window.TweakToggle
            label="Show trust bar"
            value={values.showTrustBar}
            onChange={(v) => set("showTrustBar", v)}
          />
          <window.TweakToggle
            label="Announcement bar"
            value={values.showAnnouncementBar}
            onChange={(v) => set("showAnnouncementBar", v)}
          />
        </window.TweakSection>
      </window.TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
