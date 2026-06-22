import { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import gamesData from './data/gamesData';
import Bag from './pages/Bag';
import Wishlist from './pages/Wishlist';
import Categories from './pages/Categories';

const genreStyles = {
  Action:     { badge: 'bg-red-500 text-white',          price: 'text-red-600',    cart: 'bg-red-500 text-white hover:bg-red-600' },
  RPG:        { badge: 'bg-purple-500 text-white',        price: 'text-purple-600', cart: 'bg-purple-500 text-white hover:bg-purple-600' },
  Strategy:   { badge: 'bg-blue-500 text-white',          price: 'text-blue-600',   cart: 'bg-blue-500 text-white hover:bg-blue-600' },
  Racing:     { badge: 'bg-orange-500 text-white',        price: 'text-orange-600', cart: 'bg-orange-500 text-white hover:bg-orange-600' },
  Platformer: { badge: 'bg-green-500 text-white',         price: 'text-green-600',  cart: 'bg-green-500 text-white hover:bg-green-600' },
  Fighting:   { badge: 'bg-yellow-400 text-yellow-900',  price: 'text-yellow-700', cart: 'bg-yellow-400 text-yellow-900 hover:bg-yellow-500' },
};

/* ─── 3D Fan Carousel ─── */
const CAROUSEL_CONFIG = {
  '-2': { x: -560, w: 240, h: '72%', ry: 42,  op: 0.28, zi: 1 },
  '-1': { x: -330, w: 360, h: '85%', ry: 22,  op: 0.60, zi: 2 },
   '0': { x: 0,    w: 470, h: '95%', ry: 0,   op: 1,    zi: 5 },
   '1': { x: 330,  w: 360, h: '85%', ry: -22, op: 0.60, zi: 2 },
   '2': { x: 560,  w: 240, h: '72%', ry: -42, op: 0.28, zi: 1 },
};

function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const total = gamesData.length;

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % total), 5000);
    return () => clearInterval(t);
  }, [total]);

  const prev = () => setIdx(i => (i - 1 + total) % total);
  const next = () => setIdx(i => (i + 1) % total);

  return (
    <div style={{ position: 'relative', flexShrink: 0, height: 'calc(100vh - 520px)', minHeight: '220px', maxHeight: '440px', perspective: '1200px', perspectiveOrigin: '50% 50%' }}>

      {[-2, -1, 0, 1, 2].map(pos => {
        const gameIdx = ((idx + pos) % total + total) % total;
        const game = gamesData[gameIdx];
        const cfg = CAROUSEL_CONFIG[pos.toString()];
        const isCenter = pos === 0;
        const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);

        return (
          <div
            key={`${pos}-${gameIdx}`}
            onClick={!isCenter ? (pos < 0 ? prev : next) : undefined}
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              width: `${cfg.w}px`, height: `${cfg.h}px`,
              transform: `translate(calc(-50% + ${cfg.x}px), -50%) rotateY(${cfg.ry}deg)`,
              opacity: cfg.op, zIndex: cfg.zi,
              transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              borderRadius: '14px', overflow: 'hidden',
              cursor: isCenter ? 'default' : 'pointer',
              boxShadow: isCenter ? '0 24px 56px rgba(0,0,0,0.22)' : '0 8px 20px rgba(0,0,0,0.12)',
            }}
          >
            <img src={game.image} alt={game.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: isCenter ? 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)' : 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)' }} />

            {isCenter ? (
              <>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '10px 16px 14px', color: 'white' }}>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', margin: '0 0 1px' }}>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', margin: '0 0 8px' }}>Odio non nobis, molestiae eum quod qui</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button style={{ background: '#b61722', color: 'white', border: 'none', borderRadius: '6px', padding: '5px 14px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', letterSpacing: '0.04em' }}>
                      ORDER NOW
                    </button>
                    <button style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)', flexShrink: 0 }}>
                      <span className="material-symbols-outlined fill" style={{ fontSize: '16px' }}>play_arrow</span>
                    </button>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        );
      })}

      {/* Prev arrow */}
      <button onClick={prev}
        style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', transition: 'all 200ms' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>chevron_left</span>
      </button>
      {/* Next arrow */}
      <button onClick={next}
        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', zIndex: 20, background: 'rgba(255,255,255,0.92)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111827', boxShadow: '0 4px 14px rgba(0,0,0,0.18)', transition: 'all 200ms' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>chevron_right</span>
      </button>
    </div>
  );
}

