const CACHE_NAME = "startup-store-v2"; 
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./products.html",
    "./offline.html",
    "./css/style.css",
    "./js/app.js",
    "./data/sample.json", 
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
];

// 1. KURULUM (Install)
self.addEventListener("install", (event) => {
    // Yeni SW kurulurken beklemeyi atla (Hemen aktif ol)
    self.skipWaiting(); 
    
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Dosyalar önbelleğe alınıyor...");
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. AKTİF OLMA (Activate)
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Eski cache silindi:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    // Sayfaların kontrolünü hemen ele al
    self.clients.claim(); 
});

// 3. YAKALAMA (Fetch) - Offline Stratejisi
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // İnternet yoksa buraya düşeriz
                return caches.match(event.request)
                    .then((response) => {
                        if (response) {
                            return response; // Cache'de varsa (resim, css vs) ver
                        } else {
                            // Cache'de yoksa VE istenen şey bir HTML sayfasıysa
                            // (Yani kullanıcı yeni bir sayfaya gitmeye çalışıyorsa)
                            if (event.request.mode === 'navigate') {
                                return caches.match("./offline.html"); // <--- OFFLINE SAYFASINI GÖSTER
                            }
                        }
                    });
            })
    );
});