// Zelanda — products, science, testimonial, newsletter, footer

const { useState: useState2 } = React;

// ===== PRODUCTS =====
const PRODUCTS = [
  {
    id: "everyday",
    name: "Everyday Sheer",
    compression: "15–20 mmHg · Class I",
    price: 89,
    desc: "Whisper-fine knit for desk-bound days, long flights and gentle vascular support. Sheer enough for a meeting, engineered for twelve hours upright.",
    badge: "Best Seller",
    tag: "PRODUCT.01 · KNEE-HIGH"
  },
  {
    id: "recovery",
    name: "Recovery Pro",
    compression: "20–30 mmHg · Class II",
    price: 129,
    desc: "Medical-grade compression for post-procedure care, varicose support and chronic venous insufficiency. Prescribed by Australian vascular clinics.",
    badge: "Clinical",
    tag: "PRODUCT.02 · KNEE-HIGH"
  },
  {
    id: "active",
    name: "Active Sport",
    compression: "15–20 mmHg · Class I",
    price: 99,
    desc: "Moisture-wicking technical knit with reinforced ankle and arch. Built for runners, triathletes and standing professions — all day, all-weather.",
    badge: "New",
    tag: "PRODUCT.03 · CALF-LENGTH"
  }
];

const SIZES = ["XS", "S", "M", "L", "XL"];

function ProductCard({ product, sizeSel, onSize, onAdd }) {
  return (
    <article className="product">
      <div className="product__image">
        <div className="ph-stripe"></div>
        <span className="product__image-tag">{product.tag}</span>
        <span className="product__badge">{product.badge}</span>
        <span className="ph-label">[ PRODUCT PHOTOGRAPHY ]</span>
      </div>
      <div className="product__compression">{product.compression}</div>
      <div className="product__row">
        <h3 className="product__name">{product.name}</h3>
        <span className="product__price">${product.price}</span>
      </div>
      <p className="product__desc">{product.desc}</p>
      <div className="product__sizes">
        {SIZES.map(s => (
          <button
            key={s}
            className={`size-chip${sizeSel === s ? " active" : ""}`}
            onClick={() => onSize(s)}
          >{s}</button>
        ))}
      </div>
      <button className="btn btn--primary btn--block" onClick={() => onAdd(product)}>
        Add to Cart <IconArrow/>
      </button>
    </article>
  );
}

