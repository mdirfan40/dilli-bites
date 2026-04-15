import RevealObserver from './RevealObserver'

export const metadata = {
  title: 'Dilli Bites',
  description: 'Indian Street Food — Momos, Snacks, Pizza & More',
}

export default function Home() {
  return (
    <>
      <style>{`
        :root {
          --yellow:  #FFD600;
          --yellow2: #FFC200;
          --black:   #0A0A0A;
          --black2:  #141414;
          --black3:  #1C1C1C;
          --black4:  #2A2A2A;
          --red:     #E8140A;
          --white:   #FFFFFF;
          --gray:    #AAAAAA;
        }
        body { background: var(--black); color: var(--white); font-family: 'Inter', sans-serif; overflow-x: hidden; }

        /* NAV */
        nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 200;
          background: rgba(10,10,10,0.97);
          backdrop-filter: blur(16px);
          border-bottom: 3px solid var(--yellow);
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 66px;
        }
        .nav-logo { display: flex; align-items: center; }
        .nav-logo img { height: 42px; width: auto; display: block; }
        .nav-links { display: flex; gap: 28px; list-style: none; }
        .nav-links a { color: var(--white); text-decoration: none; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; transition: color 0.2s; }
        .nav-links a:hover { color: var(--yellow); }
        @media(max-width:700px){ .nav-links { display: none; } nav { padding: 0 20px; } }

        /* HERO */
        .hero {
          min-height: 100vh; padding-top: 66px;
          background:
            linear-gradient(160deg, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.6) 100%),
            url('https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1600&q=80') center/cover no-repeat;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; padding-left: 24px; padding-right: 24px;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--yellow); color: var(--black);
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 11px;
          letter-spacing: 0.3em; text-transform: uppercase;
          padding: 8px 22px; border-radius: 2px; margin-bottom: 24px;
          animation: fd 0.7s ease both;
        }
        .hero h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(72px,15vw,164px);
          line-height: 0.88; color: var(--white); letter-spacing: 0.02em;
          animation: fd 0.7s 0.1s ease both;
        }
        .hero h1 em { color: var(--yellow); font-style: normal; display: block; }
        .hero-sub {
          font-family: 'Montserrat', sans-serif; font-weight: 900;
          font-size: clamp(12px,2vw,16px); letter-spacing: 0.35em; text-transform: uppercase;
          color: var(--gray); margin-top: 18px;
          animation: fd 0.7s 0.18s ease both;
        }
        .hero-line { width: 80px; height: 4px; background: var(--yellow); margin: 28px auto; animation: fd 0.7s 0.25s ease both; }
        .hero-cta { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; animation: fd 0.7s 0.32s ease both; }
        .btn-y {
          background: var(--yellow); color: var(--black);
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 12px;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 16px 44px; border: none; border-radius: 3px;
          text-decoration: none; cursor: pointer; transition: all 0.25s;
          box-shadow: 0 4px 24px rgba(255,214,0,0.35);
        }
        .btn-y:hover { background: #FFE040; transform: translateY(-3px); box-shadow: 0 10px 32px rgba(255,214,0,0.55); }
        .btn-o {
          border: 2px solid var(--yellow); color: var(--yellow);
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 12px;
          letter-spacing: 0.2em; text-transform: uppercase;
          padding: 16px 44px; border-radius: 3px; text-decoration: none; transition: all 0.25s;
        }
        .btn-o:hover { background: rgba(255,214,0,0.1); transform: translateY(-3px); }
        @keyframes fd { from { opacity: 0; transform: translateY(-22px) } to { opacity: 1; transform: translateY(0) } }

        /* INFO BAR */
        .info-bar {
          background: var(--yellow); padding: 16px 24px;
          display: flex; justify-content: center; gap: 48px; flex-wrap: wrap;
        }
        .info-item {
          display: flex; align-items: center; gap: 8px;
          color: var(--black); font-family: 'Montserrat', sans-serif;
          font-weight: 900; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
        }

        /* SECTION */
        section { padding: 88px 24px; }
        .si { max-width: 1160px; margin: 0 auto; }
        .slabel {
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 11px;
          letter-spacing: 0.35em; text-transform: uppercase; color: var(--yellow); margin-bottom: 10px;
        }
        .stitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(42px,7vw,76px); color: var(--white); line-height: 1; letter-spacing: 0.02em;
        }
        .sline { width: 60px; height: 5px; background: var(--yellow); margin-top: 14px; margin-bottom: 52px; }

        /* MENU CARD */
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(300px,1fr)); gap: 20px; }
        .mc {
          background: var(--black2); border: 2px solid var(--black4); border-radius: 12px;
          overflow: hidden; transition: all 0.32s cubic-bezier(.4,0,.2,1);
        }
        .mc:hover { border-color: var(--yellow); transform: translateY(-7px); box-shadow: 0 20px 52px rgba(0,0,0,0.65), 0 0 0 1px var(--yellow); }
        .mc-img-wrap { overflow: hidden; position: relative; height: 200px; }
        .mc-img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s, filter 0.3s; filter: brightness(0.88); }
        .mc:hover .mc-img { transform: scale(1.06); filter: brightness(1); }
        .mc-tag {
          position: absolute; top: 12px; left: 12px;
          background: var(--yellow); color: var(--black);
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 10px;
          letter-spacing: 0.15em; text-transform: uppercase; padding: 5px 12px; border-radius: 2px;
        }
        .mc-body { padding: 20px 22px 24px; }
        .mc-title {
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 19px;
          color: var(--yellow); text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 16px;
        }

        /* MENU ROW */
        .mr {
          display: flex; justify-content: space-between; align-items: center;
          padding: 11px 0; border-bottom: 1px solid var(--black4); gap: 12px;
        }
        .mr:last-child { border-bottom: none; }
        .mr-name {
          font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 14px;
          color: var(--white); letter-spacing: 0.01em;
        }
        .mr-price {
          font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--red);
          letter-spacing: 0.04em; white-space: nowrap; flex-shrink: 0;
        }

        /* PIZZA CARDS */
        .pcrow { display: grid; grid-template-columns: repeat(auto-fill,minmax(148px,1fr)); gap: 12px; margin-bottom: 40px; }
        .pcc {
          background: var(--black3); border: 2px solid var(--black4); border-radius: 8px;
          padding: 18px 12px; text-align: center; transition: all 0.25s; cursor: default;
        }
        .pcc:hover { border-color: var(--yellow); transform: translateY(-3px); }
        .pcc .pn { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 12px; color: var(--white); text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 10px; line-height: 1.35; }
        .pcc .pp { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: var(--red); }
        .pcc .pc { font-size: 16px; color: var(--yellow); }

        /* CHEESE BANNER */
        .cbanner {
          background: var(--yellow); border-radius: 10px; padding: 22px 32px;
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px;
          margin-bottom: 40px;
        }
        .cbanner h3 { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: var(--black); letter-spacing: 0.05em; }
        .cbanner p { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 12px; color: var(--black); letter-spacing: 0.06em; margin-top: 4px; }
        .cpill {
          background: var(--black); color: var(--yellow);
          font-family: 'Bebas Neue', sans-serif; font-size: 26px;
          padding: 10px 24px; border-radius: 4px; letter-spacing: 0.05em;
        }

        /* TABLE */
        .tscroll { overflow-x: auto; border-radius: 10px; border: 2px solid var(--black4); }
        table { width: 100%; border-collapse: collapse; font-size: 14px; min-width: 580px; }
        thead th {
          background: var(--yellow); color: var(--black);
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 11px;
          letter-spacing: 0.18em; text-transform: uppercase; padding: 15px 18px; text-align: left; white-space: nowrap;
        }
        thead th:not(:first-child) { text-align: center; }
        tbody tr { border-bottom: 1px solid var(--black4); transition: background 0.2s; }
        tbody tr:last-child { border-bottom: none; }
        tbody tr:hover { background: rgba(255,214,0,0.05); }
        tbody td { padding: 13px 18px; }
        .tn { font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 14px; color: var(--white); text-transform: uppercase; letter-spacing: 0.02em; }
        .td { display: block; font-family: 'Inter', sans-serif; font-size: 11px; color: var(--gray); font-weight: 400; margin-top: 3px; text-transform: none; letter-spacing: 0; }
        tbody td:not(:first-child) { text-align: center; font-family: 'Bebas Neue', sans-serif; font-size: 22px; color: var(--red); letter-spacing: 0.04em; }

        /* EXTRAS */
        .exgrid { display: grid; grid-template-columns: repeat(auto-fill,minmax(240px,1fr)); gap: 20px; }
        .exb { background: var(--black2); border: 2px solid var(--black4); border-radius: 10px; overflow: hidden; transition: border-color 0.25s; }
        .exb:hover { border-color: var(--yellow); }
        .exh { background: var(--black4); padding: 14px 20px; display: flex; align-items: center; gap: 10px; }
        .exh .eicon { font-size: 20px; }
        .exh h4 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 13px; color: var(--yellow); text-transform: uppercase; letter-spacing: 0.1em; }
        .exbody { padding: 8px 20px 16px; }

        /* CONTACT */
        .cgrid { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 20px; margin-top: 52px; }
        .cc { background: var(--black2); border: 2px solid var(--black4); border-radius: 10px; padding: 34px; text-align: center; transition: all 0.3s; }
        .cc:hover { border-color: var(--yellow); transform: translateY(-5px); }
        .cc .ci { font-size: 36px; margin-bottom: 14px; display: block; }
        .cc h4 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--yellow); margin-bottom: 10px; }
        .cc p { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 16px; color: var(--white); line-height: 1.55; }
        .cc a { font-family: 'Bebas Neue', sans-serif; font-size: 34px; color: var(--yellow); text-decoration: none; letter-spacing: 0.06em; }

        /* FOOTER */
        footer {
          background: var(--black); border-top: 3px solid var(--yellow);
          text-align: center; padding: 26px 20px;
          font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 13px;
          color: var(--gray); letter-spacing: 0.06em;
        }
        footer span { color: var(--yellow); }

        /* REVEAL */
        .rv { opacity: 0; transform: translateY(28px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .rv.in { opacity: 1; transform: translateY(0); }

        /* SUBHEADING ROW */
        .sub-heading {
          font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 11px;
          letter-spacing: 0.25em; text-transform: uppercase; color: var(--yellow); margin-bottom: 18px;
        }
      `}</style>

      <RevealObserver />

      {/* NAV */}
      <nav>
        <div className="nav-logo">
          <img src="/images/logo.webp" alt="Dilli Bites logo" width={200} height={89} decoding="async" />
        </div>
        <ul className="nav-links">
          <li><a href="#momos">Momos</a></li>
          <li><a href="#snacks">Snacks</a></li>
          <li><a href="#pizza">Pizza</a></li>
          <li><a href="#extras">More</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">🌶️ &nbsp; Street Food · Fast Food · Momos</div>
        <h1>DILLI<em>BITES</em></h1>
        <div className="hero-line"></div>
        <div className="hero-cta">
          <a href="#momos" className="btn-y">Explore Menu</a>
          <a href="#contact" className="btn-o">Find Us</a>
          <a href="/v2" className="btn-o">Open V2</a>
        </div>
      </section>

      {/* INFO BAR */}
      <div className="info-bar">
        <div className="info-item">📍 &nbsp; Jamo Bazar, In front of Petrol Pump</div>
        <div className="info-item">📞 &nbsp; 72560 66435</div>
        <div className="info-item">🕐 &nbsp; Open Daily</div>
      </div>

      {/* MOMOS */}
      <section id="momos" style={{ background: 'var(--black)' }}>
        <div className="si">
          <div className="slabel">Our Speciality</div>
          <h2 className="stitle">MOMO PARADISE</h2>
          <div className="sline"></div>
          <div className="menu-grid">
            {[
              { src: '/images/steam_momos.webp', alt: 'Steam Momos', tag: 'Steam', title: 'Steam Momos', items: [['Veg Momos', '₹30–50'], ['Paneer Momos', '₹45–80'], ['Chicken Momos', '₹45–80']] },
              { src: '/images/fried_momos.webp', alt: 'Fried Momos', tag: 'Fried', title: 'Fried Momos', items: [['Veg Momos', '₹35–60'], ['Paneer Momos', '₹50–90'], ['Chicken Momos', '₹50–90']] },
              { src: '/images/gravy_momos.webp', alt: 'Gravy Momos', tag: 'Gravy', title: 'Gravy Momos', items: [['Veg Momos', '₹60–100'], ['Paneer Momos', '₹70–120'], ['Chicken Momos', '₹70–120']] },
              { src: '/images/malai_momos.webp', alt: 'Malai Momos', tag: 'Malai', title: 'Malai Momos', items: [['Veg Momos', '₹60–100'], ['Paneer Momos', '₹70–120'], ['Chicken Momos', '₹70–120']] },
              { src: '/images/kurkure_momos.webp', alt: 'Kurkure Momos', tag: 'Kurkure', title: 'Kurkure Momos', items: [['Veg Momos', '₹60–100'], ['Paneer Momos', '₹70–120'], ['Chicken Momos', '₹70–120']] },
            ].map(({ src, alt, tag, title, items }) => (
              <div className="mc rv" key={title}>
                <div className="mc-img-wrap">
                  <img className="mc-img" src={src} alt={alt} width={720} height={480} loading="lazy" decoding="async" />
                  <span className="mc-tag">{tag}</span>
                </div>
                <div className="mc-body">
                  <div className="mc-title">{title}</div>
                  {items.map(([name, price]) => (
                    <div className="mr" key={name}>
                      <span className="mr-name">{name}</span>
                      <span className="mr-price">{price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SNACKS */}
      <section id="snacks" style={{ background: 'var(--black3)' }}>
        <div className="si">
          <div className="slabel">Quick Bites</div>
          <h2 className="stitle">SNACKS &amp; DRINKS</h2>
          <div className="sline"></div>
          <div className="menu-grid">
            <div className="mc rv">
              <div className="mc-img-wrap">
                <img className="mc-img" src="/images/french_fries.webp" alt="French Fries" width={720} height={480} loading="lazy" decoding="async" />
                <span className="mc-tag">Crispy</span>
              </div>
              <div className="mc-body">
                <div className="mc-title">French Fries</div>
                <div className="mr"><span className="mr-name">Salted Fries</span><span className="mr-price">₹30</span></div>
                <div className="mr"><span className="mr-name">Peri-Peri Fries</span><span className="mr-price">₹40</span></div>
              </div>
            </div>
            <div className="mc rv">
              <div className="mc-img-wrap">
                <img className="mc-img" src="/images/burger.webp" alt="Burger" width={720} height={480} loading="lazy" decoding="async" />
                <span className="mc-tag">Burgers</span>
              </div>
              <div className="mc-body">
                <div className="mc-title">Burgers</div>
                <div className="mr"><span className="mr-name">Plain Burger</span><span className="mr-price">₹50</span></div>
                <div className="mr"><span className="mr-name">Cheese Burger</span><span className="mr-price">₹60</span></div>
                <div className="mr"><span className="mr-name">Chicken Burger</span><span className="mr-price">₹80</span></div>
              </div>
            </div>
            <div className="mc rv">
              <div className="mc-img-wrap">
                <img className="mc-img" src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=640&q=80" alt="Cold Coffee" />
                <span className="mc-tag">Drinks</span>
              </div>
              <div className="mc-body">
                <div className="mc-title">Cold Coffee</div>
                <div className="mr"><span className="mr-name">Cold Coffee</span><span className="mr-price">₹80</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXTRAS */}
      <section id="extras" style={{ background: 'var(--black3)' }}>
        <div className="si">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="cbanner rv" style={{ background: 'var(--yellow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <img src="/images/stuff_gralic_bread.webp" alt="Stuff Garlic Bread" width={72} height={72} loading="lazy" decoding="async" style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '36px', color: 'var(--black)', letterSpacing: '0.05em' }}>STUFF GARLIC BREAD</h3>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '13px', color: 'var(--black)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>Crispy Garlic Bread · Stuffed &amp; Toasted to Perfection</p>
                </div>
              </div>
              <div className="cpill" style={{ fontSize: '38px', padding: '14px 32px' }}>₹149</div>
            </div>
            <div className="cbanner rv" style={{ background: 'var(--black4)', border: '2px solid var(--yellow)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <img src="/images/choco_lava.webp" alt="Choco Lava" width={72} height={72} loading="lazy" decoding="async" style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: '36px', color: 'var(--yellow)', letterSpacing: '0.05em' }}>CHOCO LAVA</h3>
                  <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '13px', color: 'var(--gray)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '6px' }}>Warm Molten Chocolate · Irresistible Dessert</p>
                </div>
              </div>
              <div className="cpill" style={{ fontSize: '38px', padding: '14px 32px', background: 'var(--yellow)', color: 'var(--black)' }}>₹99</div>
            </div>
          </div>
        </div>
      </section>

      {/* PIZZA */}
      <section id="pizza" style={{ background: 'var(--black2)' }}>
        <div className="si">
          <div className="slabel">Pizza Mania</div>
          <h2 className="stitle">PIZZAS</h2>
          <div className="sline"></div>

          <p className="sub-heading">🍕 Veg Single Topping — ₹99 Each</p>
          <div className="pcrow">
            {['Onion', 'Capsicum', 'Tomato', 'Corn'].map((t) => (
              <div className="pcc rv" key={t}><div className="pn">Pizza Mania<br />{t}</div><div className="pp"><span className="pc">₹</span>99</div></div>
            ))}
          </div>

          <p className="sub-heading" style={{ marginTop: '8px' }}>🍕 Veg Double Topping — ₹120 Each</p>
          <div className="pcrow">
            {[['Onion', 'Paneer'], ['Onion', 'Capsicum'], ['Capsicum', 'Tomato'], ['Onion', 'Corn']].map(([a, b]) => (
              <div className="pcc rv" key={`${a}-${b}`}><div className="pn">{a}<br />{b}</div><div className="pp"><span className="pc">₹</span>120</div></div>
            ))}
          </div>

          <div className="cbanner rv">
            <div>
              <h3>🧀 CHEESE CRUST AVAILABLE</h3>
              <p>EXTRA TOPPINGS / EXTRA CHEESE / CHEESY DIP AVAILABLE</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div className="cpill">CRUST +₹100</div>
              <div className="cpill" style={{ background: 'var(--black3)', color: 'var(--white)' }}>ADD-ONS ₹80–90</div>
            </div>
          </div>

          <p className="sub-heading">🍕 Signature Pizzas — All Sizes</p>
          <div className="tscroll rv">
            <table>
              <thead>
                <tr><th>Pizza</th><th>Regular</th><th>Medium</th><th>Large</th><th>XL</th></tr>
              </thead>
              <tbody>
                {[
                  ['Margherita', 'Single Cheese', 120, 169, 259, 349],
                  ['Capsicum India', 'Onion, Capsicum, Tomato, Mushroom', 149, 220, 299, 399],
                  ['Paneer Spicy', 'Capsicum, Paneer, Red Paprika', 149, 220, 299, 399],
                  ['Veggie Paradise', 'Golden Corn, Black Olives, Capsicum & Red Paprika', 149, 220, 299, 399],
                  ['Paneer Makhani', 'Paneer, Capsicum, Makhani Sauce', 149, 220, 299, 399],
                  ['Deluxe Veggie', 'Onion, Capsicum, Grilled Mushroom, Golden Corn & Paneer', 149, 220, 299, 399],
                  ['Kadhai Paneer', 'Paneer Chunks, Flavour Spicy Kadhai', 149, 220, 299, 399],
                  ['Loaded Veg.', 'Tomato, Mushroom & Jalapeno', 149, 220, 299, 399],
                  ['Veggie Feast', 'Harbed Onion, Green Capsicum, Sweet Corn', 149, 220, 299, 399],
                  ['Spiced Paneer', 'Spiced Paneer, Onion & Tomato', 149, 220, 299, 399],
                  ['Veggie Lovers', 'Onion, Herbed Onion, Green Capsicum & Red Paprika', 149, 220, 299, 399],
                  ['Double Panner Supreme', 'Special Paneer, Herbed Onion, Green Capsicum & Red Paprika', 159, 229, 310, 399],
                  ['Mexican Green Wave', 'Onion, Capsicum, Tomato & Jalapeno, Maximum Herbs', 159, 229, 310, 420],
                  ['Indi Tandoori Paneer', 'Paneer Tikka, Capsicum, Red Paprika, Makhani Sauce', 159, 229, 310, 420],
                  ['Gormet Pizza', 'Golden Corn, Jalapeno, Black Olive', 159, 229, 310, 420],
                  ['Extravaganza', 'Onion, Capsicum, Tomato, Golden Corn, Mushroom', 159, 229, 310, 420],
                  ['Country Special', 'Onion, Capsicum, Tomato, Golden Corn, Mushroom, Jalapeno, Black Olive', 169, 239, 350, 449],
                  ['Chicago Slice Pasta Special', 'Capsicum, Paneer, Red Paprika, Corn, Onion', 169, 269, 399, 499],
                ].map(([name, desc, r, m, l, xl]) => (
                  <tr key={name}>
                    <td><span className="tn">{name}</span><span className="td">{desc}</span></td>
                    <td>₹{r}</td><td>₹{m}</td><td>₹{l}</td><td>₹{xl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--black)' }}>
        <div className="si">
          <div className="slabel">Come Visit Us</div>
          <h2 className="stitle">FIND DILLI BITES</h2>
          <div className="sline"></div>
          <div className="cgrid">
            <div className="cc rv"><span className="ci">📍</span><h4>Location</h4><p>Jamo Bazar,<br />In front of Petrol Pump</p></div>
            <div className="cc rv"><span className="ci">📞</span><h4>Call Us Now</h4><a href="tel:7256066435">72560 66435</a></div>
            <div className="cc rv"><span className="ci">🕐</span><h4>Hours</h4><p>Open Daily<br />All Day</p></div>
          </div>
        </div>
      </section>

      <footer>
        © 2026 <span>DILLI BITES</span> &nbsp;|&nbsp; Made with ❤️ in India &nbsp;|&nbsp;{' '}
        <a href="/v2" style={{ color: 'var(--yellow)', textDecoration: 'none' }}>Open V2</a>
      </footer>
    </>
  )
}
