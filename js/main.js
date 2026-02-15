// ==================== 
// CONFIGURATION 
// ====================
const CONFIG = {
    apiUrl: 'api/',
    itemsPerPage: 10,
    slideInterval: 5000
};

// ==================== 
// LOADING SCREEN 
// ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
});

// ==================== 
// DATE 
// ====================
function updateDate() {
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = 
        date.toLocaleDateString('tr-TR', options);
}
updateDate();

// ==================== 
// FETCH DATA 
// ====================
async function fetchData(endpoint) {
    try {
        const response = await fetch(CONFIG.apiUrl + endpoint + '.json');
        return await response.json();
    } catch (error) {
        console.error('Data fetch error:', error);
        return [];
    }
}

// ==================== 
// SLIDER 
// ====================
let currentSlide = 0;
let slides = [];
let slideInterval;

async function initSlider() {
    const haberler = await fetchData('haberler');
    const sliderHaberler = haberler.filter(h => h.slider).slice(0, 5);
    
    const wrapper = document.getElementById('slider-wrapper');
    const dots = document.getElementById('slider-dots');
    
    sliderHaberler.forEach((haber, index) => {
        // Slide HTML
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.innerHTML = `
            <img src="${haber.resim}" alt="${haber.baslik}" loading="lazy">
            <div class="slide-content">
                <span class="slide-category">${haber.kategori}</span>
                <h2 class="slide-title">${haber.baslik}</h2>
                <span class="slide-date">${haber.tarih}</span>
            </div>
        `;
        wrapper.appendChild(slide);
        
        // Dot
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(index);
        dots.appendChild(dot);
    });
    
    slides = document.querySelectorAll('.slide');
    
    // Controls
    document.querySelector('.slider-prev').onclick = prevSlide;
    document.querySelector('.slider-next').onclick = nextSlide;
    
    startSlideTimer();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
}

function updateSlider() {
    const wrapper = document.getElementById('slider-wrapper');
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function startSlideTimer() {
    slideInterval = setInterval(nextSlide, CONFIG.slideInterval);
}

// ==================== 
// NEWS GRID 
// ====================
let currentPage = 1;
let currentCategory = 'all';

async function loadNews(category = 'all', page = 1) {
    const haberler = await fetchData('haberler');
    let filtered = category === 'all' ? haberler : 
                   haberler.filter(h => h.kategoriSlug === category);
    
    const start = (page - 1) * CONFIG.itemsPerPage;
    const end = start + CONFIG.itemsPerPage;
    const pageHaberler = filtered.slice(start, end);
    
    const grid = document.getElementById('news-grid');
    
    if (page === 1) grid.innerHTML = '';
    
    pageHaberler.forEach((haber, index) => {
        const card = createNewsCard(haber, index === 0 && page === 1);
        grid.appendChild(card);
    });
    
    // Hide load more if no more items
    const loadMoreBtn = document.getElementById('load-more');
    if (end >= filtered.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

function createNewsCard(haber, featured = false) {
    const card = document.createElement('article');
    card.className = 'news-card' + (featured ? ' featured' : '');
    card.onclick = () => window.location.href = haber.url;
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${haber.resim}" alt="${haber.baslik}" loading="lazy">
            <span class="news-category">${haber.kategori}</span>
        </div>
        <div class="news-content">
            <h3 class="news-title">${haber.baslik}</h3>
            <div class="news-meta">
                <span>📅 ${haber.tarih}</span>
                <span>👁️ ${haber.goruntulenme}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Category tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        currentCategory = btn.dataset.cat;
        currentPage = 1;
        loadNews(currentCategory, currentPage);
    });
});

// Load more
document.getElementById('load-more').addEventListener('click', () => {
    currentPage++;
    loadNews(currentCategory, currentPage);
});

// ==================== 
// TICKER 
// ====================
async function initTicker() {
    const haberler = await fetchData('haberler');
    const sonDakika = haberler.filter(h => h.sonDakika).slice(0, 10);
    
    const ticker = document.getElementById('ticker-content');
    
    // Duplicate for infinite scroll
    const items = [...sonDakika, ...sonDakika];
    
    items.forEach(haber => {
        const link = document.createElement('a');
        link.href = haber.url;
        link.textContent = haber.baslik;
        ticker.appendChild(link);
    });
}

// ==================== 
// POPULAR NEWS 
// ====================
async function loadPopular() {
    const haberler = await fetchData('haberler');
    const popular = haberler.sort((a, b) => b.goruntulenme - a.goruntulenme).slice(0, 5);
    
    const list = document.getElementById('popular-list');
    
    popular.forEach((haber, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="popular-number">${index + 1}</span>
            <a href="${haber.url}">${haber.baslik}</a>
        `;
        list.appendChild(li);
    });
}

// ==================== 
// ECONOMY DATA 
// ====================
async function loadEconomy() {
    try {
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();
        
        // Simulated values - gerçek API ile değiştir
        document.getElementById('dolar').textContent = '43,73';
        document.getElementById('euro').textContent = '51,93';
        document.getElementById('altin').textContent = '7.076';
        document.getElementById('borsa').textContent = '14.181';
        document.getElementById('bitcoin').textContent = '68.820';
    } catch (e) {
        console.log('Economy data error');
    }
}

// ==================== 
// MOBILE MENU 
// ====================
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('main-nav').classList.toggle('active');
});

// ==================== 
// INIT 
// ====================
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    initTicker();
    loadNews();
    loadPopular();
    loadEconomy();
    
    // AdSense init
    (adsbygoogle = window.adsbygoogle || []).push({});
});

