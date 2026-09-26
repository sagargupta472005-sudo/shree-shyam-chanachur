/* ═══════════════════════════════════════════════════════════
   SHREE SHYAM CHANACHUR — script.js
   Premium interactions, AI Chatbot, and Order logic.
   ═══════════════════════════════════════════════════════════ */

/* ─── BUSINESS CONFIGURATION ─── */
const BUSINESS = {
  name: 'Shree Shyam Chanachur',
  tagline: 'Har Mauke Ka Swaad',
  established: 1990,
  phone: '+916299401013',
  whatsapp: '916299401013',
  address: 'Mango Chowk, Near Bank of Baroda, Beside Baba Furniture, Kumar Basti, Mango, Jamshedpur, Jharkhand – 831012',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mango%20Chowk%20Jamshedpur%20831012',
  hours: {
    monday:    { open: '10:00', close: '22:30', label: 'Mon' },
    tuesday:   { open: '10:00', close: '22:30', label: 'Tue' },
    wednesday: { open: '10:00', close: '22:30', label: 'Wed' },
    thursday:  { open: '10:00', close: '22:30', label: 'Thu' },
    friday:    { open: '10:00', close: '22:30', label: 'Fri' },
    saturday:  { open: '10:00', close: '22:30', label: 'Sat' },
    sunday:    { open: '10:00', close: '22:30', label: 'Sun' }
  }
};

/* ─── PRODUCTS DATA ─── */
const PRODUCTS = [
  {
    id: 'classic',
    name: 'Classic Chanachur',
    tagline: 'Fresh & Crispy',
    description: 'The signature crunchy blend for every occasion. A timeless combination of sev, peanuts, fried lentils and spices.',
    sizes: [
      { label: '100g', price: '\u20b930' },
      { label: '250g', price: '\u20b965' },
      { label: '500g', price: '\u20b9120' },
      { label: '1kg', price: '\u20b9235' }
    ],
    defaultSize: '500g',
    badge: 'Classic',
    spiceLevel: 'mild',
    ideal: ['everyday', 'tea-time', 'family']
  },
  {
    id: 'spicy',
    name: 'Spicy Chanachur',
    tagline: 'Fresh & Crispy',
    description: 'A bold, chatpata option for spice lovers. Extra spice, same great crunch.',
    sizes: [
      { label: '100g', price: '\u20b935' },
      { label: '250g', price: '\u20b970' },
      { label: '500g', price: '\u20b9130' },
      { label: '1kg', price: '\u20b9250' }
    ],
    defaultSize: '500g',
    badge: 'Spicy',
    spiceLevel: 'hot',
    ideal: ['spicy-lovers', 'snack']
  },
  {
    id: 'special',
    name: 'Special Chanachur',
    tagline: 'Fresh & Crispy',
    description: 'A premium mix made for family snacking. Carefully balanced flavors for all ages.',
    sizes: [
      { label: '250g', price: '\u20b975' },
      { label: '500g', price: '\u20b9140' },
      { label: '1kg', price: '\u20b9270' }
    ],
    defaultSize: '500g',
    badge: 'Special',
    spiceLevel: 'medium',
    ideal: ['family', 'all-ages']
  },
  {
    id: 'premium',
    name: 'Premium Mix',
    tagline: 'Fresh & Crispy',
    description: 'A richer mix for celebrations and gifting. Premium ingredients, elevated taste.',
    sizes: [
      { label: '250g', price: '\u20b980' },
      { label: '500g', price: '\u20b9150' },
      { label: '1kg', price: '\u20b9290' }
    ],
    defaultSize: '500g',
    badge: 'Premium',
    spiceLevel: 'medium',
    ideal: ['gifting', 'celebrations', 'premium']
  },
  {
    id: 'family',
    name: 'Family Pack',
    tagline: 'Fresh & Crispy',
    description: 'More crunch for more people and more moments. The perfect pack for family gatherings.',
    sizes: [
      { label: '1kg', price: '\u20b9250' },
      { label: '2kg', price: '\u20b9490' }
    ],
    defaultSize: '1kg',
    badge: 'Family',
    spiceLevel: 'mild',
    ideal: ['family', 'gatherings', 'bulk']
  },
  {
    id: 'festival',
    name: 'Festival Combo',
    tagline: 'Custom Pack',
    description: 'A Shree Shyam selection for festive occasions. Custom combinations available on request.',
    sizes: [
      { label: 'Custom', price: 'Price on request' }
    ],
    defaultSize: 'Custom',
    badge: 'Festival',
    spiceLevel: 'varied',
    ideal: ['festivals', 'gifting', 'bulk']
  }
];

