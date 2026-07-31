import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowUpRight,
  FiClock,
  FiFeather,
  FiPackage,
  FiX,
  FiZap,
} from "react-icons/fi";

type Product = {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  gallery?: string[];
  accent: string;
  badge: string;
  shipTime: string;
  size: string;
  finish: string;
  eco: string;
  features: string[];
};

const products: Product[] = [
  {
    id: "aurora-lamp",
    name: "Aurora Bloom",
    price: "GBP 14.99",
    category: "3D Printed Lamp",
    description:
      "Aurora Bloom is a gradient lamp shade with a soft spiral that diffuses light into a warm glow. Printed in precision PLA with smooth layering, it brings ambient color to desks, shelves, and bedside tables.",
    longDescription:
      "Aurora Bloom is a gradient lamp shade with a soft spiral that diffuses light into a warm glow. Printed in precision PLA with smooth layering, it brings ambient color to desks, shelves, and bedside tables.",
    image: "/ablamp2.webp",
    gallery: ["/ablamp2.webp", "/ablamp.webp"],
    accent: "from-emerald-500/70 via-amber-400/60 to-rose-300/50",
    badge: "Warm glow",
    shipTime: "Ships in 3-4 days",
    size: "14 cm tall",
    finish: "Smooth PLA layering",
    eco: "Plant-based PLA, plastic-free wrap",
    features: [
      "Soft spiral diffuser",
      "Ambient glow",
      "Precision PLA print",
      "Leeds made",
    ],
  },
  {
    id: "nebula-owl",
    name: "Leeds Owl",
    price: "GBP 5.99",
    category: "Display Model",
    description:
      "A Leeds-inspired owl with a warm gradient that fades from amber to blush. Crisp feather detail makes it a standout accent for studios and shelves.",
    longDescription:
      "A Leeds-inspired owl with a warm gradient that fades from amber to blush. Crisp feather detail makes it a standout accent for studios and shelves.",
    image: "/owl.webp",
    accent: "from-amber-500/60 via-rose-400/50 to-red-500/50",
    badge: "Leeds made",
    shipTime: "Ships in 2 days",
    size: "9 cm tall",
    finish: "Gradient PLA",
    eco: "Plant-based PLA, plastic-free mailer",
    features: [
      "Crisp feather detail",
      "Warm gradient tones",
      "Compact display size",
      "Studio-ready",
    ],
  },
  {
    id: "forest-dragon",
    name: "Forest Dragon",
    price: "GBP 4.99",
    category: "Display Model",
    description:
      "A detailed, articulated dragon with layered scales and a balanced pose. The green PLA blend shifts under light, making it feel alive on shelves, desks, or diorama bases.",
    longDescription:
      "A detailed, articulated dragon with layered scales and a balanced pose. The green PLA blend shifts under light, making it feel alive on shelves, desks, or diorama bases.",
    image: "/dragon.webp",
    gallery: ["/dragon.webp", "/dice-dragon.webp"],
    accent: "from-emerald-500/60 via-lime-400/50 to-slate-400/40",
    badge: "Layered scales",
    shipTime: "Ships in 2 days",
    size: "8 cm long",
    finish: "PLA blend",
    eco: "Plant-based PLA, recycled padding",
    features: [
      "Articulated pose",
      "Layered scales",
      "Balanced stance",
      "Leeds made",
    ],
  },
  {
    id: "dice-guardian",
    name: "Dice Guardian",
    price: "GBP 5.99",
    category: "Fidget Toy",
    description:
      "A compact dragon head designed to cradle a full set of D&D dice. PETG adds toughness, and the sculpted form keeps it sharp and tabletop-ready.",
    longDescription:
      "A compact dragon head designed to cradle a full set of D&D dice. PETG adds toughness, and the sculpted form keeps it sharp and tabletop-ready.",
    image: "/dice-dragon.webp",
    accent: "from-indigo-500/60 via-slate-500/50 to-blue-900/40",
    badge: "Tabletop ready",
    shipTime: "Ships in 3 days",
    size: "7 cm tall",
    finish: "PETG",
    eco: "PETG, paper fill",
    features: [
      "Dice cradle form",
      "Tough PETG build",
      "Compact footprint",
      "Clean sculpt",
    ],
  },
];

