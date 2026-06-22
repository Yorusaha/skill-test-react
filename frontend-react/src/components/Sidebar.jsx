const menuItems = [
  { id: 'home',       label: 'Home',        icon: 'home' },
  { id: 'categories', label: 'Categories',  icon: 'grid_view' },
  { id: 'library',    label: 'My Library',  icon: 'video_library' },
  { id: 'bag',        label: 'My Bag',      icon: 'shopping_bag' },
];

function Sidebar({ activePage, setActivePage, cartCount }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-[240px] border-r border-outline-variant shadow-sm bg-surface flex flex-col py-lg z-50 hidden md:flex">
      <div className="px-md mb-lg">
        <h1 className="font-headline-lg text-headline-lg font-extrabold text-primary">Premium Gaming</h1>
        <p className="text-on-surface-variant font-label-sm text-label-sm mt-xs">Exclusive Game Store</p>
      </div>

      <div className="flex-1 px-sm space-y-xs">
        {menuItems.map(({ id, label, icon }) => {
          const isActive = activePage === id;
          return (
            <button
              key={id}
              onClick={() => setActivePage(id)}
              className={`w-full flex items-center gap-base px-md py-sm rounded-lg font-label-lg text-label-lg text-left transition-all duration-300
                ${isActive
                  ? 'bg-primary-container text-on-primary-container font-bold hover:scale-[1.02] hover:shadow-md ease-[cubic-bezier(0.34,1.56,0.64,1)]'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
                }`}
            >
              <span className={`material-symbols-outlined${isActive ? ' fill' : ''}`}>{icon}</span>
              <span>{label}</span>
              {id === 'bag' && cartCount > 0 && (
                <span className="ml-auto bg-primary text-white font-bold rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Sidebar;
