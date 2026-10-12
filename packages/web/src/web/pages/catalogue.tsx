import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Menu,
  X,
  Search,
  MessageCircle,
  SlidersHorizontal,
  Footprints,
  Check,
  ChevronDown,
  ExternalLink,
} from "lucide-react";
import { categories, products, type Category, type Product } from "../data/products";
import { siteConfig as config } from "../data/config";
import { enquiryMessage, whatsappUrl } from "../lib/enquiry";

function Wordmark() {
  return (
    <span className="wordmark">
      <span className="monogram">
        TN
        <span className="brand-dot" />
      </span>
      <span className="wordmark-text">
        FOOTWEAR<span>BULAWAYO, ZW</span>
      </span>
    </span>
  );
}
export default function Catalogue() {
  const [menu, setMenu] = useState(false);
  const [category, setCategory] = useState<Category>("All footwear");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [sort, setSort] = useState("featured");
  const [selected, setSelected] = useState<Product>();
  const [size, setSize] = useState<number>();
  const [draft, setDraft] = useState(false);
  const [copied, setCopied] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === "All footwear" || p.category === category) &&
        `${p.name} ${p.category} ${p.colour}`.toLowerCase().includes(search.toLowerCase()),
    );
    return sort === "low"
      ? list.sort((a, b) => a.price - b.price)
      : sort === "high"
        ? list.sort((a, b) => b.price - a.price)
        : list;
  }, [category, search, sort]);
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", close);
    if (config.canonicalUrl) {
      const link = document.createElement("link");
      link.rel = "canonical";
      link.href = config.canonicalUrl;
      document.head.append(link);
      return () => {
        link.remove();
        document.removeEventListener("keydown", close);
      };
    }
    return () => document.removeEventListener("keydown", close);
  }, []);
  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);
  const show = (product?: Product, enquiry = false) => {
    setSelected(product);
    setSize(undefined);
    setDraft(enquiry || !product);
    setCopied(false);
    modal.current?.showModal();
  };
  const reset = () => {
    setCategory("All footwear");
    setSearch("");
    setSort("featured");
  };
  const message = enquiryMessage(selected, size);
  const waLink = whatsappUrl(message);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };
  return (
    <>
      <a className="skip-link" href="#collection">
        Skip to collection
      </a>
      <div className="announcement">
        <span>A GOOD PAIR CHANGES YOUR DAY.</span>
        <a href="#contact">
          Find us in Bulawayo <ArrowUpRight size={13} />
        </a>
      </div>
      <header className="header">
        <div className="shell header-inner">
          <a href="#home" aria-label="TN Footwear home">
            <Wordmark />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="active" href="#home">
              Home
            </a>
            <a href="#collection">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button
              className="icon-button search-toggle"
              aria-label="Search the catalogue"
              onClick={() => {
                setSearchOpen(true);
                document.getElementById("collection")?.scrollIntoView();
              }}
            >
              <Search size={20} />
            </button>
            <button className="button button-green header-whatsapp" onClick={() => show()}>
              <MessageCircle size={16} /> Let's talk <ArrowUpRight size={15} />
            </button>
            <button
              className="icon-button mobile-toggle"
              aria-label={menu ? "Close navigation" : "Open navigation"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menu && (
          <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
            {[
              ["Home", "home"],
              ["Shop", "collection"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
            <button
              onClick={() => {
                setMenu(false);
                show();
              }}
            >
              Enquire on WhatsApp <MessageCircle size={18} />
            </button>
          </nav>
        )}
      </header>
      <main>
        <section id="home" className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="green-dot" /> YOUR NEXT PAIR STARTS HERE
            </div>
            <h1>
              GOOD SHOES.
              <br />
              GREAT <span>MOVES.</span>
            </h1>
            <p>
              For your everyday. For your own style.
              <br />
              Discover your next pair with TN Footwear.
            </p>
            <div className="hero-actions">
              <a href="#collection" className="button button-green">
                Explore the collection <ArrowUpRight size={19} />
              </a>
              <button className="text-button" onClick={() => show()}>
                Enquire on WhatsApp <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="hero-location">
              <MapPin size={16} />
              <span>ROOTED IN BULAWAYO. READY FOR YOUR ROTATION.</span>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/hero.webp"
              alt="White sneaker from TN Footwear's actual public catalogue, photographed on a Bulawayo street"
              fetchPriority="high"
              width="540"
              height="660"
            />
            <span className="photo-label">FROM THE TN CATALOGUE</span>
            <div className="hero-image-footer">
              <div>
                <span>THE EVERYDAY LOW</span>
                <small>Clean lines. Easy rotation.</small>
              </div>
              <button aria-label="View The Everyday Low" onClick={() => show(products[0])}>
                <ArrowUpRight size={24} />
              </button>
            </div>
            <span className="image-index">01 / 06</span>
          </div>
        </section>
        <div className="brand-strip">
          <div className="shell">
            <span>YOUR CITY. YOUR STYLE.</span>
            <span className="strip-cross">+</span>
            <span>FIND YOUR NEXT PAIR.</span>
            <span className="strip-cross">+</span>
            <span>TN FOOTWEAR.</span>
            <Footprints size={22} />
          </div>
        </div>
        <section id="collection" className="collection shell">
          <div className="section-top">
            <div>
              <div className="eyebrow">THE ROTATION</div>
              <h2>A PAIR FOR EVERY DAY.</h2>
            </div>
            <p>
              Different silhouettes. Same good energy.
              <br />
              Browse, find your favourite, and ask us about it.
            </p>
          </div>
          <div className="filter-bar">
            <div className="filters" aria-label="Filter footwear">
              {categories.map((c) => (
                <button
                  key={c}
                  className={category === c ? "filter active" : "filter"}
                  aria-pressed={category === c}
                  onClick={() => setCategory(c)}
                >
                  {c}
                  {c === "All footwear" && <span>{products.length}</span>}
                </button>
              ))}
            </div>
            <button
              className="icon-button catalogue-search"
              aria-label={searchOpen ? "Close product search" : "Search products"}
              onClick={() => {
                setSearchOpen(!searchOpen);
                setSearch("");
              }}
            >
              <Search size={18} />
            </button>
            <label className="sort-label">
              <SlidersHorizontal size={14} />
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
          {searchOpen && (
            <div className="search-field">
              <Search size={18} />
              <input
                ref={searchInput}
                placeholder="Search by style, colour or name…"
                aria-label="Search by style, colour or name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button aria-label="Clear search" onClick={() => setSearch("")}>
                <X size={18} />
              </button>
            </div>
          )}
          <div className="catalogue-meta">
            <span aria-live="polite">{filtered.length} styles to explore</span>
            <span>REAL CATALOGUE PHOTOS · DEMO PRICES & SIZES</span>
          </div>
          <div className="product-grid">
            {filtered.map((p) => (
              <article className="product-card" key={p.id}>
                <button
                  className="product-image"
                  aria-label={`View ${p.name}`}
                  onClick={() => show(p)}
                >
                  <img
                    src={p.image}
                    alt={p.alt}
                    width="540"
                    height="675"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                  {p.tag && <span className="product-tag">{p.tag}</span>}
                  <span className="product-view">
                    <ArrowUpRight size={20} />
                  </span>
                </button>
                <div className="product-info">
                  <div className="product-heading">
                    <h3>
                      <button onClick={() => show(p)}>{p.name}</button>
                    </h3>
                    <span className="price">
                      ${p.price}
                      <small>demo USD</small>
                    </span>
                  </div>
                  <p>
                    {p.colour} <span> / {p.category}</span>
                  </p>
                  <div className="product-bottom">
                    <span>
                      EU {p.sizes[0]}–{p.sizes.at(-1)} <small>illustrative</small>
                    </span>
                    <button onClick={() => show(p, true)}>
                      Enquire <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="empty">
              <h3>No matching styles.</h3>
              <p>Try another colour or explore the full collection.</p>
              <button className="button button-green" onClick={reset}>
                Reset filters <ArrowRight size={16} />
              </button>
            </div>
          )}
          <div className="collection-bottom">
            <p>A style caught your eye? Let's talk sizes and availability.</p>
            <button className="text-button" onClick={() => show()}>
              Ask us on WhatsApp <MessageCircle size={17} />
            </button>
            {(category !== "All footwear" || search || sort !== "featured") && (
              <button className="reset-button" onClick={reset}>
                Reset filters
              </button>
            )}
          </div>
        </section>
        <section id="about" className="about">
          <div className="shell">
            <div className="about-heading">
              <div>
                <div className="eyebrow">ONLINE DISCOVERY. IN-STORE CONNECTION.</div>
                <h2>
                  FIND IT HERE.
                  <br />
                  TRY IT <span>THERE.</span>
                </h2>
              </div>
              <p>
                A digital look at TN Footwear, a footwear retailer in Bulawayo. Explore the styles,
                then speak to the shop about the details that matter.
              </p>
            </div>
            <div className="steps">
              {[
                {
                  n: "01",
                  title: "Find your style",
                  body: "Take a look through the catalogue and discover a pair that feels like you.",
                  icon: <Search size={23} />,
                },
                {
                  n: "02",
                  title: "Ask about your pair",
                  body: "Check current pricing, sizes and availability directly with the shop.",
                  icon: <MessageCircle size={23} />,
                },
                {
                  n: "03",
                  title: "Plan your visit",
                  body: "Confirm opening hours and collection arrangements before stopping by.",
                  icon: <MapPin size={23} />,
                },
              ].map((s) => (
                <div className="step" key={s.n}>
                  <div className="step-top">
                    <span>{s.n}</span>
                    {s.icon}
                  </div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact shell">
          <div className="contact-copy">
            <div className="eyebrow">COME THROUGH, BULAWAYO</div>
            <h2>
              YOUR NEXT PAIR
              <br />
              IS A CONVERSATION AWAY.
            </h2>
            <p>
              Have a question or want a closer look?
              <br />
              Start with an enquiry. Confirm the details with the shop.
            </p>
            <button className="button button-green" onClick={() => show()}>
              <MessageCircle size={18} /> Enquire on WhatsApp <ArrowUpRight size={17} />
            </button>
          </div>
          <div className="store-card">
            <div className="store-card-top">
              <MapPin size={22} />
              <span>THE STORE</span>
              <span className="store-country">ZW</span>
            </div>
            <h3>{config.address}</h3>
            <p>{config.addressDetail}</p>
            <a className="text-button" href={config.mapUrl} target="_blank" rel="noreferrer">
              View map search <ArrowUpRight size={17} />
            </a>
            <div className="store-details">
              <div>
                <small>LISTED CONTACT</small>
                <span>{config.listedPhone}</span>
              </div>
              <div>
                <small>OPENING HOURS</small>
                <span>Confirm with the shop</span>
              </div>
            </div>
            <p className="store-notice">
              Location and number are supported by public posts; direct owner confirmation is
              pending.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <div className="shell footer-main">
          <a href="#home" aria-label="TN Footwear home">
            <Wordmark />
          </a>
          <p>Good shoes. Your own way.</p>
          <nav aria-label="Footer navigation">
            <a href="#collection">Shop</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
            <a href={config.catalogueSource} target="_blank" rel="noreferrer">
              Original catalogue <ExternalLink size={13} />
            </a>
          </nav>
        </div>
        <div className="shell footer-bottom">
          <span>© {new Date().getFullYear()} TN Footwear · Website demonstration</span>
          <span>{config.logoApproved ? "" : "Provisional demo identity"} · Bulawayo, Zimbabwe</span>
        </div>
      </footer>
      {config.demoMode && (
        <div className="demo-note">
          <span>DEMO PREVIEW</span>
          <p>
            Actual TN catalogue imagery. Product names, prices & sizes are examples; stock is
            unconfirmed.
          </p>
          <button onClick={() => show()}>
            How enquiries work <ArrowUpRight size={13} />
          </button>
        </div>
      )}
      <dialog
        ref={modal}
        className="product-dialog"
        aria-label={selected ? selected.name : "Enquiry preview"}
        onClose={() => setCopied(false)}
      >
        <button
          className="dialog-close icon-button"
          aria-label="Close preview"
          onClick={() => modal.current?.close()}
        >
          <X size={22} />
        </button>
        <div className={selected ? "dialog-layout" : "dialog-layout enquiry-only"}>
          {selected && (
            <div className="dialog-image">
              <img src={selected.image} alt={selected.alt} width="540" height="675" />
            </div>
          )}
          <div className="dialog-copy">
            <div className="eyebrow">{draft ? "PRODUCT ENQUIRY" : "A CLOSER LOOK"}</div>
            <h2>{selected?.name ?? "LET'S FIND YOUR PAIR."}</h2>
            {selected && (
              <>
                <p>
                  {selected.colour} · {selected.category}
                </p>
                <div className="dialog-price">
                  ${selected.price} <span>USD · illustrative demo price</span>
                </div>
                <label className="size-label" htmlFor="size">
                  Your size <span>EU sizing · options illustrative</span>
                </label>
                <select
                  id="size"
                  value={size ?? ""}
                  onChange={(e) => setSize(e.target.value ? Number(e.target.value) : undefined)}
                >
                  <option value="">Ask about sizes</option>
                  {selected.sizes.map((s) => (
                    <option key={s} value={s}>
                      EU {s}
                    </option>
                  ))}
                </select>
                <p className="availability">
                  Availability unknown. Confirm price and size with the shop.
                </p>
                <a className="source-link" href={selected.source} target="_blank" rel="noreferrer">
                  View original TN catalogue post <ExternalLink size={13} />
                </a>
              </>
            )}
            {!draft && selected ? (
              <button className="button button-green full-width" onClick={() => setDraft(true)}>
                <MessageCircle size={17} /> Enquire on WhatsApp <ArrowUpRight size={17} />
              </button>
            ) : (
              <>
                <div className="enquiry-notice">
                  <strong>
                    {waLink ? "Your enquiry is ready" : "Demo mode — no message will be sent"}
                  </strong>
                  <p>
                    {waLink
                      ? "WhatsApp opens with your draft. Sending it does not confirm an order or reserve stock."
                      : "The WhatsApp destination is not owner-confirmed. Preview or copy the draft below; no live enquiry link is enabled."}
                  </p>
                </div>
                <textarea
                  readOnly
                  aria-label="Enquiry message draft"
                  value={message}
                  rows={selected ? 5 : 4}
                />
                {waLink ? (
                  <a
                    className="button button-green full-width"
                    href={waLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Continue to WhatsApp <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <button className="button button-green full-width" onClick={copy}>
                    {copied ? <Check size={17} /> : <MessageCircle size={17} />}{" "}
                    {copied ? "Draft copied" : "Copy enquiry draft"}
                  </button>
                )}
                <output className="copy-status">
                  {copied
                    ? "Copied. The demo has not sent a message."
                    : "You can also select and copy the message above."}
                </output>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