function Products({ onAdd, sizes, setSize }) {
  return (
    <section className="section section--white" id="products">
      <div className="container">
        <div className="products__head">
          <div>
            <span className="eyebrow">— THE COLLECTION</span>
            <h2 className="products__title">
              Three garments.<br/>
              <em>One standard.</em>
            </h2>
          </div>
          <p className="lede">
            Each pair is graduated, tested and finished in our Subiaco workshop.
            Choose by compression class — by use, not by fashion. Every order ships
            with a fitting guide and a thirty-day return.
          </p>
        </div>
        <div className="products__grid">
          {PRODUCTS.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              sizeSel={sizes[p.id]}
              onSize={(s) => setSize(p.id, s)}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== SCIENCE =====
function ScienceIcon({ kind }) {
  if (kind === "graduated") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 4V24" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M22 4V24" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M9 6H19" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M10 12H18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M11 18H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
        <path d="M12 23H16" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    );
  }
  if (kind === "moisture") {
    return (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C14 4 6 12 6 18C6 22 9.5 25 14 25C18.5 25 22 22 22 18C22 12 14 4 14 4Z" stroke="currentColor" strokeWidth="1"/>
        <path d="M10 18C10 20 11.5 22 14 22" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 3V25" stroke="currentColor" strokeWidth="1"/>
      <path d="M14 8C14 8 9 9 7 12C5 15 7 18 14 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <path d="M14 8C14 8 19 9 21 12C23 15 21 18 14 18" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="14" cy="3" r="1" fill="currentColor"/>
      <circle cx="14" cy="25" r="1" fill="currentColor"/>
    </svg>
  );
}

function Science() {
  const items = [
    {
      n: "01",
      kind: "graduated",
      name: "Graduated Compression",
      copy: "100% pressure at the ankle, tapering to 70% at the calf. The pressure differential drives venous return and reduces lower-limb fatigue."
    },
    {
      n: "02",
      kind: "moisture",
      name: "Moisture-Wicking Fabric",
      copy: "A 78/22 nylon-elastane weave engineered to move 0.4g of moisture per cm² per hour — keeping skin dry across a sixteen-hour wear cycle."
    },
    {
      n: "03",
      kind: "vascular",
      name: "Vascular Support",
      copy: "Independently tested at the Royal Perth Hospital vascular lab for venous return and oedema reduction. Reviewed by AVA-registered specialists."
    }
  ];
  return (
    <section className="section section--off" id="science">
      <div className="container">
        <div className="section__head">
          <div>
            <span className="eyebrow">— THE SCIENCE</span>
            <h2 className="section__title">Engineered, not <em>marketed.</em></h2>
          </div>
          <p className="section__sub">
            Every Zelanta garment is a medical device first and a wardrobe piece second.
            Three principles govern the knit, the fibre and the finish.
          </p>
        </div>
        <div className="science__grid">
          {items.map((it) => (
            <div key={it.n} className="science__item">
              <div className="science__num">FIG. {it.n}</div>
              <div className="science__icon"><ScienceIcon kind={it.kind}/></div>
              <h3 className="science__name">{it.name}</h3>
              <p className="science__copy">{it.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== TESTIMONIAL =====
function Testimonial() {
  return (
    <section className="section section--white">
      <div className="container">
        <div className="testimonial">
          <div className="testimonial__media">
            <div className="ph-stripe"></div>
            <span className="ph-label" style={{bottom: 14, left: 14}}>[ DR. MITCHELL — CLINIC PORTRAIT ]</span>
            <span className="product__image-tag" style={{top: 14, left: 14}}>FIG. 04 · CLINICAL ENDORSEMENT</span>
          </div>
          <div>
            <span className="eyebrow">— FROM THE CLINIC</span>
            <p className="testimonial__quote" style={{marginTop: 24}}>
              I prescribe Zelanta to patients who refuse to choose between a medical device
              and something they'd actually wear. The graduation is honest, the knit is
              sound — and the construction holds up to clinical wash cycles.
            </p>
            <div className="testimonial__author">
              <div className="testimonial__avatar">SM</div>
              <div>
                <p className="testimonial__name">Dr. Sarah Mitchell</p>
                <p className="testimonial__title">Vascular Specialist · Perth, WA · MBBS, FRACS (Vasc)</p>
              </div>
            </div>
            <div className="testimonial__creds">
              <div className="testimonial__cred">
                <span className="num">14<span style={{fontSize:14, color:"var(--ink-muted)"}}>yrs</span></span>
                <span className="lab">Clinical Practice</span>
              </div>
              <div className="testimonial__cred">
                <span className="num">2,400+</span>
                <span className="lab">Patients Fitted</span>
              </div>
              <div className="testimonial__cred">
                <span className="num">RPH</span>
                <span className="lab">Affiliate Fellow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== NEWSLETTER =====
function Newsletter() {
  const [email, setEmail] = useState2("");
  const [state, setState] = useState2("idle"); // idle | error | success
  const [err, setErr] = useState2("");

  const submit = (e) => {
    e.preventDefault();
    if (!email) { setState("error"); setErr("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setState("error"); setErr("Please enter a valid email."); return; }
    setState("success");
  };

  return (
    <section className="section section--off">
      <div className="container">
        <div className="newsletter">
          <span className="eyebrow">— THE DISPATCH</span>
          <h2 className="newsletter__title">
            Quietly considered<br/>
            <em>correspondence.</em>
          </h2>
          <p className="newsletter__sub">
            Quarterly. No marketing language. Clinical updates, new releases and
            an early look at the autumn collection — sent from Perth.
          </p>
          {state !== "success" ? (
            <form className="newsletter__form" onSubmit={submit}>
              <input
                className="newsletter__input"
                type="email"
                placeholder="your@email.com.au"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
              />
              <button type="submit" className="btn btn--primary newsletter__btn">
                Subscribe <IconArrow/>
              </button>
            </form>
          ) : (
            <div style={{display:"flex", justifyContent:"center"}}>
              <div className="newsletter__success">
                <IconCheck size={14}/>
                You're in. First dispatch arrives at the change of season.
              </div>
            </div>
          )}
          {state === "error" && <div className="newsletter__error">{err}</div>}
          <div className="newsletter__note">UNSUBSCRIBE ANY TIME · NO THIRD-PARTY SHARING</div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="container">
        <div className="footer__top">
          <div>
            <div className="footer__logo">ZELANTA</div>
            <p className="footer__tag">
              Clinically-engineered compression wear, designed and finished in
              Perth, Western Australia. TGA Class I Registered Medical Device.
            </p>
          </div>
          <div className="footer__col">
            <h4>Shop</h4>
            <ul>
              <li><a href="#">Everyday Sheer</a></li>
              <li><a href="#">Recovery Pro</a></li>
              <li><a href="#">Active Sport</a></li>
              <li><a href="#">Fitting Guide</a></li>
              <li><a href="#">Gift Cards</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Clinic</h4>
            <ul>
              <li><a href="#">The Science</a></li>
              <li><a href="#">Clinical Studies</a></li>
              <li><a href="#" id="stockists">Stockists</a></li>
              <li><a href="#">Practitioner Programme</a></li>
              <li><a href="#">Wholesale</a></li>
            </ul>
          </div>
          <div className="footer__col">
            <h4>Studio</h4>
            <ul>
              <li><a href="#">About Zelanta</a></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Returns &amp; Care</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <div className="footer__legal">
            <span>Perth, Western Australia</span>
            <span>·</span>
            <span>TGA Registered</span>
            <span>·</span>
            <span>ABN 47 622 318 904</span>
          </div>
          <div className="footer__copy">© 2026 ZELANTA PTY LTD</div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Products, Science, Testimonial, Newsletter, Footer });
