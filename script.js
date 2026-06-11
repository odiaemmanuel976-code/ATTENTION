// ALYAAURA Fragrance Products Data
const signatureProducts = [
    {
        id: 1,
        name: 'Golden Hours',
        description: 'Warm, radiant, and unforgettable',
        price: 185,
        image: 'golden-hours.jpg',
        label: 'Best Seller',
        rating: 4.9
    },
    {
        id: 2,
        name: 'Love Potion',
        description: 'Romantic, seductive, and enchanting',
        price: 190,
        image: 'love-potion.jpg',
        label: 'Signature',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Captivating Halo',
        description: 'Sophisticated, alluring, and magnetic',
        price: 195,
        image: 'captivating-halo.jpg',
        label: 'Most Loved',
        rating: 4.9
    }
];

const limitedProducts = [
    {
        id: 4,
        name: 'Intense',
        description: 'Bold and powerful',
        price: 220,
        image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80',
        label: 'Limited',
        rating: 4.7
    },
    {
        id: 5,
        name: 'Roselle',
        description: 'Floral, graceful, and refined',
        price: 215,
        image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=400&q=80',
        label: 'Exclusive',
        rating: 4.6
    },
    {
        id: 6,
        name: 'Luminous',
        description: 'Bright, elegant, and radiant',
        price: 210,
        image: 'https://images.unsplash.com/photo-1561181286-d3fee8c1d6a8?auto=format&fit=crop&w=400&q=80',
        label: 'Premium',
        rating: 4.8
    },
    {
        id: 7,
        name: 'Noir',
        description: 'Deep, mysterious, and unforgettable',
        price: 225,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80',
        label: 'Rare',
        rating: 4.9
    }
];

let cart = [];
let compareItems = [];
let testimonialIndex = 0;
const testimonials = [
    {
        quote: '"ALYAAURA has become my signature. Every time I wear it, I feel more confident and captivating. It’s not just a fragrance—it’s an extension of my personality."',
        author: '— Sarah M.'
    },
    {
        quote: '"The quality is unmatched. The scent lingers beautifully throughout the day, and I receive compliments constantly. Worth every penny."',
        author: '— Emily L.'
    },
    {
        quote: '"I gifted Captivating Halo to my sister, and she’s absolutely obsessed. The bottle is stunning, and the scent is truly unforgettable."',
        author: '— Jessica R.'
    }
];

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    renderSignatureProducts();
    renderLimitedProducts();
    setupEventListeners();
    loadCartFromStorage();
});

// Render Signature Collection
function renderSignatureProducts() {
    const container = document.getElementById('signatureProducts');
    if (!container) return;
    
    container.innerHTML = signatureProducts.map(product => createProductCard(product)).join('');
}

// Render Limited Edition Collection
function renderLimitedProducts() {
    const container = document.getElementById('limitedProducts');
    if (!container) return;
    
    container.innerHTML = limitedProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-animate="fade-up">
            <div class="product-image" style="background-image: url('${product.image}');"></div>
            <span class="product-label">${product.label}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-rating">★ ${product.rating} (${Math.floor(Math.random() * 100) + 50} reviews)</div>
            <div class="product-price">$${product.price}</div>
            <button class="button button-primary" onclick="addToCart(${product.id}, '${product.name}', ${product.price})">
                Add to Cart
            </button>
            <button class="button button-secondary compare-button" type="button" onclick="addToCompare(${product.id}, '${product.name}')">Compare</button>
        </div>
    `;
}

// Add to cart
function addToCart(id, name, price) {
    cart.push({ id, name, price, quantity: 1 });
    updateCartCount();
    saveCartToStorage();
    showNotification(`${name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('alyaauraCart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const saved = localStorage.getItem('alyaauraCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCartCount();
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #d4af37;
        color: #0f0f0f;
        padding: 1rem 1.5rem;
        border-radius: 2px;
        z-index: 200;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Setup event listeners
function setupEventListeners() {
    const cartButton = document.getElementById('cartButton');
    if (cartButton) {
        cartButton.addEventListener('click', openCart);
    }
    
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) closeCart();
        });
    }
    
    document.querySelectorAll('.modal-close').forEach(button => {
        const modal = button.closest('.modal');
        button.addEventListener('click', () => closeModal(modal));
    });

    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    const openCompareButton = document.getElementById('openCompareButton');
    if (openCompareButton) {
        openCompareButton.addEventListener('click', () => openModal(document.getElementById('compareModal')));
    }

    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress();
    initTestimonials();
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    initCarouselControls();
    
    // Add animations on scroll
    observeElements();
}