/* ─── Home Page ─── */
function HomePage({ setActivePage }) {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', padding: '16px 32px', gap: '16px' }}>

      <HeroCarousel />

      {/* Games on Promotion */}
      <section style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>

        {/* Section header */}
        <div style={{ flexShrink: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111827' }}>
            GAMES ON PROMOTION
          </h3>
          <button
            onClick={() => setActivePage('categories')}
            className="text-primary hover:opacity-75 transition-opacity"
            style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
          >
            View More Games
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', paddingBottom: '16px' }}>
          {gamesData.slice(0, 4).map(game => {
            const s = genreStyles[game.genre] || genreStyles.Action;
            const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
            const isWishlisted = wishlistItems.some(g => g.id === game.id);
            const fullStars = Math.round(game.rating);

            return (
              <div key={game.id}
                className="smooth-shadow hover-pop"
                style={{ display: 'flex', flexDirection: 'column', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', background: 'white' }}>

                {/* Image */}
                <div style={{ position: 'relative', height: '160px', flexShrink: 0 }}>
                  <img alt={game.title} src={game.image}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {/* Wishlist btn */}
                  <button
                    onClick={e => { e.stopPropagation(); toggleWishlist(game); }}
                    style={{ position: 'absolute', top: '8px', right: '8px', width: '28px', height: '28px', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isWishlisted ? '#EF4444' : 'rgba(0,0,0,0.4)', color: 'white', backdropFilter: 'blur(4px)' }}>
                    <span className={`material-symbols-outlined${isWishlisted ? ' fill' : ''}`} style={{ fontSize: '15px' }}>favorite</span>
                  </button>
                </div>

                {/* Card body */}
                <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {/* Genre badge + stars */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className={`${s.badge} rounded-full`} style={{ padding: '2px 10px', fontSize: '10px', fontWeight: 700 }}>{game.genre}</span>
                    <div style={{ display: 'flex', gap: '1px' }}>
                      {[...Array(fullStars)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined fill" style={{ fontSize: '14px', color: '#FBBF24' }}>star</span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h4 style={{ fontSize: '13px', fontWeight: 800, textTransform: 'uppercase', color: '#111827', margin: 0, letterSpacing: '0.03em' }}>
                    {game.title}
                  </h4>

                  {/* Price row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="bg-primary text-white" style={{ padding: '1px 6px', borderRadius: '4px', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
                      {game.discount}%
                    </span>
                    <span style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '12px', flexShrink: 0 }}>${game.price.toFixed(2)}</span>
                    <span style={{ fontWeight: 700, color: '#111827', fontSize: '14px', flex: 1 }}>${discountedPrice}</span>
                    <button
                      onClick={e => { e.stopPropagation(); addToCart(game); }}
                      className={`${s.cart} transition-colors active:scale-95`}
                      style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>shopping_bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ─── App Shell ─── */
function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, wishlistItems } = useCart();

  const renderPage = () => {
    switch (activePage) {
      case 'bag':        return <Bag />;
      case 'wishlist':   return <Wishlist />;
      case 'categories': return <Categories />;
      case 'library':    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px' }}
          className="text-on-surface-variant">
          <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>video_library</span>
          <p className="font-headline-sm">My Library Coming Soon</p>
        </div>
      );
      default: return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}
      className="bg-background text-on-background font-body-md">
      <Sidebar activePage={activePage} setActivePage={setActivePage} cartCount={cartCount} />
      <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden', flex: 1, marginLeft: '240px' }}>
        <div style={{ flexShrink: 0 }}>
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartCount={cartCount}
            wishlistCount={wishlistItems.length}
            setActivePage={setActivePage}
          />
        </div>
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}

export default App;
