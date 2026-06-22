function Header({ searchQuery, setSearchQuery, cartCount, wishlistCount, setActivePage }) {
  return (
    <header className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md w-full flex justify-between items-center h-xl px-margin-desktop">
      <div className="flex items-center gap-md">
        <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm hover:text-primary transition-colors" href="#">Store</a>
        <a className="text-on-surface-variant pb-1 font-label-sm text-label-sm hover:text-primary transition-colors" href="#">News</a>
        <a className="text-on-surface-variant pb-1 font-label-sm text-label-sm hover:text-primary transition-colors" href="#">Support</a>
      </div>

      <div className="flex items-center gap-md">
        <div className="relative hidden sm:block">
          <input
            className="w-64 pl-lg pr-md py-sm rounded-full border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none font-body-md text-body-md"
            placeholder="Search games..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
        </div>

        <button
          className="relative text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80"
          onClick={() => setActivePage('wishlist')}
        >
          <span className="material-symbols-outlined">favorite</span>
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {wishlistCount}
            </span>
          )}
        </button>

        <button
          className="relative text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:opacity-80"
          onClick={() => setActivePage('bag')}
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {cartCount}
            </span>
          )}
        </button>

        <img
          alt="User Avatar"
          className="w-10 h-10 rounded-full border-2 border-primary object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIiwPb1VmqB-xVG3pmn3UwgnH6otiyNrn__ZjjRgpkHYFPkYtBrsOsD38z6fJzEwGrtjnlFQAQ0VvcFXS91hmnCqoTjj1Z-nwtdTMTzalae9NvYyzll8If0X4MMYwY0VMjDq2ZgFBMdrjFrmSm_H7nazPiDZ6BKT0vDeHXjkJvE-W2ylcIwflFkqny2RQYu89aOmI1SVk0uHDcAIVVvqn0QXnIfQPr6L5Mg6RXitgai7G5Mpyx1by5eo4sQa70uVFP7SggVutHXS8"
        />
      </div>
    </header>
  );
}

export default Header;
