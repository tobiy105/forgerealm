"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiX,
  FiSearch,
  FiExternalLink,
} from "react-icons/fi";
import { products } from "../data/products";
import ScrambleLabel from "./anime/ScrambleLabel";
import AnimatedHeading from "./anime/AnimatedHeading";

/* ── API base (same detection used across the site) ── */

const envBase =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  typeof import.meta.env.PUBLIC_API_URL === "string"
    ? import.meta.env.PUBLIC_API_URL.trim().replace(/\/$/, "")
    : "";

const envLocal =
  typeof import.meta !== "undefined" &&
  import.meta.env &&
  typeof import.meta.env.PUBLIC_API_URL_LOCAL === "string"
    ? import.meta.env.PUBLIC_API_URL_LOCAL.trim().replace(/\/$/, "")
    : "";

function apiBase(): string {
  if (typeof window === "undefined") return envBase;
  return window.location.origin.startsWith("http://localhost")
    ? envLocal || "http://localhost:8080"
    : envBase || "";
}

/* ── Types ── */

type ProductRef = { slug: string; name: string; category?: string };
type Variant = { colour: string; size: string; quantity: string };
type SubmitState = "idle" | "sending" | "success" | "error";

/* ── Small building blocks ── */

const inputCls =
  "w-full rounded-xl bg-white/[0.03] border border-white/[0.1] px-4 py-3 text-sm text-white " +
  "placeholder:text-slate-500 outline-none transition " +
  "focus:border-cyan-300/50 focus:bg-white/[0.05] focus:ring-2 focus:ring-cyan-300/15";

const labelCls =
  "block text-[11px] font-medium uppercase tracking-[0.2em] text-blue-300/70 mb-2";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

/* ── Main ── */

