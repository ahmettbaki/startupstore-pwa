# StartUpStore - PWA E-Ticaret Projesi

Bu proje, Web Tabanlı Mobil Uygulama Geliştirme dersi bütünleme ödevi olarak hazırlanmıştır. Proje, DummyJSON API kullanarak ürünleri listeleyen, detaylarını gösteren ve PWA (Progressive Web App) standartlarına uygun olarak **offline (çevrimdışı)** çalışabilen modern bir web uygulamasıdır.

##  Canlı Demo
Projenin canlı çalışan haline buradan ulaşabilirsiniz:
https://ahmettbaki.github.io/startupstore-pwa/

## Video Linki
https://www.youtube.com/watch?v=gVUdYBY8v-Y

##  Proje Özellikleri
* **API Entegrasyonu:** `fetch()` kullanılarak gerçek zamanlı ürün verileri çekilmektedir.
* **Arama Özelliği:** Kullanıcılar ürünler arasında anlık arama yapabilir.
* **PWA Desteği:** Uygulama telefona/bilgisayara kurulabilir (Installable).
* **Offline Mod:** İnternet kesildiğinde özel bir offline sayfası ve `sample.json` üzerinden yedek veriler gösterilir.
* **Responsive Tasarım:** Bootstrap 5 ile tüm cihazlara uyumlu arayüz.

## 🛠 Kullanılan Teknolojiler
* **HTML5 & CSS3:** Semantik yapı ve özelleştirilmiş stiller.
* **JavaScript (ES6+):** Asenkron veri çekme ve DOM manipülasyonu.
* **Bootstrap 5:** UI/UX tasarımı ve Grid sistemi.
* **DummyJSON API:** Ürün verileri için kullanılmıştır.

##  Ekran Görüntüleri

### 1. Ana Sayfa ve Vitrin
images/EkranGörüntüsü1

### 2. Offline Mod (İnternet Yokken)
images/EkranGörüntüsü2

##  API Kullanımı
Projede [DummyJSON](https://dummyjson.com/docs/products) kullanılmıştır.

**Örnek Endpoint:**
```javascript
// Vitrin ürünlerini çekmek için
fetch('[https://dummyjson.com/products?limit=4](https://dummyjson.com/products?limit=4)')