import { useCart } from '../context/CartContext';

function Bag() {
  const { cartItems, removeFromCart, updateQty, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1, gap: '12px' }}
        className="text-on-surface-variant">
        <span className="material-symbols-outlined" style={{ fontSize: '64px' }}>shopping_bag</span>
        <p className="font-headline-sm text-headline-sm">Your bag is empty</p>
        <p className="font-label-sm text-label-sm">Add some games to get started</p>
      </div>
    );
  }

  return (
    <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '24px 32px', gap: '16px' }}>
      <h2 className="font-headline-md text-headline-md font-bold text-on-background" style={{ flexShrink: 0 }}>
        My Bag ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
      </h2>

      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {cartItems.map(({ game, qty }) => {
          const discountedPrice = game.price * (1 - game.discount / 100);
          return (
            <div key={game.id} className="bg-white rounded-xl smooth-shadow"
              style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 16px' }}>
              <img src={game.image} alt={game.title}
                style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <p className="font-headline-sm text-on-background" style={{ fontSize: '14px', fontWeight: 700 }}>{game.title}</p>
                <p className="text-on-surface-variant font-label-sm" style={{ fontSize: '12px' }}>{game.genre}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button onClick={() => updateQty(game.id, -1)}
                  className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>remove</span>
                </button>
                <span className="font-label-lg text-label-lg" style={{ minWidth: '20px', textAlign: 'center' }}>{qty}</span>
                <button onClick={() => updateQty(game.id, 1)}
                  className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-primary hover:text-white transition-colors">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                </button>
              </div>
              <div style={{ minWidth: '80px', textAlign: 'right' }}>
                <p className="text-on-surface-variant line-through" style={{ fontSize: '11px' }}>${(game.price * qty).toFixed(2)}</p>
                <p className="text-primary font-bold" style={{ fontSize: '14px' }}>${(discountedPrice * qty).toFixed(2)}</p>
              </div>
              <button onClick={() => removeFromCart(game.id)}
                className="text-on-surface-variant hover:text-red-600 transition-colors">
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>delete</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl smooth-shadow" style={{ flexShrink: 0, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="text-on-surface-variant font-label-sm text-label-sm">Total</p>
          <p className="text-primary font-bold" style={{ fontSize: '22px' }}>${cartTotal.toFixed(2)}</p>
        </div>
        <button className="bg-primary text-white rounded-full font-label-lg text-label-lg hover:bg-primary/90 active:scale-95 transition-all"
          style={{ padding: '10px 32px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Bag;