const ProductModal = ({
  product,
  onClose,
  onOpenImage,
}: {
  product: Product;
  onClose: () => void;
  onOpenImage: () => void;
}) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-10 sm:px-6">
    <div
      className="modal-overlay absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      aria-hidden
    />
    <div className="shop-modal relative mx-auto flex min-h-0 w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-950/95 shadow-[0_40px_140px_rgba(0,0,0,0.55)] max-h-[85vh] sm:max-h-[90vh]">
      <div className="modal-header flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3 sm:px-6 sm:py-4">
        <div>
          <p className="modal-label text-[9px] uppercase tracking-[0.35em] text-blue-200/80 sm:text-[10px]">
            Product window
          </p>
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            {product.name}
          </h3>
          <p className="text-[10px] text-slate-400 sm:text-xs">
            {product.category}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100 shadow-inner shadow-blue-500/30 sm:text-sm">
            {product.price}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-base text-white transition hover:-translate-y-[1px] hover:border-white/30 hover:bg-white/10 sm:h-10 sm:w-10 sm:text-lg"
            aria-label="Close product window"
          >
            <FiX />
          </button>
        </div>
      </div>

      <div className="modal-body flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto overscroll-contain p-6 lg:grid lg:grid-cols-[1.2fr_0.8fr] max-h-[calc(85vh-88px)] sm:max-h-[calc(90vh-88px)]">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onOpenImage();
          }}
          className="modal-image relative w-full flex-shrink-0 overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-left"
          aria-label={`Open ${product.name} image`}
        >
          <div className="relative aspect-[4/3] min-h-[220px] overflow-hidden bg-black/30">
            <img
              src={product.gallery?.[0] ?? product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
          <span className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            View image
          </span>
        </button>

        <div className="flex flex-col gap-5">
          <div>
            <p className="modal-label text-sm uppercase tracking-[0.3em] text-blue-200/70">
              Full description
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-200">
              {product.longDescription}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                Finish
              </p>
              <p className="text-white font-semibold">{product.finish}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                Size
              </p>
              <p className="text-white font-semibold">{product.size}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                Lead time
              </p>
              <p className="text-white font-semibold">{product.shipTime}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-[11px] uppercase tracking-[0.28em] text-slate-300">
                Eco grade
              </p>
              <p className="text-white font-semibold">{product.eco}</p>
            </div>
          </div>

          <div className="grid gap-2">
            {product.features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-2 rounded-lg border border-white/5 bg-slate-900/80 px-3 py-2 text-sm text-slate-100"
              >
                <FiFeather className="mt-[3px] text-blue-300" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-950 shadow-lg shadow-blue-500/30 transition hover:-translate-y-[1px] hover:bg-blue-400">
              Reserve build slot
              <FiArrowUpRight className="text-base" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:-translate-y-[1px] hover:border-white/40 hover:bg-white/10">
              Add to moodboard
            </button>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-100">
              <FiPackage className="text-sm" />
              Plastic-free packaging
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ShopShowcase = () => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [imageOpen, setImageOpen] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!activeProduct) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProduct(null);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeProduct]);

  return (
    <section
      id="products"
      className="relative mx-auto max-w-6xl px-6 sm:px-10 py-16"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.35em] text-blue-200/80">
            Eco drop
          </p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold leading-tight">
            Eco-forward drops, precision printed in Leeds.
          </h2>
          <p className="mt-2 text-slate-300 max-w-2xl">
            Made in Leeds with planet-first materials, each drop is printed in
            small batches for crisp detail and consistent finish.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200">
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
            Leeds made
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
            Plant-based PLA
          </span>
          <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 backdrop-blur">
            Plastic-free packaging
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, idx) => {
          const indexLabel = String(idx + 1).padStart(2, "0");
          const metaChips = [product.price, product.size].filter(Boolean);
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActiveProduct(product)}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 text-left shadow-xl shadow-blue-500/10 transition hover:-translate-y-[3px] hover:border-blue-300/60 hover:shadow-blue-500/25"
            >
              <div
                className={`absolute inset-0 opacity-50 blur-3xl bg-gradient-to-br ${product.accent}`}
                aria-hidden
              />
              <div className="flex items-center justify-between text-xs text-slate-400 uppercase tracking-[0.3em] px-5 pt-5">
                <span>{indexLabel}</span>
                <span>{product.category}</span>
              </div>
              <div className="mt-4 flex flex-col gap-4 px-5 pb-5">
                <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
                    aria-hidden
                  />
                  <div className="absolute right-3 top-3 flex flex-col items-end gap-2 text-[10px] font-semibold uppercase tracking-wide text-white/90">
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur">
                      <FiZap className="text-[11px]" />
                      {product.badge}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
                      <FiClock className="text-[11px]" />
                      {product.shipTime}
                    </span>
                  </div>
                </div>
                <div className="flex min-h-[180px] flex-col">
                  <h3 className="text-lg font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 line-clamp-4">
                    {product.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
                    {metaChips.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blue-200">
                    <FiArrowUpRight className="text-base" />
                    Open product window
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {portalTarget && activeProduct
        ? createPortal(
            <>
              <ProductModal
                product={activeProduct}
                onClose={() => {
                  setActiveProduct(null);
                  setImageOpen(false);
                }}
                onOpenImage={() => setImageOpen(true)}
              />

              {imageOpen ? (
                <div
                  className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 px-4 py-6"
                  onClick={() => setImageOpen(false)}
                >
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="max-h-[90vh] w-auto max-w-[92vw] rounded-3xl border border-white/10 object-contain shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ) : null}
            </>,
            portalTarget,
          )
        : null}
    </section>
  );
};

export default ShopShowcase;