/* ─── DOM ELEMENTS ─── */
const els = {
  header: document.getElementById('main-header'),
  menuToggle: document.getElementById('menu-toggle'),
  mainNav: document.getElementById('main-nav'),
  navLinks: document.querySelectorAll('.nav-link'),
  heroStatusDot: document.getElementById('hero-status-dot'),
  heroStatusText: document.getElementById('hero-status-text'),
  mainStatusBox: document.getElementById('shop-status-main'),
  orderModal: document.getElementById('order-modal'),
  orderProduct: document.getElementById('order-product'),
  orderSize: document.getElementById('order-size'),
  orderQty: document.getElementById('order-qty'),
  orderName: document.getElementById('order-name'),
  orderPhone: document.getElementById('order-phone'),
  orderSummary: document.getElementById('order-summary'),
  orderBtn: document.getElementById('order-whatsapp-btn'),
  reviewModal: document.getElementById('review-modal'),
  reviewForm: document.getElementById('review-form'),
  reviewSuccess: document.getElementById('review-success'),
  reviewsGrid: document.getElementById('reviews-grid'),
  toast: document.getElementById('toast'),
  chatbotPanel: document.getElementById('chatbot-panel'),
  chatFab: document.getElementById('chat-fab'),
  chatMessages: document.getElementById('chatbot-messages'),
  chatInput: document.getElementById('chatbot-input'),
  chatSendBtn: document.getElementById('chatbot-send-btn'),
  footerYear: document.getElementById('footer-year')
};

