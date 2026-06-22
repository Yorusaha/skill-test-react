import { useCart } from '../context/CartContext';
import gamesData from '../data/gamesData';

const genreStyles = {
  Action:     { border: 'border-red-500',    badge: 'bg-red-50 text-red-600',       price: 'text-red-600',    cart: 'bg-red-100 text-red-600 hover:bg-red-600 hover:text-white' },
  RPG:        { border: 'border-purple-500', badge: 'bg-purple-50 text-purple-600', price: 'text-purple-600', cart: 'bg-purple-100 text-purple-600 hover:bg-purple-600 hover:text-white' },
  Racing:     { border: 'border-orange-500', badge: 'bg-orange-50 text-orange-600', price: 'text-orange-600', cart: 'bg-orange-100 text-orange-600 hover:bg-orange-600 hover:text-white' },
  Platformer: { border: 'border-green-500',  badge: 'bg-green-50 text-green-600',   price: 'text-green-600',  cart: 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white' },
  Strategy:   { border: 'border-blue-500',   badge: 'bg-blue-50 text-blue-600',     price: 'text-blue-600',   cart: 'bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white' },
  Fighting:   { border: 'border-yellow-500', badge: 'bg-yellow-50 text-yellow-700', price: 'text-yellow-700', cart: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-500 hover:text-white' },
};

function Categories() {
  const { addToCart, toggleWishlist, wishlistItems } = useCart();

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '24px 32px', gap: '16px' }}>
      <h2 className="font-headline-md text-headline-md font-bold text-on-background" style={{ flexShrink: 0 }}>
        All Games
      </h2>
      <div style={{ flex: 1, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', alignContent: 'start' }}>
        {gamesData.map(game => {
          const s = genreStyles[game.genre] || genreStyles.Action;
          const discountedPrice = (game.price * (1 - game.discount / 100)).toFixed(2);
          const isWishlisted = wishlistItems.some(g => g.id === game.id);
          return (
            <div key={game.id}
              className={`bg-surface-container-lowest rounded-xl overflow-hidden smooth-shadow hover-pop group cursor-pointer relative border-t-4 ${s.border}`}
              style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <img alt={game.title} className="w-full h-auto block group-hover:scale-105 transition-transform duration-500" src={game.image} />
                <div className="absolute top-2 right-2 bg-primary text-white font-label-sm text-label-sm px-2 py-0.5 rounded-sm shadow-sm">
                  -{game.discount}%
                </div>
                <button onClick={() => toggleWishlist(game)}
                  className={`absolute top-2 left-2 w-7 h-7 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center transition-colors ${isWishlisted ? 'text-red-400' : 'text-white hover:text-primary'}`}>
                  <span className={`material-symbols-outlined${isWishlisted ? ' fill' : ''}`} style={{ fontSize: '16px' }}>favorite</span>
                </button>
              </div>
              <div className="bg-white" style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className={`${s.badge} px-2 py-0.5 rounded-sm font-label-sm uppercase`} style={{ fontSize: '10px' }}>{game.genre}</span>
                    <div className="flex items-center gap-0.5 text-yellow-400">
                      <span className="material-symbols-outlined fill" style={{ fontSize: '13px' }}>star</span>
                      <span className="text-on-surface-variant font-label-sm text-xs">{game.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-headline-sm text-on-background" style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0' }}>{game.title}</h4>
                </div>
                <div className="flex justify-between items-center border-t border-surface-variant" style={{ paddingTop: '6px' }}>
                  <div>
                    <span className="text-on-surface-variant line-through" style={{ fontSize: '11px' }}>${game.price.toFixed(2)}</span>
                    <span className={`${s.price} font-bold block`} style={{ fontSize: '14px' }}>${discountedPrice}</span>
                  </div>
                  <button onClick={() => addToCart(game)}
                    className={`w-8 h-8 rounded-full ${s.cart} flex items-center justify-center transition-colors active:scale-95 shadow-sm`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
