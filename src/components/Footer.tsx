const Footer = () => (
  <footer className="mt-12 border-t border-slate-100 bg-white px-6 py-10 text-sm text-muted">
    <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-base font-semibold text-primary">NovaMarket</p>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Curated tech, wellness, and workspace essentials. Built for modern living and seamless shopping.
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">Customer care</p>
        <p>support@novamarket.com</p>
        <p>+1 (415) 555-1812</p>
      </div>
    </div>
  </footer>
)

export default Footer
