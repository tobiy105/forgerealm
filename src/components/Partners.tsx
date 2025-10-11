export default function ProductsMarquee() {
  return (
    <div
      aria-label="What we make"
      className="py-10 border-y border-white/80 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg backdrop-blur"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex animate-[marquee_25s_linear_infinite] gap-12 whitespace-nowrap text-white">
            <span className="text-sm uppercase">Fidget Toys</span>
            <span className="text-sm uppercase">White Vases</span>
            <span className="text-sm uppercase">Halloween Trinkets</span>
            <span className="text-sm uppercase">D&D Dice Holders</span>
            <span className="text-sm uppercase">Phone Stands</span>
            <span className="text-sm uppercase">Keychains</span>
            <span className="text-sm uppercase">Book Stands</span>
            <span className="text-sm uppercase">Figurines (Dragons, Cats)</span>
            <span className="text-sm uppercase">Cosplay Props</span>
            <span className="text-sm italic">...and more</span>
          </div>
        </div>
      </div>
    </div>
  );
}