// Initialize carousel controls and autoplay
function initCarouselControls() {
    document.querySelectorAll('.carousel-control').forEach(button => {
        button.addEventListener('click', () => {
            const target = button.dataset.target;
            const direction = button.classList.contains('next') ? 1 : -1;
            slideCarousel(target, direction);
        });
    });

    setInterval(() => slideCarousel('signatureProducts', 1), 7000);
    setInterval(() => slideCarousel('limitedProducts', 1), 8000);
}

// Slide a carousel container by one product card width
function slideCarousel(targetId, direction) {
    const carousel = document.getElementById(targetId);
    if (!carousel) return;

    const card = carousel.querySelector('.product-card');
    if (!card) return;

    const computedStyle = getComputedStyle(carousel);
    const gap = parseFloat(computedStyle.getPropertyValue('gap')) || 24;
    const scrollAmount = card.offsetWidth + gap;
    const maxScroll = carousel.scrollWidth - carousel.clientWidth;
    let nextScroll = carousel.scrollLeft + scrollAmount * direction;

    if (nextScroll > maxScroll) {
        nextScroll = 0;
    } else if (nextScroll < 0) {
        nextScroll = maxScroll;
    }

    carousel.scrollTo({ left: nextScroll, behavior: 'smooth' });
}

// Open cart modal
function openCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.add('active');
        renderCartItems();
    }
}

// Close cart modal
function closeCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.classList.remove('active');
    }
}

// Render cart items
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #d4ccc7; text-align: center;">Your cart is empty</p>';
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    cartItems.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <span>${item.name}</span>
                <div>
                    <span style="margin-right: 1rem;">$${item.price}</span>
                    <button onclick="removeFromCart(${index})" style="background: transparent; color: #d4ccc7; cursor: pointer;">✕</button>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `$${total}`;
}

// Remove from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartCount();
    saveCartToStorage();
    renderCartItems();
    showNotification('Item removed from cart');
}

function openModal(modal) {
    if (!modal) return;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
}

function addToCompare(id, name) {
    if (compareItems.some(item => item.id === id)) {
        showNotification(`${name} is already in comparison.`);
        return;
    }
    compareItems.push({ id, name });
    updateCompareBar();
    showNotification(`${name} added to compare.`);
}

function removeFromCompare(index) {
    compareItems.splice(index, 1);
    updateCompareBar();
}

function updateCompareBar() {
    const compareBar = document.getElementById('compareBar');
    const compareList = document.getElementById('compareList');
    if (!compareBar || !compareList) return;
    compareList.innerHTML = compareItems.map((item, index) => `<span>${item.name} <button type="button" onclick="removeFromCompare(${index})">✕</button></span>`).join('');
    compareBar.style.display = compareItems.length ? 'flex' : 'none';
}

function initTestimonials() {
    const prevButton = document.getElementById('testimonialPrev');
    const nextButton = document.getElementById('testimonialNext');
    if (prevButton) prevButton.addEventListener('click', () => setTestimonial(testimonialIndex - 1));
    if (nextButton) nextButton.addEventListener('click', () => setTestimonial(testimonialIndex + 1));
    setTestimonial(testimonialIndex);
}

function setTestimonial(index) {
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    const display = document.getElementById('testimonialDisplay');
    const dots = document.getElementById('testimonialDots');
    if (!display || !dots) return;
    display.innerHTML = `
        <div class="testimonial-card active">
            <div class="stars">★★★★★</div>
            <p class="testimonial-text">${testimonials[testimonialIndex].quote}</p>
            <p class="testimonial-author">${testimonials[testimonialIndex].author}</p>
        </div>
    `;
    dots.innerHTML = testimonials.map((_, idx) => `<button class="dot ${idx === testimonialIndex ? 'active' : ''}" type="button" onclick="setTestimonial(${idx})"></button>`).join('');
}

function updateScrollProgress() {
    const fill = document.querySelector('.scroll-progress-fill');
    if (!fill) return;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    fill.style.width = `${percent}%`;
}

// Handle newsletter submit
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`✓ Welcome to ALYAAURA! Check ${email} for exclusive offers.`);
    e.target.reset();
}

// Intersection Observer for scroll animations
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('[data-animate]').forEach(el => {
        observer.observe(el);
    });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll enhancement
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add product rating display
const ratingStyle = document.createElement('style');
ratingStyle.textContent = `
    .product-rating {
        color: #d4af37;
        font-size: 0.9rem;
        margin: 0.5rem 0;
        font-weight: 500;
    }
`;
document.head.appendChild(ratingStyle);
