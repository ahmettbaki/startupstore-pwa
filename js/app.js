const API_URL = "https://dummyjson.com/products";

// --- SAYFA YÜKLENDİĞİNDE ÇALIŞACAK BLOK ---
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Ana Sayfa Vitrini (Featured)
    if (document.getElementById("featured-products")) {
        getFeaturedProducts();
    }

    // 2. Ürünler Sayfası (Products)
    if (document.getElementById("products-container")) {
        // URL'de arama var mı? (?search=kalem gibi)
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');

        if (searchQuery) {
            document.getElementById("page-title").innerText = `"${searchQuery}" Sonuçları`;
            searchProductsFromAPI(searchQuery);
        } else {
            getAllProducts();
        }
    }

    // 3. Detay Sayfası (Detail)
    if (document.getElementById("product-detail")) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        if(productId) {
            getProductDetail(productId);
        }
    }
});

/* --- API FONKSİYONLARI --- */

// Vitrin (İlk 4 Ürün)
async function getFeaturedProducts() {
    const container = document.getElementById("featured-products");
    try {
        const res = await fetch(`${API_URL}?limit=4`);
        if(!res.ok) throw new Error("API Hatası");
        
        const data = await res.json();
        renderProducts(data.products, container);
    } catch (err) { 
        showError(container); // Hata varsa B planını çalıştır
    }
}

// Tüm Ürünler (Sayfada 12 tane)
async function getAllProducts() {
    const container = document.getElementById("products-container");
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div></div>';
    try {
        const res = await fetch(`${API_URL}?limit=12`);
        if(!res.ok) throw new Error("API Hatası");

        const data = await res.json();
        renderProducts(data.products, container);
    } catch (err) { 
        showError(container); 
    }
}

// Kategori Filtreleme
async function getProductsByCategory(category) {
    const container = document.getElementById("products-container");
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div></div>';
    try {
        const res = await fetch(`${API_URL}/category/${category}`);
        if(!res.ok) throw new Error("API Hatası");

        const data = await res.json();
        renderProducts(data.products, container);
    } catch (err) { 
        showError(container); 
    }
}

// Arama Yapma
async function searchProductsFromAPI(query) {
    const container = document.getElementById("products-container");
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div></div>';
    try {
        const res = await fetch(`${API_URL}/search?q=${query}`);
        if(!res.ok) throw new Error("API Hatası");

        const data = await res.json();
        if(data.products.length === 0) {
            container.innerHTML = '<div class="alert alert-warning">Ürün bulunamadı.</div>';
        } else {
            renderProducts(data.products, container);
        }
    } catch (err) { 
        showError(container); 
    }
}

// Detay Getirme
async function getProductDetail(id) {
    const container = document.getElementById("product-detail");
    container.innerHTML = '<div class="col-12 text-center"><div class="spinner-border text-primary"></div></div>';
    try {
        const res = await fetch(`${API_URL}/${id}`);
        if(!res.ok) throw new Error("API Hatası");

        const product = await res.json();
        
        container.innerHTML = `
            <div class="col-md-5">
                <img src="${product.thumbnail}" class="img-fluid rounded shadow w-100" alt="${product.title}">
            </div>
            <div class="col-md-7 mt-4 mt-md-0">
                <span class="badge bg-secondary mb-2">${product.category}</span>
                <h2>${product.title}</h2>
                <p class="lead text-muted">${product.description}</p>
                <h3 class="text-primary my-3">${product.price} $</h3>
                <p><strong>Stok:</strong> ${product.stock} adet</p>
                <button class="btn btn-primary btn-lg w-100 mt-3">Sepete Ekle</button>
            </div>
        `;
    } catch (err) { 
        // Detay sayfasında sample.json göstermek yerine uyarı verelim
        container.innerHTML = `<div class="alert alert-danger">Bu ürünün detayları şu an yüklenemiyor. Lütfen internet bağlantınızı kontrol edin.</div>`;
    }
}

/* --- YARDIMCI FONKSİYONLAR --- */

// Ürünleri Ekrana Basma (Kart Oluşturucu)
function renderProducts(products, container) {
    container.innerHTML = "";
    products.forEach(p => {
        container.innerHTML += `
            <div class="col-md-3 col-sm-6">
                <div class="card h-100 shadow-sm">
                    <img src="${p.thumbnail}" class="card-img-top p-3" alt="${p.title}" style="height: 200px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-truncate">${p.title}</h5>
                        <p class="card-text fw-bold text-primary">${p.price} $</p>
                        <a href="detail.html?id=${p.id}" class="btn btn-outline-primary mt-auto">İncele</a>
                    </div>
                </div>
            </div>
        `;
    });
}

// --- HATA YÖNETİMİ VE B PLANI (SAMPLE JSON) ---
async function showError(container) {
    console.log("API Hatası oluştu, B planına geçiliyor...");
    
    // 1. Kullanıcıya bilgi ver
    container.innerHTML = `
        <div class="col-12 mb-3">
            <div class="alert alert-warning">
                <strong>Bağlantı Hatası:</strong> Canlı verilere erişilemiyor. Çevrimdışı (Demo) veriler gösteriliyor.
            </div>
        </div>
    `;

    // 2. Sample.json dosyasını çekmeye çalış
    try {
        const res = await fetch('./data/sample.json');
        const data = await res.json();
        
        // 3. Demo ürünleri ekrana bas (Hafif soluk yapalım ki anlaşılsın)
        data.products.forEach(p => {
            container.innerHTML += `
                <div class="col-md-3 col-sm-6">
                    <div class="card h-100 border-warning" style="opacity: 0.9;">
                        <div class="card-header bg-warning text-dark small">OFFLINE MOD</div>
                        <img src="${p.thumbnail}" class="card-img-top p-3" alt="${p.title}" style="height: 200px; object-fit: contain;">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title text-truncate">${p.title}</h5>
                            <p class="card-text fw-bold">${p.price} $</p>
                            <button class="btn btn-secondary mt-auto" disabled>İncelenemez</button>
                        </div>
                    </div>
                </div>
            `;
        });

    } catch (fallbackErr) {
        // Sample.json bile yoksa
        container.innerHTML += `<div class="alert alert-danger">Kritik Hata: Yedek verilere de ulaşılamıyor.</div>`;
    }
}

// Navbar'daki Arama Butonu
function searchProduct() {
    const query = document.getElementById("searchInput").value;
    if (query) {
        window.location.href = `products.html?search=${query}`;
    }
}

// --- PWA SERVICE WORKER KAYDI ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then((reg) => console.log('SW Kayıt Başarılı:', reg.scope))
            .catch((err) => console.log('SW Kayıt Hatası:', err));
    });
}