export default function CustomOrder() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");

  const [productRef, setProductRef] = useState<ProductRef | null>(null);
  const [productQuery, setProductQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const [variant, setVariant] = useState<Variant>({
    colour: "",
    size: "",
    quantity: "",
  });

  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // ?product=<slug> pre-fills the reference. Used by the in-store barcode.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const slug = new URLSearchParams(window.location.search).get("product");
    if (!slug) return;
    const p = products.find((x) => x.slug === slug || x.id === slug);
    if (p) setProductRef({ slug: p.slug, name: p.name, category: p.category });
  }, []);

  const filtered = useMemo(() => {
    const q = productQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => !p.bannerOnly)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
      .slice(0, 8);
  }, [productQuery]);

  const canSubmit =
    !!name.trim() &&
    /^\S+@\S+\.\S+$/.test(email) &&
    description.trim().length >= 10 &&
    state !== "sending";

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${apiBase()}/api/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          description: description.trim(),
          product: productRef
            ? { slug: productRef.slug, name: productRef.name }
            : undefined,
          variant: productRef
            ? {
                colour: variant.colour.trim() || undefined,
                size: variant.size.trim() || undefined,
                quantity: variant.quantity
                  ? Number(variant.quantity)
                  : undefined,
              }
            : undefined,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      setState("success");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  /* ── Success state ── */

  if (state === "success") {
    return (
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border border-cyan-300/30 bg-cyan-300/10 mb-6">
          <FiCheckCircle className="text-3xl text-cyan-300" />
        </div>
        <h1
          className="text-3xl sm:text-4xl font-normal text-white mb-4"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          Enquiry{" "}
          <em
            className="text-cyan-300"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            received
          </em>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
          Thanks, we've got your enquiry and one of us will reply within 24-48
          hours. If it's urgent, drop us a message on Instagram at
          @forgerealmltd.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-200 backdrop-blur-xl transition hover:border-cyan-300/30 hover:text-cyan-100"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Back to the shop
          </a>
          <button
            type="button"
            onClick={() => {
              setName("");
              setEmail("");
              setPhone("");
              setDescription("");
              setProductRef(null);
              setProductQuery("");
              setVariant({ colour: "", size: "", quantity: "" });
              setState("idle");
            }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/[0.06] px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-cyan-100 transition hover:bg-cyan-300/[0.12]"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  /* ── Form ── */

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      {/* Heading */}
      <div className="mb-10 sm:mb-14 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-gradient-to-r from-blue-400 to-cyan-400" />
          <ScrambleLabel
            className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.3em] text-blue-300/60"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            Commission a piece
          </ScrambleLabel>
          <div className="w-8 h-px bg-gradient-to-l from-blue-400 to-cyan-400" />
        </div>
        <AnimatedHeading
          as="h1"
          className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white"
          style={{ fontFamily: "'Cinzel', serif" }}
          from="center"
        >
          Custom{" "}
          <em
            className="text-cyan-300"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            order
          </em>
        </AnimatedHeading>
        <p className="mt-5 max-w-xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed">
          Tell us what you'd like printed. Describe it in your own words, or
          point at something in the shop and say what you'd change. We'll quote
          you a price and a timeline within a day or two.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={submit}
        className="relative rounded-2xl border border-white/[0.08] bg-[#0a0f1a]/60 backdrop-blur-xl p-6 sm:p-8 lg:p-10 space-y-8 shadow-2xl shadow-black/40"
      >
        {/* Corner bracket markers for the blueprint feel */}
        <span className="pointer-events-none absolute top-0 left-0 h-4 w-4 border-t border-l border-cyan-300/40 rounded-tl-2xl" />
        <span className="pointer-events-none absolute top-0 right-0 h-4 w-4 border-t border-r border-cyan-300/40 rounded-tr-2xl" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-4 w-4 border-b border-l border-cyan-300/40 rounded-bl-2xl" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-4 w-4 border-b border-r border-cyan-300/40 rounded-br-2xl" />

        {/* Section: About you */}
        <fieldset className="space-y-5">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80 mb-2">
            01 &nbsp;·&nbsp; About you
          </legend>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputCls}
                placeholder="Jane Doe"
                maxLength={120}
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
                placeholder="you@example.com"
                maxLength={200}
              />
            </Field>
          </div>
          <Field label="Phone (optional)" hint="If you'd rather we call.">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputCls}
              placeholder="+44 …"
              maxLength={40}
            />
          </Field>
        </fieldset>

        {/* Section: Reference product (optional) */}
        <fieldset className="space-y-5 relative">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80 mb-2">
            02 &nbsp;·&nbsp; Reference an existing product{" "}
            <span className="text-slate-500 tracking-normal normal-case font-normal">
              (optional)
            </span>
          </legend>

          {productRef ? (
            <div className="flex items-center justify-between gap-3 rounded-xl border border-cyan-300/25 bg-cyan-300/[0.06] px-4 py-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-cyan-300/70 mb-1">
                  <FiCheckCircle className="text-cyan-300" />
                  Referenced
                </div>
                <div className="text-white font-semibold truncate">
                  {productRef.name}
                </div>
                {productRef.category && (
                  <div className="text-[11px] text-slate-400">
                    {productRef.category}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  setProductRef(null);
                  setProductQuery("");
                }}
                className="shrink-0 rounded-full p-2 text-slate-400 hover:bg-white/[0.06] hover:text-white transition"
                aria-label="Clear reference product"
              >
                <FiX />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  ref={searchRef}
                  type="text"
                  value={productQuery}
                  onChange={(e) => {
                    setProductQuery(e.target.value);
                    setDropdownOpen(true);
                  }}
                  onFocus={() => setDropdownOpen(true)}
                  onBlur={() =>
                    // small delay so a click on a dropdown item registers
                    setTimeout(() => setDropdownOpen(false), 120)
                  }
                  className={inputCls + " pl-11"}
                  placeholder="Search the shop, e.g. 'elephant', 'dragon', 'keychain'"
                />
              </div>
              {dropdownOpen && filtered.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute z-20 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-white/[0.1] bg-[#0c1220] shadow-2xl shadow-black/60 divide-y divide-white/[0.04]"
                >
                  {filtered.map((p) => (
                    <li key={p.id}>
                      <button
                        type="button"
                        onMouseDown={(e) => {
                          // preserve focus so onBlur doesn't fire first
                          e.preventDefault();
                        }}
                        onClick={() => {
                          setProductRef({
                            slug: p.slug,
                            name: p.name,
                            category: p.category,
                          });
                          setProductQuery("");
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-white/[0.04]"
                      >
                        <div className="min-w-0">
                          <div className="text-sm text-white truncate">
                            {p.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {p.category} · {p.displayPrice}
                          </div>
                        </div>
                        <FiExternalLink className="shrink-0 text-slate-500" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {dropdownOpen &&
                productQuery.trim().length > 0 &&
                filtered.length === 0 && (
                  <p className="mt-2 text-[12px] text-slate-500 px-1">
                    No match. Describe what you'd like in your own words below
                    instead.
                  </p>
                )}
              <p className="mt-2 text-[11px] text-slate-500">
                Or leave blank if it's something new. In store, scan the
                product's QR/barcode to skip this step.
              </p>
            </div>
          )}

          {/* Variant fields — only when a product is referenced */}
          {productRef && (
            <div className="grid gap-4 sm:grid-cols-3 pt-2">
              <Field label="Colour" hint="e.g. 'silk red' or 'natural white'">
                <input
                  type="text"
                  value={variant.colour}
                  onChange={(e) =>
                    setVariant((v) => ({ ...v, colour: e.target.value }))
                  }
                  className={inputCls}
                  placeholder="As-is"
                  maxLength={80}
                />
              </Field>
              <Field label="Size" hint="Relative or in cm">
                <input
                  type="text"
                  value={variant.size}
                  onChange={(e) =>
                    setVariant((v) => ({ ...v, size: e.target.value }))
                  }
                  className={inputCls}
                  placeholder="Same size"
                  maxLength={80}
                />
              </Field>
              <Field label="Quantity">
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={variant.quantity}
                  onChange={(e) =>
                    setVariant((v) => ({ ...v, quantity: e.target.value }))
                  }
                  className={inputCls}
                  placeholder="1"
                />
              </Field>
            </div>
          )}
        </fieldset>

        {/* Section: Describe */}
        <fieldset className="space-y-3">
          <legend className="text-[11px] font-semibold uppercase tracking-[0.25em] text-cyan-300/80 mb-2">
            03 &nbsp;·&nbsp; Describe what you'd like
          </legend>
          <Field
            label="Description"
            hint={
              productRef
                ? "Explain the changes you'd like. Colour, size, finish, quantity, deadline."
                : "Describe the piece in your own words. Character, animal, home decor, prop — anything. Include size and any deadline if it matters."
            }
          >
            <textarea
              required
              minLength={10}
              maxLength={4000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className={inputCls + " resize-y"}
              placeholder={
                productRef
                  ? "e.g. Same shape, but printed in translucent silk red PLA and 20% larger. Needed by end of next month for a birthday."
                  : "e.g. An articulated phoenix, wings spread, about 15cm tall. Any warm colour is fine — silk gold would be ideal."
              }
            />
            <div className="mt-1.5 text-right text-[11px] text-slate-500 tabular-nums">
              {description.length} / 4000
            </div>
          </Field>
        </fieldset>

        {/* Error */}
        {state === "error" && (
          <div className="flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-500/[0.06] px-4 py-3 text-sm text-red-200">
            <FiAlertCircle className="shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold">Couldn't send the enquiry</div>
              <div className="text-red-200/70 text-[13px]">{errorMsg}</div>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/[0.06]">
          <p className="text-[11px] text-slate-500">
            We reply within 24-48 hours. No spam, ever.
          </p>
          <button
            type="submit"
            disabled={!canSubmit}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-6 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 hover:shadow-blue-500/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {state === "sending" ? "Sending…" : "Send enquiry"}
            {state !== "sending" && (
              <FiSend className="transition-transform group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
