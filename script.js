// ====== Data ======
const PRODUCTS = [
    {id:1, name:"Ultrabook Pro 14", price:79990, rating:4.6, category:"electronics", images:["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop"], desc:"Featherlight performance laptop with all‑day battery."},
    {id:2, name:"NoiseCancel Headphones X", price:12990, rating:4.5, category:"electronics", images:["https://images.unsplash.com/photo-1518441902110-266f3e76cbb4?q=80&w=1200&auto=format&fit=crop","https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop"], desc:"Immersive audio with adaptive noise cancellation."},
    {id:3, name:"Athleisure Hoodie", price:2499, rating:4.3, category:"fashion", images:["https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=1200&auto=format&fit=crop"], desc:"Cozy fleece hoodie for everyday comfort."},
    {id:4, name:"Ergo Office Chair", price:14990, rating:4.7, category:"home", images:["https://images.unsplash.com/photo-1582582621958-d98f0b3c5b23?q=80&w=1200&auto=format&fit=crop"], desc:"Lumbar support and breathable mesh for long sessions."},
    {id:5, name:"Smartwatch Fit+", price:6990, rating:4.2, category:"fitness", images:["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1200&auto=format&fit=crop"], desc:"Track workouts, sleep, SpO₂, and more."},
    {id:6, name:"4K Action Cam", price:15990, rating:4.4, category:"electronics", images:["https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1200&auto=format&fit=crop"], desc:"Stabilized 4K footage in the toughest conditions."},
    {id:7, name:"Minimal Sneakers", price:3990, rating:4.1, category:"fashion", images:["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"], desc:"Clean lines, cloudlike comfort."},
    {id:8, name:"Ceramic Cookware Set", price:9990, rating:4.5, category:"home", images:["https://images.unsplash.com/photo-1556912173-3bb406ef7e77?q=80&w=1200&auto=format&fit=crop"], desc:"Non‑stick, non‑toxic, and oven‑safe."},
    {id:9, name:"Yoga Mat Pro", price:1999, rating:4.6, category:"fitness", images:["https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=1200&auto=format&fit=crop"], desc:"Grippy, cushioned mat for every pose."},
    {id:10, name:"LED Desk Lamp", price:1890, rating:4.2, category:"home", images:["https://images.unsplash.com/photo-1493666438817-866a91353ca9?q=80&w=1200&auto=format&fit=crop"], desc:"Adjustable brightness and color temperature."},
    {id:11, name:"Performance Tee", price:1290, rating:4.0, category:"fashion", images:["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop"], desc:"Sweat‑wicking, breathable fabric."},
    {id:12, name:"Adjustable Dumbbells", price:15990, rating:4.4, category:"fitness", images:["https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1200&auto=format&fit=crop"], desc:"Space‑saving weights for home gyms."}
  ];
  
  // ====== Utils ======
  const $ = s => document.querySelector(s);
  const $$ = s => document.querySelectorAll(s);
  const fmt = n => `₹${n.toLocaleString("en-IN")}`;
  const getParam = (k) => new URLSearchParams(location.search).get(k);
  const save = (k,v) => localStorage.setItem(k, JSON.stringify(v));
  const load = (k, d=[]) => { try{ return JSON.parse(localStorage.getItem(k)) ?? d } catch { return d } };
  const toast = (msg) => {
    const el = $("#toast"); el.textContent = msg; el.classList.add("show");
    setTimeout(()=> el.classList.remove("show"), 1800);
  };
  
  // ====== Cart ======
  const CART_KEY = "novashop_cart";
  const getCart = () => load(CART_KEY);
  const setCart = (c) => { save(CART_KEY, c); updateCartCount(); }
  const updateCartCount = () => {
    const count = getCart().reduce((a,i)=>a+i.qty,0);
    const el = $("#cart-count"); if(el) el.textContent = String(count);
  }
  const addToCart = (id, qty=1) => {
    const cart = getCart();
    const item = cart.find(i=>i.id===id);
    if(item){ item.qty += qty } else { cart.push({id, qty}); }
    setCart(cart); toast("Added to cart ✓");
  }
  const removeFromCart = (id) => setCart(getCart().filter(i=>i.id!==id));
  const setQty = (id, qty) => {
    const cart = getCart().map(i => i.id===id ? {...i, qty: Math.max(1, qty)} : i);
    setCart(cart);
  }
  
  // ====== Rendering ======
  const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5-Math.round(r));
  
  const card = (p) => `
    <article class="product-card">
      <a href="product.html?id=${p.id}" class="product-thumb" aria-label="${p.name}">
        <img src="${p.images[0]}" alt="${p.name}" loading="lazy" />
      </a>
      <div class="product-info">
        <a href="product.html?id=${p.id}" class="title">${p.name}</a>
        <div class="muted">${p.category[0].toUpperCase() + p.category.slice(1)}</div>
        <div class="stars" aria-label="Rating ${p.rating}">${stars(p.rating)}</div>
        <div class="price">${fmt(p.price)}</div>
        <button class="btn add-btn" data-add="${p.id}">Add to Cart</button>
      </div>
      ${p.rating >= 4.6 ? '<span class="badge">Top Rated</span>' : ''}
    </article>
  `;
  
  const renderGrid = (root, items) => { root.innerHTML = items.map(card).join(""); };
  
  // ====== Pages ======
  function initHome(){
    // Featured: pick 8 popular
    const featured = PRODUCTS.slice(0,8);
    renderGrid($("#featured"), featured);
  }
  
  function filterAndSort() {
    const q = (getParam("q") || "").toLowerCase().trim();
    const catParam = getParam("category") || "";
    const category = $("#filter-category")?.value || catParam || "";
    const minPrice = Number($("#price-min")?.value || 0);
    const minRating = Number($("#filter-rating")?.value || 0);
    const sort = $("#sort")?.value || "popular";
  
    let list = PRODUCTS.filter(p => 
      (category ? p.category === category : true) &&
      (p.price >= minPrice) &&
      (p.rating >= minRating) &&
      (q ? p.name.toLowerCase().includes(q) : true)
    );
  
    switch (sort){
      case "price-asc": list.sort((a,b)=>a.price-b.price); break;
      case "price-desc": list.sort((a,b)=>b.price-a.price); break;
      case "rating": list.sort((a,b)=>b.rating-a.rating); break;
      default: /* popular */ break;
    }
    return {list, q: q || undefined, category: category || undefined};
  }
  
  function initList(){
    const grid = $("#product-grid");
    const {list, q, category} = filterAndSort();
    renderGrid(grid, list);
    $("#result-count").textContent = `${list.length} result${list.length!==1?'s':''}${q?` for "${q}"`:''}${category?` in ${category}`:''}`;
    // Wire filters
    const priceMin = $("#price-min");
    if(priceMin){ $("#price-min-val").textContent = priceMin.value; priceMin.addEventListener("input", e => { $("#price-min-val").textContent = e.target.value; renderList(); }); }
    $("#filter-category")?.addEventListener("change", renderList);
    $("#filter-rating")?.addEventListener("change", renderList);
    $("#sort")?.addEventListener("change", renderList);
    $("#clear-filters")?.addEventListener("click", () => {
      $("#filter-category").value = ""; $("#filter-rating").value="0"; priceMin.value = 0; $("#price-min-val").textContent = "0"; $("#sort").value="popular"; renderList();
      history.replaceState(null,"", "products.html");
    });
  
    function renderList(){ 
      const {list} = filterAndSort(); 
      renderGrid(grid, list);
    }
  }
  
  function initDetail(){
    const id = Number(getParam("id"));
    const p = PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
    $("#crumb-name").textContent = p.name;
    const gallery = `
      <div class="p-gallery card">
        <div class="p-gallery-main"><img id="main-img" src="${p.images[0]}" alt="${p.name}" /></div>
        <div class="p-gallery-thumbs">
          ${p.images.map((src,i)=>`<img src="${src}" class="${i===0?'active':''}" data-src="${src}" alt="thumb ${i+1}">`).join("")}
        </div>
      </div>`;
    const info = `
      <div class="p-info card">
        <div class="title">${p.name}</div>
        <div class="stars">${stars(p.rating)} <span class="muted">(${p.rating})</span></div>
        <div class="price">${fmt(p.price)}</div>
        <p>${p.desc}</p>
        <div class="actions" style="display:flex; gap:10px; align-items:center; margin-top:10px">
          <div class="qty">
            <button id="dec">−</button>
            <input id="qty" type="number" min="1" value="1">
            <button id="inc">+</button>
          </div>
          <button id="add-detail" class="btn primary">Add to Cart</button>
        </div>
      </div>`;
    $("#product-detail").innerHTML = `<div>${gallery}</div><div>${info}</div>`;
  
    // Thumbs
    $$(".p-gallery-thumbs img").forEach(img=> img.addEventListener("click", e => {
      $("#main-img").src = img.dataset.src;
      $$(".p-gallery-thumbs img").forEach(t=>t.classList.remove("active"));
      img.classList.add("active");
    }));
  
    // Qty and add
    const qty = $("#qty");
    $("#inc").addEventListener("click", ()=> qty.value = Number(qty.value)+1);
    $("#dec").addEventListener("click", ()=> qty.value = Math.max(1, Number(qty.value)-1));
    $("#add-detail").addEventListener("click", ()=> addToCart(p.id, Number(qty.value)));
  
    // Related
    const rel = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
    renderGrid($("#related"), rel);
    $("#related-link").href = `products.html?category=${p.category}`;
  }
  
  function initCart(){
    const root = $("#cart-items");
    const render = () => {
      const cart = getCart();
      if(!cart.length){ root.innerHTML = '<p class="muted">Your cart is empty.</p>'; $("#subtotal").textContent = fmt(0); $("#total").textContent = fmt(0); return; }
      root.innerHTML = cart.map(item => {
        const p = PRODUCTS.find(x=>x.id===item.id);
        return `
          <div class="cart-item">
            <img src="${p.images[0]}" width="96" height="72" alt="${p.name}">
            <div>
              <div class="title">${p.name}</div>
              <div class="muted small">${p.category}</div>
            </div>
            <div>
              <div class="qty">
                <button data-dec="${p.id}">−</button>
                <input value="${item.qty}" min="1" data-id="${p.id}" />
                <button data-inc="${p.id}">+</button>
              </div>
            </div>
            <div style="text-align:right">
              <div>${fmt(p.price*item.qty)}</div>
              <button class="remove" data-remove="${p.id}">Remove</button>
            </div>
          </div>
        `;
      }).join("");
  
      // totals
      const subtotal = cart.reduce((a,i)=>{
        const p = PRODUCTS.find(x=>x.id===i.id);
        return a + p.price * i.qty;
      },0);
      $("#subtotal").textContent = fmt(subtotal);
      $("#total").textContent = fmt(subtotal);
    };
    render();
  
    root.addEventListener("click", (e)=>{
      const t = e.target;
      if(t.dataset.inc){ setQty(Number(t.dataset.inc), (getCart().find(x=>x.id==t.dataset.inc).qty+1)); render(); }
      if(t.dataset.dec){ setQty(Number(t.dataset.dec), (getCart().find(x=>x.id==t.dataset.dec).qty-1)); render(); }
      if(t.dataset.remove){ removeFromCart(Number(t.dataset.remove)); render(); toast("Removed from cart"); }
    });
    root.addEventListener("change", (e)=>{
      const id = Number(e.target.dataset.id); if(!id) return;
      setQty(id, Number(e.target.value)); render();
    });
  }
  
  function initCheckout(){
    const items = getCart().map(i => ({...i, product: PRODUCTS.find(p=>p.id===i.id)}));
    if(!items.length){ $("#order-items").innerHTML = '<p class="muted">No items.</p>'; $("#order-total").textContent = fmt(0); }
    else{
      $("#order-items").innerHTML = items.map(i => `
        <div class="summary-row"><span>${i.product.name} × ${i.qty}</span><strong>${fmt(i.product.price*i.qty)}</strong></div>
      `).join("");
      const total = items.reduce((a,i)=>a + i.product.price*i.qty, 0);
      $("#order-total").textContent = fmt(total);
    }
    $("#checkout-form").addEventListener("submit", (e)=>{
      e.preventDefault();
      toast("Order placed! 🎉 (demo)");
      save("novashop_last_order", getCart());
      setCart([]);
      setTimeout(()=> location.href = "index.html", 600);
    });
  }
  
  // ====== Global UI: nav, burger, dropdowns, slider, modal, scrollTop ======
  function initGlobal(){
    updateCartCount();
    // year
    const y = new Date().getFullYear();
    const elY = document.getElementById("year"); if(elY) elY.textContent = y;
  
    // Add-to-cart buttons (event delegation)
    document.body.addEventListener("click", (e)=>{
      const addId = e.target.closest("[data-add]")?.dataset.add;
      if(addId) addToCart(Number(addId));
    });
  
    // Burger
    const burger = document.getElementById("burger");
    const navLinks = document.querySelector(".nav-links");
    if(burger){
      burger.addEventListener("click", ()=>{
        const shown = navLinks.classList.toggle("show");
        burger.setAttribute("aria-expanded", shown ? "true" : "false");
      });
    }
  
    // Dropdown (categories)
    const ddBtn = document.querySelector(".nav-dropdown[data-dropdown='categories']");
    const dd = document.getElementById("dropdown-categories");
    if(ddBtn && dd){
      ddBtn.addEventListener("click", (e)=>{
        e.preventDefault();
        const show = dd.style.display !== "flex";
        dd.style.display = show ? "flex" : "none";
        dd.style.top = (ddBtn.getBoundingClientRect().bottom + window.scrollY + 8) + "px";
        dd.style.left = (ddBtn.getBoundingClientRect().left) + "px";
      });
      document.addEventListener("click", (e)=>{
        if(!dd.contains(e.target) && e.target !== ddBtn) dd.style.display="none";
      });
    }
  
    // Slider
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    let idx = 0;
    function go(i){
      idx = i;
      slides.forEach((s,k)=> s.classList.toggle("active", k===i));
      dots.forEach((d,k)=> d.classList.toggle("active", k===i));
      if(slides[i]) slides[i].parentElement.style.transform = `translateX(-${i*100}%)`;
    }
    const slidesWrap = document.querySelector(".slides");
    if(slidesWrap){ slidesWrap.style.display="flex"; slidesWrap.style.width = `${slides.length*100}%`; slides.forEach(s=>{ s.style.width = (100/slides.length) + "%"; }); }
    dots.forEach((d,i)=> d.addEventListener("click", ()=> go(i)));
    if(slides.length){ setInterval(()=> go((idx+1)%slides.length), 4000); }
  
    // Modal
    const loginBtn = document.getElementById("open-login");
    const modal = document.getElementById("login-modal");
    const closeBtn = document.querySelector(".modal-close");
    const tabs = document.querySelectorAll(".tab");
    const panels = document.querySelectorAll(".tab-panel");
    loginBtn?.addEventListener("click", ()=> modal.showModal());
    closeBtn?.addEventListener("click", ()=> modal.close());
    tabs.forEach(t => t.addEventListener("click", ()=>{
      tabs.forEach(x=>x.classList.remove("active")); t.classList.add("active");
      panels.forEach(p=> p.classList.toggle("active", p.id.endsWith(t.dataset.tab)));
    }));
  
    // Scroll top
    const sTop = document.getElementById("scrollTop");
    window.addEventListener("scroll", ()=>{
      if(window.scrollY > 400) sTop.classList.add("show"); else sTop.classList.remove("show");
    });
    sTop?.addEventListener("click", ()=> window.scrollTo({top:0,behavior:"smooth"}));
  }
  
  // ====== Router by data-page ======
  document.addEventListener("DOMContentLoaded", () => {
    initGlobal();
    const page = document.querySelector(".page")?.dataset.page;
    switch(page){
      case "home": initHome(); break;
      case "list": initList(); break;
      case "detail": initDetail(); break;
      case "cart": initCart(); break;
      case "checkout": initCheckout(); break;
    }
  });