// ==================== 
// HABER VERİLERİ (DOĞRUDAN JS İÇİNDE - JSON YOK!)
// ====================
const HABERLER_DB = {
    "haberler": [
        {
            "id": 1,
            "baslik": "Dolar ve Altın Rekor Kırdı: Piyasalar Karıştı, Uzmanlar Ne Diyor?",
            "ozet": "Dolar kuru tarihi zirveyi gördü, gram altın rekor kırdı.",
            "kategori": "Ekonomi",
            "kategoriSlug": "ekonomi",
            "resim": "https://images.unsplash.com/photo-1611974765270-ca1258634369?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "14:30",
            "url": "haberler/ekonomi/dolar-ve-altin-rekor-kirdi-2026.html",
            "yazar": "Ahmet Yılmaz",
            "goruntulenme": 24586,
            "slider": true,
            "sonDakika": true,
            "video": false
        },
        {
            "id": 2,
            "baslik": "Galatasaray'da Flaş Gelişme: Yıldız Oyuncu Kadro Dışı",
            "ozet": "Sarı-kırmızılı takımda şok gelişme.",
            "kategori": "Spor",
            "kategoriSlug": "spor",
            "resim": "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "13:15",
            "url": "haberler/spor/galatasarayda-flas-gelisme.html",
            "yazar": "Mehmet Kaya",
            "goruntulenme": 18734,
            "slider": true,
            "sonDakika": false,
            "video": false
        },
        {
            "id": 3,
            "baslik": "Trump'tan Yeni Açıklama: Türkiye ile İlişkilerde Yeni Dönem",
            "ozet": "ABD Başkanı Trump, Türkiye ile ilişkilerde yeni sayfa açacak.",
            "kategori": "Dünya",
            "kategoriSlug": "dunya",
            "resim": "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "12:00",
            "url": "haberler/dunya/trumptan-turkiye-aciklamasi.html",
            "yazar": "Ayşe Demir",
            "goruntulenme": 32150,
            "slider": true,
            "sonDakika": true,
            "video": false
        },
        {
            "id": 4,
            "baslik": "Yapay Zeka Çağında Eğitim Sistemi Değişiyor",
            "ozet": "Yapay zeka dersleri zorunlu olacak.",
            "kategori": "Teknoloji",
            "kategoriSlug": "teknoloji",
            "resim": "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "10:45",
            "url": "haberler/teknoloji/yapay-zeka-egitim-mufredat.html",
            "yazar": "Can Yılmaz",
            "goruntulenme": 12543,
            "slider": false,
            "sonDakika": false,
            "video": false
        },
        {
            "id": 5,
            "baslik": "Ünlü Oyuncu Hastaneye Kaldırıldı: Sevenleri Endişeli",
            "ozet": "Sevilen dizi yıldızı sağlık sorunları nedeniyle hastanede.",
            "kategori": "Magazin",
            "kategoriSlug": "magazin",
            "resim": "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "09:30",
            "url": "haberler/magazin/unlu-oyuncu-hastanede.html",
            "yazar": "Zeynep Aydın",
            "goruntulenme": 45231,
            "slider": false,
            "sonDakika": false,
            "video": true
        },
        {
            "id": 6,
            "baslik": "Son Dakika: İstanbul'da Deprem! İşte İlk Görüntüler",
            "ozet": "Marmara Denizi'nde 4.2 büyüklüğünde deprem.",
            "kategori": "Gündem",
            "kategoriSlug": "gundem",
            "resim": "https://images.unsplash.com/photo-1454789548728-85d2696cfbaf?w=800",
            "tarih": "16 Şubat 2026",
            "saat": "08:15",
            "url": "haberler/gundem/istanbul-deprem-2026.html",
            "yazar": "Editör",
            "goruntulenme": 89342,
            "slider": true,
            "sonDakika": true,
            "video": true
        }
    ]
};

// ==================== 
// LOADING SCREEN 
// ====================
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loading-screen');
        if (loader) loader.classList.add('hidden');
    }, 1500);
});

// ==================== 
// DATE 
// ====================
function updateDate() {
    const dateEl = document.getElementById('current-date');
    if (!dateEl) return;
    
    const date = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateEl.textContent = date.toLocaleDateString('tr-TR', options);
}
updateDate();

// ==================== 
// SLIDER 
// ====================
let currentSlide = 0;
let slideInterval;

function initSlider() {
    const sliderHaberler = HABERLER_DB.haberler.filter(h => h.slider).slice(0, 5);
    
    const wrapper = document.getElementById('slider-wrapper');
    const dots = document.getElementById('slider-dots');
    
    if (!wrapper || !dots) {
        console.error('Slider elementleri bulunamadı!');
        return;
    }
    
    wrapper.innerHTML = '';
    dots.innerHTML = '';
    
    if (sliderHaberler.length === 0) {
        console.warn('Slider için haber bulunamadı!');
        return;
    }
    
    sliderHaberler.forEach((haber, index) => {
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.cursor = 'pointer';
        slide.innerHTML = `
            <img src="${haber.resim}" alt="${haber.baslik}" loading="lazy">
            <div class="slide-content">
                <span class="slide-category">${haber.kategori}</span>
                <h2 class="slide-title">${haber.baslik}</h2>
                <span class="slide-date">${haber.tarih}</span>
            </div>
        `;
        slide.addEventListener('click', () => {
            window.location.href = haber.url;
        });
        wrapper.appendChild(slide);
        
        const dot = document.createElement('span');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.onclick = (e) => {
            e.stopPropagation();
            goToSlide(index);
        };
        dots.appendChild(dot);
    });
    
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); prevSlide(); };
    if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); nextSlide(); };
    
    if (sliderHaberler.length > 1) {
        startSlideTimer();
    }
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    currentSlide = index;
    const wrapper = document.getElementById('slider-wrapper');
    if (wrapper) {
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
}

function prevSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
}

function startSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

// ==================== 
// NEWS GRID 
// ====================
let currentPage = 1;
let currentCategory = 'all';
const ITEMS_PER_PAGE = 6;

function loadNews(category = 'all', page = 1) {
    console.log('Haberler yükleniyor... Kategori:', category);
    
    let filtered = category === 'all' 
        ? HABERLER_DB.haberler 
        : HABERLER_DB.haberler.filter(h => h.kategoriSlug === category);
    
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageHaberler = filtered.slice(start, end);
    
    const grid = document.getElementById('news-grid');
    if (!grid) {
        console.error('News grid bulunamadı!');
        return;
    }
    
    if (page === 1) grid.innerHTML = '';
    
    if (pageHaberler.length === 0) {
        grid.innerHTML = '<p style="text-align:center; padding:20px;">Bu kategoride haber bulunamadı.</p>';
        return;
    }
    
    pageHaberler.forEach((haber, index) => {
        const isFeatured = (index === 0 && page === 1 && category === 'all');
        const card = createNewsCard(haber, isFeatured);
        grid.appendChild(card);
    });
    
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        if (end >= filtered.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-block';
        }
    }
}

function createNewsCard(haber, featured = false) {
    const card = document.createElement('article');
    card.className = 'news-card' + (featured ? ' featured' : '');
    card.style.cursor = 'pointer';
    
    card.innerHTML = `
        <div class="news-image">
            <img src="${haber.resim}" alt="${haber.baslik}" loading="lazy">
            <span class="news-category">${haber.kategori}</span>
        </div>
        <div class="news-content">
            <h3 class="news-title">${haber.baslik}</h3>
            <div class="news-meta">
                <span>📅 ${haber.tarih}</span>
                <span>👁️ ${haber.goruntulenme.toLocaleString('tr-TR')}</span>
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        console.log('Habere tıklandı:', haber.url);
        window.location.href = haber.url;
    });
    
    return card;
}

// ==================== 
// TICKER 
// ====================
function initTicker() {
    const sonDakika = HABERLER_DB.haberler.filter(h => h.sonDakika);
    const ticker = document.getElementById('ticker-content');
    
    if (!ticker) return;
    
    const items = [...sonDakika, ...sonDakika, ...sonDakika];
    
    ticker.innerHTML = items.map(haber => 
        `<a href="${haber.url}" style="text-decoration:none; color:inherit;">${haber.baslik}</a>`
    ).join('');
}

// ==================== 
// POPULAR NEWS 
// ====================
function loadPopular() {
    const popular = [...HABERLER_DB.haberler]
        .sort((a, b) => b.goruntulenme - a.goruntulenme)
        .slice(0, 5);
    
    const list = document.getElementById('popular-list');
    if (!list) return;
    
    list.innerHTML = popular.map((haber, index) => `
        <li>
            <span class="popular-number">${index + 1}</span>
            <a href="${haber.url}">${haber.baslik}</a>
        </li>
    `).join('');
}

// ==================== 
// ECONOMY DATA 
// ====================
function loadEconomy() {
    const data = {
        dolar: { value: '43,73', change: '% 0,19', up: true },
        euro: { value: '51,93', change: '% 0,02', up: false },
        altin: { value: '7.076', change: '% 2,56', up: true },
        bitcoin: { value: '68.820', change: '% 1,27', up: false },
        borsa: { value: '14.181', change: '% 0', up: false }
    };
    
    Object.keys(data).forEach(key => {
        const el = document.getElementById(key);
        if (el) el.textContent = data[key].value;
    });
}

// ==================== 
// MOBILE MENU - KAPANABİLİR!
// ====================
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    if (!menuToggle || !mainNav) return;
    
    // Overlay oluştur
    let overlay = document.querySelector('.menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
    }
    
    // Menü aç/kapat
    function toggleMenu() {
        mainNav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    }
    
    // Hamburger tıkla
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });
    
    // Overlay'e tıkla (kapat)
    overlay.addEventListener('click', toggleMenu);
    
    // Menü içindeki linklere tıkla (kapat)
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
    
    // ESC tuşu ile kapat
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            toggleMenu();
        }
    });
}

// ==================== 
// CATEGORY TABS 
// ====================
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    
    tabs.forEach(btn => {
        btn.addEventListener('click', () => {
            tabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentCategory = btn.dataset.cat;
            currentPage = 1;
            loadNews(currentCategory, currentPage);
        });
    });
}

// ==================== 
// LOAD MORE 
// ====================
function initLoadMore() {
    const loadMoreBtn = document.getElementById('load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            currentPage++;
            loadNews(currentCategory, currentPage);
        });
    }
}

// ==================== 
// INIT 
// ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Site başlatılıyor...');
    
    initSlider();
    initTicker();
    loadNews();
    loadPopular();
    loadEconomy();
    initMobileMenu();
    initCategoryTabs();
    initLoadMore();
    
    // AdSense
    if (typeof adsbygoogle !== 'undefined') {
        (adsbygoogle = window.adsbygoogle || []).push({});
    }
});


