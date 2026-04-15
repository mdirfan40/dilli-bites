'use client'

import { useState } from 'react'

const categories = [
  { key: 'burger', name: 'Burger', title: 'All Burgers', icon: '/images/food_icon/burger.webp' },
  { key: 'momos', name: 'Momos', title: 'All Momos', icon: '/images/food_icon/momos.webp' },
  { key: 'pizza', name: 'Pizza', title: 'All Pizzas', icon: '/images/food_icon/pizza.webp' },
  { key: 'fries', name: 'Fries', title: 'All Fries', icon: '/images/food_icon/french_fires.webp' },
]

const menuByCategory = {
  burger: [
    { name: 'Plain Burger', description: 'Burgers', image: '/images/burger.webp', priceText: 'Rs 50', badge: 'Burger' },
    { name: 'Cheese Burger', description: 'Burgers', image: '/images/burger.webp', priceText: 'Rs 60', badge: 'Burger' },
    { name: 'Chicken Burger', description: 'Burgers', image: '/images/burger.webp', priceText: 'Rs 80', badge: 'Burger' },
  ],
  momos: [
    { name: 'Steam Veg Momos', description: 'Steam Momos', image: '/images/steam_momos.webp', priceText: 'Rs 30-50', badge: 'Steam' },
    { name: 'Steam Paneer Momos', description: 'Steam Momos', image: '/images/steam_momos.webp', priceText: 'Rs 45-80', badge: 'Steam' },
    { name: 'Steam Chicken Momos', description: 'Steam Momos', image: '/images/steam_momos.webp', priceText: 'Rs 45-80', badge: 'Steam' },
    { name: 'Fried Veg Momos', description: 'Fried Momos', image: '/images/fried_momos.webp', priceText: 'Rs 35-60', badge: 'Fried' },
    { name: 'Fried Paneer Momos', description: 'Fried Momos', image: '/images/fried_momos.webp', priceText: 'Rs 50-90', badge: 'Fried' },
    { name: 'Fried Chicken Momos', description: 'Fried Momos', image: '/images/fried_momos.webp', priceText: 'Rs 50-90', badge: 'Fried' },
    { name: 'Gravy Veg Momos', description: 'Gravy Momos', image: '/images/gravy_momos.webp', priceText: 'Rs 60-100', badge: 'Gravy' },
    { name: 'Gravy Paneer Momos', description: 'Gravy Momos', image: '/images/gravy_momos.webp', priceText: 'Rs 70-120', badge: 'Gravy' },
    { name: 'Gravy Chicken Momos', description: 'Gravy Momos', image: '/images/gravy_momos.webp', priceText: 'Rs 70-120', badge: 'Gravy' },
    { name: 'Malai Veg Momos', description: 'Malai Momos', image: '/images/malai_momos.webp', priceText: 'Rs 60-100', badge: 'Malai' },
    { name: 'Malai Paneer Momos', description: 'Malai Momos', image: '/images/malai_momos.webp', priceText: 'Rs 70-120', badge: 'Malai' },
    { name: 'Malai Chicken Momos', description: 'Malai Momos', image: '/images/malai_momos.webp', priceText: 'Rs 70-120', badge: 'Malai' },
    { name: 'Kurkure Veg Momos', description: 'Kurkure Momos', image: '/images/kurkure_momos.webp', priceText: 'Rs 60-100', badge: 'Kurkure' },
    { name: 'Kurkure Paneer Momos', description: 'Kurkure Momos', image: '/images/kurkure_momos.webp', priceText: 'Rs 70-120', badge: 'Kurkure' },
    { name: 'Kurkure Chicken Momos', description: 'Kurkure Momos', image: '/images/kurkure_momos.webp', priceText: 'Rs 70-120', badge: 'Kurkure' },
  ],
  fries: [
    { name: 'Salted Fries', description: 'French Fries', image: '/images/french_fries.webp', priceText: 'Rs 30', badge: 'Crispy' },
    { name: 'Peri-Peri Fries', description: 'French Fries', image: '/images/french_fries.webp', priceText: 'Rs 40', badge: 'Crispy' },
    { name: 'Cold Coffee', description: 'Drinks', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=640&q=80', priceText: 'Rs 80', badge: 'Drinks' },
  ],
  pizza: [
    { name: 'Pizza Mania Onion', description: 'Veg Single Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 99', badge: 'Single Topping' },
    { name: 'Pizza Mania Capsicum', description: 'Veg Single Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 99', badge: 'Single Topping' },
    { name: 'Pizza Mania Tomato', description: 'Veg Single Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 99', badge: 'Single Topping' },
    { name: 'Pizza Mania Corn', description: 'Veg Single Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 99', badge: 'Single Topping' },
    { name: 'Onion + Paneer', description: 'Veg Double Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 120', badge: 'Double Topping' },
    { name: 'Onion + Capsicum', description: 'Veg Double Topping', image: '/images/food_icon/pizza.webp', priceText: 'Rs 120', badge: 'Double Topping' },
    { name: 'Margherita', description: 'Single Cheese | R 120 | M 169 | L 259 | XL 349', image: '/images/food_icon/pizza.webp', priceText: 'R 120-M 169-L 259-XL 349', badge: 'Signature' },
    { name: 'Stuff Garlic Bread', description: 'Crispy garlic bread, stuffed and toasted to perfection', image: '/images/stuff_gralic_bread.webp', priceText: 'Rs 149', badge: 'Popular' },
  ],
}

function basePriceFromText(priceText) {
  const match = priceText.match(/\d+/)
  return match ? Number(match[0]) : 0
}

export default function V2Page() {
  const [activeCategory, setActiveCategory] = useState('momos')
  const [cart, setCart] = useState({ count: 0, total: 0 })

  const currentItems = menuByCategory[activeCategory] || []
  const selectedCategory = categories.find((c) => c.key === activeCategory)

  function addToCart(priceText) {
    const price = basePriceFromText(priceText)
    setCart((prev) => ({ count: prev.count + 1, total: prev.total + price }))
  }

  function viewCart() {
    alert(cart.count === 0 ? 'Your cart is empty.' : `You added ${cart.count} item(s), total Rs ${cart.total}.`)
  }

  return (
    <>
      <style>{`
        :root {
          --bg-0: #090909;
          --bg-1: #111217;
          --bg-2: #1a1c22;
          --card: #1b1d23;
          --card-soft: #232733;
          --stroke: #2f3441;
          --text: #f0f2f5;
          --muted: #b7bdc8;
          --brand: #f6c445;
          --brand-soft: #ffe08a;
          --accent: #ff7a18;
          --ok: #f6c445;
        }
        html, body {
          margin: 0;
          min-height: 100%;
          background: radial-gradient(110% 80% at 14% 0%, #232026 0%, transparent 46%),
                      radial-gradient(120% 86% at 100% 12%, #1f2431 0%, transparent 42%),
                      linear-gradient(180deg, var(--bg-1) 0%, var(--bg-0) 100%);
          color: var(--text);
          font-family: "Sora", sans-serif;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }
        .v2-shell {
          width: 100%;
          max-width: 470px;
          margin: 0 auto;
          min-height: 100dvh;
          position: relative;
          isolation: isolate;
          padding-bottom: calc(90px + env(safe-area-inset-bottom));
        }
        .glow {
          position: fixed;
          width: 220px;
          aspect-ratio: 1;
          border-radius: 50%;
          filter: blur(50px);
          z-index: -1;
          opacity: 0.42;
          pointer-events: none;
          animation: drift 10s ease-in-out infinite alternate;
        }
        .glow-one { top: -80px; left: -80px; background: #ff9d3d; }
        .glow-two { top: 22%; right: -110px; background: #6f7cff; animation-delay: 1.8s; }
        @keyframes drift {
          from { transform: translateY(-10px) scale(0.92); }
          to { transform: translateY(14px) scale(1.06); }
        }
        .topbar {
          position: sticky; top: 0; z-index: 20;
          padding: calc(10px + env(safe-area-inset-top)) 14px 12px;
          border-bottom: 1px solid rgba(246,196,69,0.22);
          backdrop-filter: blur(14px);
          background: linear-gradient(180deg, rgba(12,13,17,0.96) 0%, rgba(12,13,17,0.78) 100%);
        }
        .topbar-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
        .brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
        .brand-logo { width: 130px; height: auto; display: block; }
        .location {
          display: inline-flex; align-items: center; gap: 8px;
          color: #d0d4dc; font-size: 0.86rem; font-weight: 600;
          white-space: nowrap; padding: 8px 10px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
        }
        .pin { color: var(--brand); font-size: 1rem; }
        .content { padding: 14px; animation: page-reveal 420ms ease-out both; }
        @keyframes page-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cat-row {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          margin: 6px 0 20px;
        }
        .cat-item {
          border: 1px solid transparent;
          background: transparent;
          border-radius: 16px;
          text-align: center;
          padding: 10px 8px;
          cursor: pointer;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 180ms ease;
        }
        .cat-item img { width: 44px; height: 44px; object-fit: contain; display: block; margin: 0 auto 6px; }
        .cat-item.active {
          border-color: rgba(246,196,69,0.82);
          box-shadow: 0 0 0 1px rgba(246,196,69,0.2) inset;
          transform: translateY(-1px);
        }
        h2 {
          margin: 2px 2px 14px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.7rem;
          letter-spacing: -0.02em;
        }
        .section-meta { margin: -8px 2px 14px; color: var(--muted); font-size: 0.9rem; letter-spacing: 0.01em; }
        .list { display: grid; gap: 12px; }
        .item {
          position: relative;
          display: grid;
          grid-template-columns: 96px 1fr auto;
          gap: 12px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          background: linear-gradient(90deg, rgba(31,33,41,1) 0%, rgba(28,30,38,0.98) 100%);
          padding: 10px;
          overflow: hidden;
        }
        .item::after {
          content: "";
          position: absolute;
          inset: auto -20% -48% auto;
          width: 180px; height: 160px;
          background: radial-gradient(circle, rgba(246,196,69,0.09) 0%, transparent 62%);
          pointer-events: none;
        }
        .item img {
          width: 96px; height: 96px;
          border-radius: 12px; object-fit: cover; display: block;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .item-copy { min-width: 0; display: grid; gap: 4px; }
        .item-copy h3 {
          margin: 0;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.12rem; letter-spacing: -0.01em; line-height: 1.2;
        }
        .item-copy p { margin: 0; color: var(--muted); font-size: 0.93rem; line-height: 1.35; }
        .price { color: var(--brand-soft); font-weight: 700; font-size: 0.84rem; letter-spacing: 0.02em; }
        .add-btn {
          align-self: end; border: none; border-radius: 14px;
          background: var(--ok); color: #14120b;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.02rem; font-weight: 800;
          padding: 10px 14px; min-width: 86px; cursor: pointer;
          transition: transform 160ms ease, filter 160ms ease;
        }
        .add-btn:active { transform: scale(0.97); }
        .add-btn:hover { filter: brightness(1.05); }
        .badge {
          position: absolute; top: 8px; left: 8px;
          background: linear-gradient(90deg, #ffbf35, #ffdc74);
          color: #272010; border-radius: 999px;
          font-size: 0.7rem; font-weight: 800;
          padding: 4px 8px; letter-spacing: 0.03em;
          display: inline-flex; align-items: center; gap: 4px; z-index: 2;
        }
        .cart-dock {
          position: fixed; left: 0; right: 0; bottom: 0; z-index: 30;
          padding: 10px 14px calc(10px + env(safe-area-inset-bottom));
          background: linear-gradient(180deg, rgba(15,15,19,0) 0%, rgba(13,13,16,0.9) 32%, rgba(13,13,16,0.98) 100%);
        }
        .cart-bar {
          width: min(470px, 100%); margin: 0 auto;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          background: linear-gradient(90deg, #f6c445 0%, #efb726 100%);
          color: #14120b;
          display: flex; align-items: center; justify-content: space-between;
          gap: 12px; padding: 8px;
          box-shadow: 0 14px 30px rgba(0,0,0,0.45);
        }
        .cart-info {
          margin-left: 10px;
          font-family: "Plus Jakarta Sans", sans-serif;
          font-size: 1.04rem; font-weight: 800; letter-spacing: 0.01em;
        }
        .view-cart {
          border: none; border-radius: 999px;
          background: rgba(13,13,16,0.9); color: #f8deb2;
          font-size: 0.98rem; font-weight: 700;
          padding: 10px 16px; cursor: pointer;
        }
        @media (min-width: 480px) {
          .topbar {
            border-left: 1px solid rgba(255,255,255,0.08);
            border-right: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>

      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="v2-shell">
        <header className="topbar">
          <div className="topbar-inner">
            <div className="brand">
              <img className="brand-logo" src="/images/logo.webp" alt="Dilli Bites logo" width={130} height={58} decoding="async" />
            </div>
            <div className="location"><span className="pin">●</span> Jamo Bazar</div>
          </div>
        </header>

        <main className="content">
          <section className="cat-row" aria-label="Categories">
            {categories.map((cat) => (
              <article
                key={cat.key}
                className={`cat-item${activeCategory === cat.key ? ' active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                aria-label={cat.name}
                title={cat.name}
              >
                <img src={cat.icon} alt={`${cat.name} icon`} width={44} height={44} decoding="async" />
              </article>
            ))}
          </section>

          <h2>{selectedCategory ? selectedCategory.title : 'Menu'}</h2>
          <p className="section-meta">{currentItems.length} items from original menu.</p>

          <section className="list" aria-label="Menu list">
            {currentItems.map((item) => (
              <article className="item" key={item.name}>
                {item.badge && <span className="badge">{item.badge}</span>}
                <img src={item.image} alt={item.name} width={96} height={96} loading="lazy" decoding="async" />
                <div className="item-copy">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="price">{item.priceText}</span>
                </div>
                <button className="add-btn" type="button" onClick={() => addToCart(item.priceText)}>
                  + Add
                </button>
              </article>
            ))}
          </section>
        </main>
      </div>

      <div className="cart-dock">
        <div className="cart-bar">
          <div className="cart-info">{cart.count} Items | Rs {cart.total}</div>
          <button className="view-cart" type="button" onClick={viewCart}>View Cart</button>
        </div>
      </div>
    </>
  )
}
