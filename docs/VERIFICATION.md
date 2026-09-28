# Doğrulama kaydı

9 Eylül 2026. Kontroller yayıma hazırlanan kaynak üzerinde yapıldı.

- Astro statik build başarılı.
- Başlangıç içeriğiyle 8 HTML sayfası: ana sayfa, 3 arşiv, 3 çalışma detayı ve 404.
- İç bağlantılar, sayfa içi fragmentler, yerel asset referansları, metadata, JSON-LD, sitemap ve robots.txt `npm run verify` ile doğrulandı.
- Üretilen site 0 istemci JavaScript dosyası içeriyor. İçerik ve navigasyon statik HTML olarak mevcut.
- Geçici deneyim, iç blog yazısı, kişisel çalışma ve yeni bir kategori eklenerek 15 sayfalık build yapıldı. Menü, arşiv, detay ve öne çıkan seçimi otomatik oluştu.
- Taslak içeriğin ve harici blog kartlarının yerel detaylarının üretilmediği doğrulandı.
- Geçici görsel üzerinden WebP çıktıları, srcset/sizes, alt metin ve sosyal görsel metadata’sı doğrulandı.
- Chromium tarayıcısında masaüstü ana sayfa, 390px açık/koyu ve 320px açık tema çerçevelerinde mobil görünüm incelendi. Çerçeveler scrollbar nedeniyle 375px ve 305px kullanılabilir içerik genişliği bildirdi; yatay taşma yoktu.
- 320px çerçevede kök yazı boyutu yüzde 200 yapılarak metin büyütme kontrol edildi. Bulunan bölüm başlığı taşması giderildi.
- Proje ve araştırma detaylarına bağlantı üzerinden geçiş, dar ekranda yerleşim ve klavyeyle İçeriğe geç bağlantısının main odağı kontrol edildi.
- İncelenen tarayıcı konsolunda uygulamaya ait hata görülmedi. Tarayıcının kendi uzantısına ait kayıtlar site hatası olarak değerlendirilmedi.
- Bütün geçici içerik, görsel, kategori ve tarayıcı kontrol sayfaları son build öncesinde kaldırıldı.

Bu kontroller kapsamlı bir WCAG sertifikasyonu veya tüm fiziksel cihazlarda test anlamına gelmez. Harici GitHub ve LinkedIn hizmetlerinin canlı yanıtları bu ortamda doğrulanamadı; adresler kullanıcının CV’sinden alındı. Blog ve iletişim sayfaları web üzerinden doğrulandı.