/* ─── 1. SHOP STATUS ENGINE ─── */
function getShopStatus() {
  const now = new Date();
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const todayName = dayNames[now.getDay()];
  const todayHours = BUSINESS.hours[todayName];
  
  const currentTotalMins = now.getHours() * 60 + now.getMinutes();
  
  const parseTime = (timeStr) => {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const openMins = parseTime(todayHours.open);
  const closeMins = parseTime(todayHours.close);
  
  const isOpen = currentTotalMins >= openMins && currentTotalMins < closeMins;
  
  const format12h = (timeStr) => {
    let [h, m] = timeStr.split(':');
    h = parseInt(h, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return `${h}:${m} ${ampm}`;
  };

  return {
    isOpen,
    todayOpen: format12h(todayHours.open),
    todayClose: format12h(todayHours.close)
  };
}

function updateShopStatusUI() {
  const status = getShopStatus();
  
  // Hero Badge
  if (els.heroStatusDot && els.heroStatusText) {
    els.heroStatusDot.className = `status-dot ${status.isOpen ? 'open' : 'closed'}`;
    els.heroStatusText.textContent = status.isOpen ? 'Open Now' : 'Closed';
  }
  
  // Main Status Card
  if (els.mainStatusBox) {
    const badgeClass = status.isOpen ? 'open' : 'closed';
    const text = status.isOpen ? 'We are Open Now' : 'Currently Closed';
    const subText = status.isOpen 
      ? `Closes at ${status.todayClose}`
      : `Opens at ${status.todayOpen}`;
      
    els.mainStatusBox.innerHTML = `
      <div class="status-badge ${badgeClass}">
        <span class="status-dot-large ${badgeClass}"></span>
        ${text}
      </div>
      <div class="shop-hours-today">${subText}</div>
    `;
  }
}

/* ─── 2. NAVBAR BEHAVIOR ─── */
function initNavbar() {
  // Sticky scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) els.header.classList.add('scrolled');
    else els.header.classList.remove('scrolled');
  });

  // Hamburger toggle
  els.menuToggle.addEventListener('click', () => {
    const isOpen = els.mainNav.classList.contains('open');
    if (isOpen) {
      els.mainNav.classList.remove('open');
      els.menuToggle.setAttribute('aria-expanded', 'false');
    } else {
      els.mainNav.classList.add('open');
      els.menuToggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close on link click
  els.navLinks.forEach(link => {
    link.addEventListener('click', () => {
      els.mainNav.classList.remove('open');
      els.menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link tracking
  const sections = document.querySelectorAll('section[id], header[id="home"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        els.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.2, rootMargin: '-50px 0px -50px 0px' });

  sections.forEach(sec => observer.observe(sec));
}

/* ─── 3. ORDER MODAL ─── */
function openOrderModal(productName = '') {
  els.orderModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (productName) {
    els.orderProduct.value = productName;
  }
  updateOrderSummary();
  els.orderProduct.focus();
}

function closeOrderModal() {
  els.orderModal.classList.remove('open');
  document.body.style.overflow = '';
}

function updateOrderSummary() {
  const prod = els.orderProduct.value;
  const size = els.orderSize.value;
  const qty = els.orderQty.value;
  const pref = document.querySelector('input[name="order-pref"]:checked').value;
  
  if (!prod || !size || !qty) {
    els.orderSummary.innerHTML = `
      <div class="summary-title">Order Summary</div>
      <p style="color:#786156; font-size:13px;">Fill in the form above to see your order summary.</p>
    `;
    return;
  }

  els.orderSummary.innerHTML = `
    <div class="summary-title">Order Summary</div>
    <strong>${prod}</strong><br>
    Size: ${size} | Qty: ${qty}<br>
    Preference: ${pref}
  `;
}

function generateWhatsAppMessage() {
  const name = els.orderName.value.trim();
  const phone = els.orderPhone.value.trim();
  const prod = els.orderProduct.value;
  const size = els.orderSize.value;
  const qty = els.orderQty.value;
  const pref = document.querySelector('input[name="order-pref"]:checked').value;

  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');
  
  nameError.textContent = '';
  phoneError.textContent = '';
  els.orderName.classList.remove('error');
  els.orderPhone.classList.remove('error');

  let isValid = true;

  if (!prod || !size || !qty) {
    showToast('Please select product details.');
    return;
  }

  if (name.length < 2) {
    nameError.textContent = 'Please enter a valid name.';
    els.orderName.classList.add('error');
    isValid = false;
  }

  const phoneRegex = /^[0-9]{10}$/;
  const cleanPhone = phone.replace(/[^0-9]/g, '').slice(-10);
  if (!phoneRegex.test(cleanPhone)) {
    phoneError.textContent = 'Please enter a valid 10-digit phone number.';
    els.orderPhone.classList.add('error');
    isValid = false;
  }

  if (!isValid) return;

  const msg = `Hello Shree Shyam Chanachur 👋\n\nI would like to place an order:\n\nProduct: ${prod}\nPack Size: ${size}\nQuantity: ${qty}\nPreference: ${pref}\n\nCustomer Name: ${name}\nPhone: ${cleanPhone}\n\nPlease confirm my order.`;
  
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
  closeOrderModal();
}

/* ─── 4. REVIEW SYSTEM ─── */
let selectedRating = 0;

function loadReviews() {
  const reviewsStr = localStorage.getItem('ssc_reviews');
  let reviews = [];
  if (reviewsStr) {
    try { reviews = JSON.parse(reviewsStr); } catch(e){}
  }

  const approved = reviews.filter(r => r.approved);
  
  if (approved.length === 0) {
    els.reviewsGrid.innerHTML = `<div class="empty-reviews">No reviews yet. Be the first to share your experience!</div>`;
    return;
  }

  els.reviewsGrid.innerHTML = approved.map(renderReviewCard).join('');
}

function renderReviewCard(r) {
  const filled = '★'.repeat(r.rating);
  const empty = '☆'.repeat(5 - r.rating);
  const d = new Date(r.date);
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  return `
    <article class="review-card">
      <div class="review-stars" aria-label="${r.rating} out of 5 stars">${filled}${empty}</div>
      <p class="review-text">"${r.review}"</p>
      <div class="review-footer-row">
        <span class="review-author">${r.name}</span>
        <span class="review-date">${dateStr}</span>
      </div>
    </article>
  `;
}

function openReviewModal() {
  els.reviewModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  els.reviewSuccess.style.display = 'none';
  els.reviewForm.style.display = 'block';
  els.reviewForm.reset();
  setRating(0);
}

function closeReviewModal() {
  els.reviewModal.classList.remove('open');
  document.body.style.overflow = '';
}

function setRating(val) {
  selectedRating = val;
  const stars = document.querySelectorAll('.star-btn');
  stars.forEach(s => {
    if (parseInt(s.dataset.value) <= val) s.classList.add('active');
    else s.classList.remove('active');
  });
  document.getElementById('rating-error').textContent = '';
}

function submitReview(e) {
  e.preventDefault();
  
  const name = document.getElementById('review-name').value.trim();
  const text = document.getElementById('review-text').value.trim();
  
  let valid = true;
  if (name.length < 2) {
    document.getElementById('review-name-error').textContent = 'Please enter your name.';
    valid = false;
  } else {
    document.getElementById('review-name-error').textContent = '';
  }
  
  if (selectedRating === 0) {
    document.getElementById('rating-error').textContent = 'Please select a rating.';
    valid = false;
  }
  
  if (text.length < 10) {
    document.getElementById('review-text-error').textContent = 'Review must be at least 10 characters.';
    valid = false;
  } else {
    document.getElementById('review-text-error').textContent = '';
  }
  
  if (!valid) return;

  const newReview = {
    id: Date.now().toString(),
    name: name,
    email: document.getElementById('review-email').value.trim(),
    rating: selectedRating,
    review: text,
    date: new Date().toISOString(),
    approved: false // Real app would need admin approval
  };

  let reviews = [];
  try { reviews = JSON.parse(localStorage.getItem('ssc_reviews')) || []; } catch(e){}
  reviews.push(newReview);
  localStorage.setItem('ssc_reviews', JSON.stringify(reviews));

  els.reviewForm.style.display = 'none';
  els.reviewSuccess.style.display = 'block';
  
  setTimeout(closeReviewModal, 2500);
}

/* ─── 5. AI CHATBOT ─── */
let chatState = { step: 'idle', orderData: {} };

function toggleChatbot() {
  const isHidden = els.chatbotPanel.classList.contains('hidden');
  if (isHidden) {
    els.chatbotPanel.classList.remove('hidden');
    els.chatbotPanel.classList.add('visible');
    els.chatFab.setAttribute('aria-expanded', 'true');
    if (els.chatMessages.children.length === 0) {
      setTimeout(handleGreeting, 300);
    }
    els.chatInput.focus();
  } else {
    closeChatbot();
  }
}

function closeChatbot() {
  els.chatbotPanel.classList.add('hidden');
  els.chatbotPanel.classList.remove('visible');
  els.chatFab.setAttribute('aria-expanded', 'false');
}

function addBotMessage(text, options = {}) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot fade-in visible';
  div.textContent = text;
  
  if (options.buttons && options.buttons.length > 0) {
    const btnDiv = document.createElement('div');
    btnDiv.className = 'chat-msg-buttons';
    options.buttons.forEach(b => {
      const btn = document.createElement('button');
      btn.className = 'chat-action-btn';
      btn.textContent = b.text;
      btn.onclick = () => {
        addUserMessage(b.text);
        if (typeof b.action === 'function') b.action();
        else handleUserInput(b.action || b.text, true);
      };
      btnDiv.appendChild(btn);
    });
    div.appendChild(btnDiv);
  }
  
  if (options.whatsappBtn) {
    const waBtn = document.createElement('button');
    waBtn.className = 'chat-wa-btn';
    waBtn.innerHTML = `Continue to WhatsApp →`;
    waBtn.onclick = generateChatWhatsAppMessage;
    div.appendChild(waBtn);
  }

  els.chatMessages.appendChild(div);
  scrollChatToBottom();
}

function addUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg user fade-in visible';
  div.textContent = text;
  els.chatMessages.appendChild(div);
  scrollChatToBottom();
}

function scrollChatToBottom() {
  els.chatMessages.scrollTop = els.chatMessages.scrollHeight;
}

function detectIntent(text) {
  const t = text.toLowerCase();
  if (/hi|hello|hey|namaste/.test(t)) return 'greeting';
  if (/open|close|time|timing|hour/.test(t)) return 'shop_status';
  if (/product|chanachur|menu|variety|what do you have/.test(t)) return 'products';
  if (/size|pack|gram|kg|weight/.test(t)) return 'pack_sizes';
  if (/address|where|location|map|shop/.test(t)) return 'location';
  if (/order|buy|want|take|chahiye/.test(t)) return 'order';
  if (/spicy|teekha|hot/.test(t)) return 'spicy';
  if (/less spicy|mild|light|not spicy/.test(t)) return 'mild';
  if (/family|ghar|sab/.test(t)) return 'family';
  if (/gift|festival|celebration|diwali/.test(t)) return 'gifting';
  if (/price|cost|rate|kitna/.test(t)) return 'price';
  if (/review|rating|feedback/.test(t)) return 'reviews';
  if (/help/.test(t)) return 'help';
  return 'unknown';
}

function handleUserInput(text, isSimulated = false) {
  if (!isSimulated) addUserMessage(text);
  
  if (chatState.step !== 'idle') {
    handleOrderStep(text);
    return;
  }

  const intent = detectIntent(text);
  setTimeout(() => {
    switch(intent) {
      case 'greeting': handleGreeting(); break;
      case 'shop_status': handleShopStatus(); break;
      case 'products': handleProducts(); break;
      case 'pack_sizes': handlePackSizes(); break;
      case 'location': handleLocation(); break;
      case 'order': startChatOrder(); break;
      case 'spicy': handleSpicy(); break;
      case 'mild': handleMild(); break;
      case 'family': handleFamily(); break;
      case 'gifting': handleGifting(); break;
      case 'price': handlePrice(); break;
      case 'reviews': handleReviews(); break;
      case 'help': handleHelp(); break;
      default: handleUnknown(); break;
    }
  }, 400);
}

// Intent Handlers
function handleGreeting() {
  addBotMessage("Namaste! Welcome to Shree Shyam Chanachur. I'm your digital assistant. How can I help you today?", {
    buttons: [{text: "Order Now", action: "order"}, {text: "Shop Timing", action: "shop_status"}]
  });
}

function handleShopStatus() {
  const st = getShopStatus();
  if (st.isOpen) {
    addBotMessage(`We are currently Open! We close at ${st.todayClose} today. Would you like to place an order?`, {
      buttons: [{text: "Yes, order now", action: "order"}]
    });
  } else {
    addBotMessage(`We are currently Closed. We will open at ${st.todayOpen}. You can still send us a WhatsApp message and we'll reply when we open!`, {
      buttons: [{text: "Order on WhatsApp", action: () => window.open(`https://wa.me/${BUSINESS.whatsapp}`, '_blank')}]
    });
  }
}

function handleProducts() {
  const buttons = PRODUCTS.map(p => ({text: p.name, action: () => startChatOrder(p.name)}));
  addBotMessage("We have 6 signature varieties of fresh chanachur. Which one are you interested in?", { buttons });
}

function handlePackSizes() {
  addBotMessage("We offer packs in 100g, 250g, 500g, 1kg, and 2kg (Family Pack). Custom festival packs are also available! What size are you looking for?");
}

function handleLocation() {
  addBotMessage(`Our shop is located at: ${BUSINESS.address}. We're open everyday from 10:00 AM to 10:30 PM!`, {
    buttons: [{text: "Get Directions", action: () => window.open(BUSINESS.mapUrl, '_blank')}]
  });
}

function handleSpicy() {
  addBotMessage("If you love spice, you must try our Spicy Chanachur! It's bold, chatpata, and perfect for spice lovers.", {
    buttons: [{text: "Order Spicy Chanachur", action: () => startChatOrder("Spicy Chanachur")}]
  });
}

function handleMild() {
  addBotMessage("For a milder taste, I recommend our Classic Chanachur. It has a perfectly balanced flavor without being too hot.", {
    buttons: [{text: "Order Classic Chanachur", action: () => startChatOrder("Classic Chanachur")}]
  });
}

function handleFamily() {
  addBotMessage("For family snacking, our Special Chanachur (mild and loved by all ages) or our 1kg/2kg Family Pack are perfect!", {
    buttons: [{text: "Order Family Pack", action: () => startChatOrder("Family Pack")}]
  });
}

function handleGifting() {
  addBotMessage("For gifting and celebrations, our Premium Mix or custom Festival Combos are the best choices.", {
    buttons: [{text: "Enquire about Festival Combo", action: () => startChatOrder("Festival Combo")}]
  });
}

function handlePrice() {
  addBotMessage("Our standard 500g packs start at ₹120. Family packs (1kg) are ₹250. You can see exact pricing for all sizes when you click 'Order Now' on the product cards.");
}

function handleReviews() {
  addBotMessage("Our customers love our fresh and crispy taste! You can read reviews on our page.", {
    buttons: [{text: "Write a Review", action: openReviewModal}]
  });
}

function handleHelp() {
  addBotMessage("I can help you explore our products, check pack sizes, find our shop timing and location, or place an order via WhatsApp. What do you need?");
}

function handleUnknown() {
  addBotMessage("I'm sorry, I don't have that information yet. Please contact Shree Shyam Chanachur directly or continue your order on WhatsApp.", {
    buttons: [{text: "Contact Us", action: () => window.location.href="#contact"}, {text: "WhatsApp Us", action: () => window.open(`https://wa.me/${BUSINESS.whatsapp}`, '_blank')}]
  });
}

// Chat Order Flow
function startChatOrder(prodName = null) {
  chatState.orderData = {};
  if (prodName) {
    chatState.orderData.product = prodName;
    askChatSize(prodName);
  } else {
    chatState.step = 'awaiting_product';
    const buttons = PRODUCTS.map(p => ({text: p.name, action: p.name}));
    addBotMessage("Great! Let's get your order ready. Which product would you like?", { buttons });
  }
}

function askChatSize(prodName) {
  chatState.step = 'awaiting_size';
  const prod = PRODUCTS.find(p => p.name === prodName) || PRODUCTS[0];
  const buttons = prod.sizes.map(s => ({text: s.label, action: s.label}));
  addBotMessage(`What pack size would you like for ${prodName}?`, { buttons });
}

function handleOrderStep(text) {
  setTimeout(() => {
    switch (chatState.step) {
      case 'awaiting_product':
        chatState.orderData.product = text;
        askChatSize(text);
        break;
      case 'awaiting_size':
        chatState.orderData.size = text;
        chatState.step = 'awaiting_qty';
        addBotMessage("How many packs would you like? (e.g., 1, 2, 5)");
        break;
      case 'awaiting_qty':
        chatState.orderData.qty = text;
        chatState.step = 'awaiting_pref';
        addBotMessage("Would you prefer Shop Pickup or Home Delivery?", {
          buttons: [{text: "Shop Pickup", action: "Shop Pickup"}, {text: "Home Delivery", action: "Home Delivery"}]
        });
        break;
      case 'awaiting_pref':
        chatState.orderData.pref = text;
        chatState.step = 'awaiting_name';
        addBotMessage("Almost done! What is your name?");
        break;
      case 'awaiting_name':
        chatState.orderData.name = text;
        finishChatOrder();
        break;
    }
  }, 400);
}

function finishChatOrder() {
  chatState.step = 'idle';
  const o = chatState.orderData;
  addBotMessage(`Thank you, ${o.name}! Here is your order summary:\n\n${o.product} (${o.size}) x ${o.qty}\nPreference: ${o.pref}\n\nClick below to confirm your order on WhatsApp.`, {
    whatsappBtn: true
  });
}

function generateChatWhatsAppMessage() {
  const o = chatState.orderData;
  if (!o.product || !o.name) return;
  const msg = `Hello Shree Shyam Chanachur 👋\n\nI would like to place an order from the assistant:\n\nProduct: ${o.product}\nPack Size: ${o.size}\nQuantity: ${o.qty}\nPreference: ${o.pref}\n\nCustomer Name: ${o.name}\n\nPlease confirm my order.`;
  window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* ─── 6. SCROLL ANIMATIONS ─── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ─── 7. PRODUCT CARD INTERACTIONS ─── */
function initProductCards() {
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = e.target.closest('.pack-sizes');
      parent.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      e.target.classList.add('selected');
      
      const card = e.target.closest('.product-card');
      const prodName = card.querySelector('.prod-name').textContent;
      const sizeStr = e.target.dataset.size;
      const priceEl = card.querySelector('.prod-price');
      
      const prod = PRODUCTS.find(p => p.name === prodName);
      if (prod) {
        const sizeData = prod.sizes.find(s => s.label === sizeStr);
        if (sizeData) {
          priceEl.textContent = `${sizeStr} — ${sizeData.price}`;
        }
      }
    });
  });
  
  // Initialize initial prices based on initially selected sizes
  document.querySelectorAll('.product-card').forEach(card => {
    const selectedBtn = card.querySelector('.size-btn.selected');
    if (selectedBtn) {
      const prodName = card.querySelector('.prod-name').textContent;
      const sizeStr = selectedBtn.dataset.size;
      const priceEl = card.querySelector('.prod-price');
      
      const prod = PRODUCTS.find(p => p.name === prodName);
      if (prod) {
        const sizeData = prod.sizes.find(s => s.label === sizeStr);
        if (sizeData) {
          priceEl.textContent = `${sizeStr} — ${sizeData.price}`;
        }
      }
    }
  });
}

/* ─── 8. TOAST NOTIFICATIONS ─── */
function showToast(message, duration = 2600) {
  els.toast.textContent = message;
  els.toast.classList.add('show');
  setTimeout(() => els.toast.classList.remove('show'), duration);
}

/* ─── EVENT LISTENERS & INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  // Init
  initNavbar();
  updateShopStatusUI();
  setInterval(updateShopStatusUI, 60000);
  initScrollAnimations();
  initProductCards();
  loadReviews();
  if (els.footerYear) els.footerYear.textContent = new Date().getFullYear();

  // Order Form Events
  els.orderProduct.addEventListener('change', updateOrderSummary);
  els.orderSize.addEventListener('change', updateOrderSummary);
  els.orderQty.addEventListener('input', updateOrderSummary);
  document.querySelectorAll('input[name="order-pref"]').forEach(r => r.addEventListener('change', updateOrderSummary));
  els.orderBtn.addEventListener('click', generateWhatsAppMessage);

  // Review Form Events
  const stars = document.querySelectorAll('.star-btn');
  stars.forEach(star => {
    star.addEventListener('click', (e) => setRating(parseInt(e.target.dataset.value)));
    star.addEventListener('mouseover', (e) => {
      const val = parseInt(e.target.dataset.value);
      stars.forEach(s => {
        if (parseInt(s.dataset.value) <= val) s.classList.add('hovered');
        else s.classList.remove('hovered');
      });
    });
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });
  });
  els.reviewForm.addEventListener('submit', submitReview);

  // Chatbot Events
  els.chatSendBtn.addEventListener('click', () => {
    const val = els.chatInput.value.trim();
    if (val) {
      handleUserInput(val);
      els.chatInput.value = '';
    }
  });
  
  els.chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      els.chatSendBtn.click();
    }
  });

  document.querySelectorAll('.quick-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const intent = e.target.dataset.intent;
      const text = e.target.textContent;
      addUserMessage(text);
      if (intent === 'order') startChatOrder();
      else handleUserInput(intent, true);
    });
  });

  // Modal Closers
  window.addEventListener('click', (e) => {
    if (e.target === els.orderModal) closeOrderModal();
    if (e.target === els.reviewModal) closeReviewModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeOrderModal();
      closeReviewModal();
      closeChatbot();
    }
  });
});

/* ─── STORY PHOTO SWITCHER ─── */
window.switchStoryPhoto = function(src, btn, altText) {
  const mainImg = document.getElementById('story-main-img');
  if (!mainImg) return;
  mainImg.style.opacity = '0.2';
  mainImg.style.transform = 'scale(0.98)';
  setTimeout(() => {
    mainImg.src = src;
    if (altText) mainImg.alt = altText;
    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';
  }, 180);
  document.querySelectorAll('.story-thumb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

