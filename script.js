/* ==========================================================
   SHOPVERSE — Vanilla JavaScript
   Handles: mock data, search, category filtering, cart,
   wishlist, product modal, localStorage persistence.
   No frameworks. No backend. No fake APIs.
   ========================================================== */

/* ---------------------------------------------------------
   1. MOCK PRODUCT DATA
   --------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: "Sienna Structured Handbag",
    category: "Fashion",
    price: 2499,
    oldPrice: 3199,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    description: "A structured top-handle handbag in premium vegan leather, finished with brushed gold hardware. Fits a 13\" laptop with room to spare."
  },
  {
    id: 2,
    name: "Court Classic White Sneakers",
    category: "Fashion",
    price: 3299,
    oldPrice: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=600&fit=crop",
    description: "Minimal leather sneakers with a cushioned sole built for all-day wear. Pairs with everything from denim to tailoring."
  },
  {
    id: 3,
    name: "Aria Wireless Headphones",
    category: "Electronics",
    price: 4999,
    oldPrice: 6499,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    description: "Over-ear wireless headphones with active noise cancellation and 30-hour battery life. Comes with a hard travel case."
  },
  {
    id: 4,
    name: "Nordic Lounge Chair",
    category: "Home & Living",
    price: 8999,
    oldPrice: null,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&h=600&fit=crop",
    description: "A low-slung lounge chair in natural oak and boucle upholstery. Solid wood frame, built to last generations."
  },
  {
    id: 5,
    name: "Amber Glow Face Serum",
    category: "Beauty",
    price: 899,
    oldPrice: 1199,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
    description: "A lightweight vitamin C serum that brightens and evens skin tone. Dermatologically tested, fragrance-free."
  },
  {
    id: 6,
    name: "Everyday Canvas Tote",
    category: "Fashion",
    price: 1299,
    oldPrice: null,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=600&h=600&fit=crop",
    description: "A durable canvas tote with reinforced stitching and an interior pocket. Roomy enough for a full day out."
  },
  {
    id: 7,
    name: "Pulse Fitness Smartwatch",
    category: "Electronics",
    price: 5499,
    oldPrice: 6999,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
    description: "Track heart rate, sleep and workouts with a week-long battery. Water-resistant to 50 metres."
  },
  {
    id: 8,
    name: "Willow Ceramic Vase Set",
    category: "Home & Living",
    price: 1699,
    oldPrice: null,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop",
    description: "A set of two hand-glazed ceramic vases in soft neutral tones. Each piece is subtly one-of-a-kind."
  },
  {
    id: 9,
    name: "Velvet Matte Lipstick",
    category: "Beauty",
    price: 649,
    oldPrice: null,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600&h=600&fit=crop",
    description: "A long-wear matte lipstick with a soft-focus finish. Formulated with jojoba oil so it never feels drying."
  },
  {
    id: 10,
    name: "Slate Leather Belt",
    category: "Fashion",
    price: 799,
    oldPrice: 999,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    description: "Full-grain leather belt with a brushed steel buckle. Cut generously so it can be trimmed to size."
  },
  {
    id: 11,
    name: "Halo Desk Lamp",
    category: "Home & Living",
    price: 2199,
    oldPrice: null,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&h=600&fit=crop",
    description: "A dimmable LED desk lamp with a flicker-free warm-to-cool range and a weighted marble base."
  },
  {
    id: 12,
    name: "Portable Bluetooth Speaker",
    category: "Electronics",
    price: 2899,
    oldPrice: 3499,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
    description: "Splash-resistant speaker with 12 hours of playback and surprisingly deep bass for its size."
  }
];

/* ---------------------------------------------------------
   2. STATE — loaded from localStorage, or defaults
   --------------------------------------------------------- */
let cart = JSON.parse(localStorage.getItem("shopverse_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("shopverse_wishlist")) || [];
let activeCategory = "All";
let activeSearch = "";

function saveCart() {
  localStorage.setItem("shopverse_cart", JSON.stringify(cart));
}
function saveWishlist() {
  localStorage.setItem("shopverse_wishlist", JSON.stringify(wishlist));
}

/* ---------------------------------------------------------
   3. RENDER HELPERS
   --------------------------------------------------------- */
function formatPrice(n) {
  return "₹" + n.toLocaleString("en-IN");
}

function starString(rating) {
  const full = Math.round(rating);
  return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
}

function productCardHTML(p) {
  const isWishlisted = wishlist.includes(p.id);
  return `
    <article class="product-card" data-id="${p.id}">
      <div class="product-media">
        ${p.oldPrice ? `<span class="discount-tag">SALE</span>` : ""}
        <button class="wishlist-btn ${isWishlisted ? "active" : ""}" data-wishlist="${p.id}" aria-label="Toggle wishlist">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
        </button>
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-info">
        <div class="product-cat">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-rating"><span class="stars">${starString(p.rating)}</span> ${p.rating}</div>
        <div class="product-price-row">
          <div class="product-price">
            <span class="price-now">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ""}
          </div>
          <button class="add-cart-btn" data-add="${p.id}" aria-label="Add to cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </article>
  `;
}

function getFilteredProducts() {
  return PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const q = activeSearch.trim().toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;
  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <h3>No products found</h3>
        <p>Try a different search term or category.</p>
      </div>`;
    return;
  }
  grid.innerHTML = filtered.map(productCardHTML).join("");
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? "flex" : "none";
}

function updateWishlistBadge() {
  const badge = document.getElementById("wishlistBadge");
  if (!badge) return;
  badge.textContent = wishlist.length;
  badge.style.display = wishlist.length > 0 ? "flex" : "none";
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.querySelector(".toast-text").textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ---------------------------------------------------------
   4. CART LOGIC
   --------------------------------------------------------- */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  showToast(`${product.name} added to cart`);
}

/* ---------------------------------------------------------
   5. WISHLIST LOGIC
   --------------------------------------------------------- */
function toggleWishlist(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const index = wishlist.indexOf(id);
  if (index === -1) {
    wishlist.push(id);
    showToast(`${product.name} added to wishlist`);
  } else {
    wishlist.splice(index, 1);
    showToast(`${product.name} removed from wishlist`);
  }
  saveWishlist();
  updateWishlistBadge();
  document.querySelectorAll(`[data-wishlist="${id}"]`).forEach(btn => {
    btn.classList.toggle("active", wishlist.includes(id));
  });
  const modalBtn = document.getElementById("modalWishlistBtn");
  if (modalBtn && Number(modalBtn.dataset.id) === id) {
    modalBtn.classList.toggle("active", wishlist.includes(id));
  }
}

/* ---------------------------------------------------------
   6. PRODUCT MODAL
   --------------------------------------------------------- */
function openProductModal(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  const overlay = document.getElementById("productModal");
  if (!overlay) return;

  document.getElementById("modalImage").src = product.image;
  document.getElementById("modalImage").alt = product.name;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalRating").innerHTML = `<span class="stars">${starString(product.rating)}</span> ${product.rating} rating`;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalPrice").textContent = formatPrice(product.price);

  const addBtn = document.getElementById("modalAddBtn");
  addBtn.dataset.id = product.id;

  const wishBtn = document.getElementById("modalWishlistBtn");
  wishBtn.dataset.id = product.id;
  wishBtn.classList.toggle("active", wishlist.includes(product.id));

  overlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  const overlay = document.getElementById("productModal");
  if (!overlay) return;
  overlay.classList.remove("show");
  document.body.style.overflow = "";
}

/* ---------------------------------------------------------
   7. EVENT WIRING (Home page)
   --------------------------------------------------------- */
function initHomePage() {
  const grid = document.getElementById("productGrid");
  if (!grid) return; // not on home page

  renderProducts();
  updateCartBadge();
  updateWishlistBadge();

  // Search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      activeSearch = e.target.value;
      renderProducts();
    });
  }

  // Category chips (filter bar)
  document.querySelectorAll(".chip[data-category]").forEach(chip => {
    chip.addEventListener("click", () => {
      activeCategory = chip.dataset.category;
      document.querySelectorAll(".chip[data-category]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderProducts();
      document.getElementById("newArrivals")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Category cards (hero categories section) also filter + scroll
  document.querySelectorAll("[data-category-card]").forEach(card => {
    card.addEventListener("click", () => {
      activeCategory = card.dataset.categoryCard;
      document.querySelectorAll(".chip[data-category]").forEach(c => {
        c.classList.toggle("active", c.dataset.category === activeCategory);
      });
      renderProducts();
      document.getElementById("newArrivals")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Delegated clicks on the product grid: add-to-cart, wishlist, open modal
  grid.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add]");
    const wishBtn = e.target.closest("[data-wishlist]");
    const card = e.target.closest(".product-card");

    if (addBtn) {
      e.stopPropagation();
      addToCart(Number(addBtn.dataset.add));
      addBtn.classList.add("just-added");
      setTimeout(() => addBtn.classList.remove("just-added"), 600);
      return;
    }
    if (wishBtn) {
      e.stopPropagation();
      toggleWishlist(Number(wishBtn.dataset.wishlist));
      return;
    }
    if (card) {
      openProductModal(Number(card.dataset.id));
    }
  });

  // Modal controls
  document.getElementById("modalClose")?.addEventListener("click", closeProductModal);
  document.getElementById("productModal")?.addEventListener("click", (e) => {
    if (e.target.id === "productModal") closeProductModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeProductModal();
  });
  document.getElementById("modalAddBtn")?.addEventListener("click", (e) => {
    addToCart(Number(e.currentTarget.dataset.id));
  });
  document.getElementById("modalWishlistBtn")?.addEventListener("click", (e) => {
    toggleWishlist(Number(e.currentTarget.dataset.id));
  });

  // Mobile nav toggle
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.querySelector(".nav-links");
  mobileToggle?.addEventListener("click", () => {
    navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  });
}

/* ---------------------------------------------------------
   8. AUTH VALIDATION (Login / Signup)
   --------------------------------------------------------- */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(inputId, errorId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(errorId);
  if (!input || !error) return;
  if (message) {
    input.classList.add("error");
    error.textContent = message;
    error.classList.add("show");
  } else {
    input.classList.remove("error");
    error.classList.remove("show");
  }
}

function initLoginPage() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;
    let valid = true;

    if (!email) {
      setFieldError("loginEmail", "loginEmailError", "Email is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setFieldError("loginEmail", "loginEmailError", "Enter a valid email address.");
      valid = false;
    } else {
      setFieldError("loginEmail", "loginEmailError", "");
    }

    if (!password) {
      setFieldError("loginPassword", "loginPasswordError", "Password is required.");
      valid = false;
    } else {
      setFieldError("loginPassword", "loginPasswordError", "");
    }

    if (!valid) return;

    // Simulated login — no backend. Store mock session in localStorage.
    const mockUser = JSON.parse(localStorage.getItem("shopverse_user"));
    localStorage.setItem("shopverse_session", JSON.stringify({
      email,
      loggedInAt: new Date().toISOString()
    }));

    showToast("Signed in successfully");
    setTimeout(() => { window.location.href = "index.html"; }, 900);
  });
}

function initSignupPage() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirm = document.getElementById("signupConfirm").value;
    let valid = true;

    if (!name) {
      setFieldError("signupName", "signupNameError", "Full name is required.");
      valid = false;
    } else {
      setFieldError("signupName", "signupNameError", "");
    }

    if (!email) {
      setFieldError("signupEmail", "signupEmailError", "Email is required.");
      valid = false;
    } else if (!isValidEmail(email)) {
      setFieldError("signupEmail", "signupEmailError", "Enter a valid email address.");
      valid = false;
    } else {
      setFieldError("signupEmail", "signupEmailError", "");
    }

    if (!password) {
      setFieldError("signupPassword", "signupPasswordError", "Password is required.");
      valid = false;
    } else {
      setFieldError("signupPassword", "signupPasswordError", "");
    }

    if (!confirm) {
      setFieldError("signupConfirm", "signupConfirmError", "Please confirm your password.");
      valid = false;
    } else if (password && confirm !== password) {
      setFieldError("signupConfirm", "signupConfirmError", "Passwords do not match.");
      valid = false;
    } else {
      setFieldError("signupConfirm", "signupConfirmError", "");
    }

    if (!valid) return;

    // Simulated sign-up — mock user stored in localStorage, no backend.
    localStorage.setItem("shopverse_user", JSON.stringify({ name, email }));

    document.getElementById("signupFormWrap").style.display = "none";
    document.getElementById("signupSuccess").classList.add("show");
  });
}

/* ---------------------------------------------------------
   9. INIT
   --------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initLoginPage();
  initSignupPage();
});