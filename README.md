# Ekin Gökalp · ekingokalp.com

Ekonomi, veri analizi, akademik araştırmalar, yazılar ve kişisel üretimler için statik kişisel web sitesi.

**Başlangıç:** Node.js 24 kurun. Proje klasöründe `npm ci`, ardından `npm run dev` çalıştırın. Terminalde gösterilen yerel adresi açın.

## Mimari ve nedenleri

Astro 7 + Markdown + küçük JSON dosyaları. Build sırasında içerikler HTML sayfalarına dönüştürülür; yayımlanan sitenin backend, veritabanı veya Node.js sunucusuna ihtiyacı yoktur. Node.js yalnızca geliştirme ve build için kullanılır.

- Tek doğrudan uygulama bağımlılığı Astro’dur. Sürümler `package-lock.json` ile sabitlenmiştir.
- İstemci tarafında JavaScript, takip sistemi, çerez, iletişim formu veya üçüncü taraf font isteği yoktur.
- Açık/koyu tema, işletim sisteminin tercihini CSS ile izler. Ayrıca bir tema düğmesi veya tarayıcı depolaması gerekmez.
- Markdown frontmatter doğrulanır; hatalı slug, tarih, yinelenen URL veya eksik görsel açıklaması build’i durdurur.
- İçerikler tek ortak koleksiyonda okunur, anlaşılır klasörlerle düzenlenir. Bölüm tanımları `src/data/sections.json` içindedir. Ortak liste/detay şablonları yeni kategorileri de destekler.
- Yeni Markdown içerik eklemek için HTML veya component düzenlemek gerekmez.
- Sitemap ve robots.txt içeriklerden ve site adresinden build sırasında oluşturulur.

Markdown, bu aşamadaki metin, liste, bağlantı, görsel ve tablo gereksinimlerini karşılar. MDX bağımlılığı eklenmedi. İleride yazı içinde etkileşimli bileşen gerekirse `@astrojs/mdx` eklenip koleksiyon kalıbı genişletilebilir; mevcut Markdown içerikleri aynı kalır.

## Dosyalar nerede?

| Düzenlenecek içerik | Konum |
| --- | --- |
| Ad, hero, sosyal bağlantılar, beceriler, ilgi alanları ve iletişim | `src/data/site.json` |
| Hakkımda metni | `src/content/about/ekin.md` |
| GitHub / yazılım projeleri | `src/content/projects/` |
| İş deneyimleri | `src/content/experience/` |
| Eğitim | `src/content/education/` |
| Araştırmalar | `src/content/research/` |
| İç yazılar ve harici blog kartları | `src/content/blog/` |
| Tekne, fotoğraf ve diğer kişisel çalışmalar | `src/content/personal-projects/` |
| Bölüm adı, menü, sıra ve URL kökü | `src/data/sections.json` |
| Optimize edilecek görseller | `src/assets/` |
| Olduğu gibi sunulacak dosyalar | `public/` |
| Altı kopyalanabilir şablon | `templates/` |
| Renk, tipografi ve sayfa düzeni | `src/styles/global.css` |
| GitHub Pages dağıtımı | `.github/workflows/deploy.yml` |
| Kaynak bilgileri ve editoryal TODO’lar | `docs/CONTENT-SOURCES.md` |

`dist/` üretilen sitedir. Buradaki HTML’leri düzenlemeyin; sonraki build değişiklikleri siler. `node_modules/`, `dist/`, `.astro/` ve `.env` dosyalarını GitHub’a yüklemeyin.

## İçerik nasıl güncellenir?

Günlük işiniz şu: **doğru klasörde bir `.md` dosyası aç → şablonu kopyala → bilgileri yaz → `draft: false` yap → kaydet/commit et.** GitHub Actions kurulduktan sonra `main` dalına her commit siteyi yeniden üretir ve yayımlar. Markdown dosyasını tek başına canlı sunucuya yüklemek siteyi güncellemez; build gerekir.

GitHub web arayüzünde klasöre girip **Add file → Create new file** seçebilirsiniz. Mevcut bir dosyayı değiştirmek için dosyayı açıp kalem simgesini kullanın. Sonunda **Commit changes** ile kaydedin. Yeni içerikler için kod editörü şart değildir.

### Yeni GitHub projesi

1. `src/content/projects/` klasörüne gidin.
2. `proje-adi.md` adlı dosya oluşturun.
3. `templates/project.md` içeriğini kopyalayın.
4. `title`, `slug`, `description`, varsa `github`, `website` ve `technologies` alanlarını doldurun.
5. İki `---` çizgisinin altına Markdown açıklamanızı yazın.
6. `draft: false` yapıp kaydedin.

En küçük örnek (TODO’ları gerçek bilgilerle değiştirin):

```yaml
---
title: "TODO: Projenin adı"
slug: "yeni-proje"
description: "TODO: Projenin kısa açıklaması"
github: "https://github.com/ekingokalp/DEPO-ADI"
technologies: ["Python"]
featured: false
draft: true
---
```

Yayımladığınızda `/projects/yeni-proje/`, proje listesi ve sitemap otomatik oluşur. `featured: true` ayrıca ana sayfanın öne çıkanlarına aday yapar.

### Yeni iş deneyimi

1. `src/content/experience/` içine `kurum-pozisyon.md` oluşturun.
2. `templates/experience.md` şablonunu kopyalayın.
3. Pozisyonu, kurumu ve gerçek başlangıç/bitiş tarihlerini yazın.
4. Devam eden iş için `endDate: "present"` kullanın.
5. Görev ve katkıları metin olarak ekleyin; `draft: false` yapın.

İlk yayımlanmış deneyim, ana sayfadaki **Deneyim**, menü bağlantısı, `/experience/` arşivi ve detay sayfasını otomatik açar. Önceden boş bölüm görünmez.

### Yeni blog yazısı

1. `src/content/blog/` içine `yazi-basligi.md` oluşturun.
2. `templates/blog.md` şablonunu kopyalayın.
3. Başlık, sabit slug, özet ve gerçek yayın tarihini yazın; örnek biçim `date: "2026-09-09"`.
4. Yazıyı Markdown olarak altına ekleyin.
5. `externalUrl` alanı kullanmayın ve `draft: false` yapın.

Yazı `/blog/yazi-basligi/` adresinde yayımlanır.

**Başka blogdaki yazıya kart eklemek için:** aynı dosyada `externalUrl: "https://ekingokalp.tr/yazinin-tam-adresi/"` ekleyin. Kart doğrudan özgün yazıya gider; boş bir yerel detay sayfası üretilmez. Başlık, tarih, özet, etiket ve kapak yine kullanılabilir.

**Blogu daha sonra taşımak için:** aynı Markdown dosyasına tam yazıyı ekleyip `externalUrl` satırını kaldırın. `slug` değerini koruyun; site içindeki kalıcı URL hazırdır. Eski blog alan adındaki 301 yönlendirmeleri eski sunucuda ayrıca yapılmalıdır; bu proje başka bir sunucunun yönlendirmesini kendiliğinden değiştiremez.

### Eğitim, araştırma ve kişisel çalışma

| İçerik | Hedef klasör | Kopyalanacak şablon |
| --- | --- | --- |
| Eğitim | `src/content/education/` | `templates/education.md` |
| Araştırma | `src/content/research/` | `templates/research.md` |
| Kişisel çalışma | `src/content/personal-projects/` | `templates/personal-project.md` |

Örneğin SCAMP çalışmasını gerçekten başlattığınızda `personal-projects/scamp.md` oluşturup kendi notlarınızı ekleyebilirsiniz. Şimdilik site böyle bir çalışmanın yapılmış olduğunu iddia etmez. İlk içerikle `/explorations/` ve menü bağlantısı açılır.

### Görsel eklemek

1. Görseli örneğin `src/assets/yolguard/kapak.jpg` olarak kaydedin.
2. `src/content/projects/yolguard.md` dosyasına şunları ekleyin:

```yaml
image: "../../assets/yolguard/kapak.jpg"
imageAlt: "YolGuard AI uygulamasında rota değerlendirmesi ekranı"
```

Yol, Markdown dosyasının konumuna göredir. Daha derin klasör kullanırsanız `../` sayısı değişir. Kart ve detay görselleri Astro tarafından optimize edilir; WebP, `srcset`, `sizes`, en/boy ve uygun yükleme davranışı üretilir. Kart görselleri lazy loading kullanır. Alt metni görselde gerçekten görülen şeyi açıklayacak biçimde yazın.

Yazı gövdesindeki görseller için normal Markdown kullanılabilir:

```markdown
![Atölyede çalışmanın ilgili aşaması](../../assets/scamp/asama-01.jpg)
```

Astro yerel Markdown görsellerini de işleyebilir. Kapak görsellerindeki responsive bileşen, gövde içindeki standart Markdown görsellerinden ayrıdır; tüm görseller CSS ile kapsayıcıya uyarlanır. Büyük fotoğrafları ham kamera çıktısı olarak eklemek yerine makul çözünürlükte dışa aktarın. Dosya adlarında kısa, küçük harfli ASCII isimler tercih edin.

PDF gibi indirilebilir dosyaları `public/files/` içine koyup `/files/dosya.pdf` ile bağlayın. `public/` altındaki her dosya aynen yayımlanır. Başlangıç CV PDF’si telefon içerdiği için projeye kopyalanmadı.

### Frontmatter alanları

Bütün içeriklerde yalnızca `title`, `slug` ve `description` zorunludur. Yayımlanmış blog yazılarında `date` de zorunludur. Diğer alanları ihtiyacınıza göre kullanın.

| Alan | Görevi |
| --- | --- |
| `title`, `subtitle`, `description` | Başlık, isteğe bağlı alt başlık ve özet |
| `slug` | Başlıktan bağımsız kalıcı URL parçası |
| `date`, `updated` | Yayın/çalışma tarihi ve varsa güncelleme tarihi |
| `startDate`, `endDate` | Eğitim/deneyim dönemi; bitiş için `present` kabul edilir |
| `tags`, `technologies` | İsteğe bağlı listeler |
| `github`, `website` | Depo ve proje sitesi |
| `externalUrl` | Harici yazı/kaynak kartı; yerel detay üretilmez |
| `image`, `imageAlt` | Yerel kapak dosyası ve zorunlu açıklaması |
| `featured`, `featuredOrder` | Ana sayfa seçimi ve öne çıkanların sırası |
| `order` | Bölüm içi sıra; küçük sayı önce gelir |
| `status` | Serbest metin: örneğin Planlama, Tamamlandı |
| `draft` | `true` ise HTML, menü, arşiv ve sitemap dışında kalır |
| `organization`, `role`, `degree`, `grade`, `achievements` | Eğitim/deneyim alanları |
| `extra` | Detay sayfasında gösterilecek ek anahtar/değerler |

Tarihleri tırnak içinde yazın. `"2026"`, `"2026-09"` ve `"2026-09-09"` desteklenir. Yalnızca yılı bilinen çalışmaya hayali gün/ay eklemeyin. SEO’daki yayın tarihi alanı tam gün bilgisi varsa üretilir.

`draft` bir erişim kontrolü değildir. Taslaklar HTML’e dönüşmez ama kaynak GitHub deposu herkese açıksa Markdown dosyalarını herkes okuyabilir. Yayımlamak istemediğiniz özel bilgileri kaynak depoya da koymayın.

### Sıralama ve öne çıkanlar

- Bölüm içi sıra: `order` küçükten büyüğe → tarih yeniden eskiye → başlık alfabetik.
- Tarih karşılaştırmasında `startDate`, yoksa `date`, yoksa `endDate` kullanılır.
- Varsayılan `order: 100`. Tarih sırası istiyorsanız aynı order değerini bırakın.
- Öne çıkanlar: `featured: true` → `featuredOrder` küçükten büyüğe → normal sıra.
- Ana sayfada en fazla üç öne çıkan gösterilir. Bölüm listeleri `homeLimit` kadar içerik gösterir; arşivde tümü bulunur. `homeLimit: 0` sınırı kaldırır.
- Bölümlerin ana sayfa ve menü sırası `sections.json` dosyasındaki sıradır.
- Hiç yayımlanmış içeriği olmayan bölüm için menü, bölüm veya arşiv sayfası üretilmez.

## Tamamen yeni bir içerik türü

Önce mevcut esnek **Keşifler** bölümünün yeterli olup olmadığını değerlendirin. Bağımsız bir bölüm istiyorsanız:

1. Örneğin `src/content/photography/` klasörünü oluşturun.
2. `src/data/sections.json` dizisinin sonuna aşağıdaki kaydı ekleyin:

```json
{
  "folder": "photography",
  "route": "photography",
  "title": "Fotoğraf",
  "singular": "Fotoğraf çalışması",
  "description": "Fotoğraf serileri ve görsel çalışmalar.",
  "archive": true,
  "detail": true,
  "home": true,
  "homeLimit": 3,
  "nav": true,
  "kind": "exploration"
}
```

3. Klasöre `title`, `slug`, `description` içeren Markdown dosyaları ekleyin.

Yeni menü, ana sayfa bölümü, arşiv, detaylar ve sitemap için component veya route kodu değişmez. `kind` sunum tercihidir: `project`, `research`, `article`, `experience`, `education`, `exploration`. Yeni bir konu için yeni bir teknik içerik tipi icat etmek gerekmez. `extra` ile farklı metadata gösterilebilir.

`folder` ve `route` değerleri benzersiz olmalıdır. `about` sistemde Hakkımda içeriğine ayrılmıştır. Yayın yaptıktan sonra `route` değişikliği önceki URL’leri değiştirir; kategori adını değiştirmek için yalnızca `title` / `singular` alanlarını düzenleyin.

## Yerel geliştirme ve build

Node.js 24 ve npm ile:

```bash
npm ci
npm run dev
```

Üretim dosyalarını üretmek ve kontrol etmek için:

```bash
npm run build
npm run verify
npm run preview
```

`preview`, build edilmiş `dist/` çıktısını yerel olarak sunar. Komutların gösterdiği adresi tarayıcıda açın. Durdurmak için `Ctrl+C` kullanın.

`verify`, üretilmiş HTML’de iç bağlantıları, fragmentleri, asset dosyalarını, başlık hiyerarşisini, metadata’yı, JSON-LD’yi, sitemap’i ve taslak işaretlerini kontrol eder. Harici hizmetlerin çalıştığını veya WCAG uygunluğunu bütünüyle garanti eden bir araç değildir. Tasarıma etkileşimli JavaScript eklenirse sıfır JS kontrolü de bilinçli olarak güncellenmelidir.

İçerik eklerken YAML girintisine dikkat edin. Listeler için `tags: ["Ekonometri", "Panel veri"]` biçimi pratiktir. Ana başlık otomatik üretilir; metindeki ilk başlık `##` ile başlasın. Şablonlardaki TODO’ları yayımlamadan önce doldurun.

## GitHub’a nasıl koyacağım?

GitHub Pages bu siteye uygundur: statik dosyalar yeterli, mevcut GitHub hesabınızla kaynaklar ve yayın birlikte yönetilebilir. GitHub Free’de Pages için public depo kullanılır; özel depoların Pages desteği hesap planına bağlıdır.

**GitHub Desktop ile kolay yol:**

1. Teslim edilen kaynak projenin ZIP’ini açın.
2. GitHub Desktop’ta **File → Add local repository** ile klasörü seçin. Git deposu bulunmadığını söylerse aynı klasörde repository oluşturun.
3. Dosyaları commit edin ve **Publish repository** seçin. Depo adı `ekingokalp.com` olabilir.
4. Ücretsiz Pages kullanacaksanız kaynakların public olacağını dikkate alarak repository görünürlüğünü seçin.
5. GitHub’da **Settings → Pages → Build and deployment → Source → GitHub Actions** seçin.
6. **Actions** sekmesinden iş akışını çalıştırın veya `main` dalına bir commit gönderin.

**Terminal alternatifi:** GitHub’da boş `ekingokalp.com` deposu oluşturduktan sonra, kaynak klasöründe:

```bash
git init -b main
git add .
git commit -m "Kişisel web sitesi"
git remote add origin https://github.com/ekingokalp/ekingokalp.com.git
git push -u origin main
```

Bu komutlar GitHub deponuz yoksa kendiliğinden oluşturmaz. GitHub Desktop oturum açmayı kolaylaştırır. README, kod, Markdown, şablonlar, `public/`, `package.json` ve kilit dosyası birlikte yüklenmelidir. Projeyi yeniden yüklemek yerine sonrasında ilgili `.md` dosyasını düzenlemeniz yeterlidir.

Kaynak ZIP’i Git geçmişi, platform kimliği, bağımlılıklar ve CV PDF’si içermez. Çalışan siteyi sağlayan özel önizleme, GitHub hesabınıza yapılmış bir yayın değildir. Bu görevde GitHub hesabınızda depo açılmadı ve alan adı DNS’i değiştirilmedi.

## ekingokalp.com alan adını bağlamak

Bu proje alan adının **kökünde** çalışacak şekilde ayarlanmıştır. `astro.config.mjs` içindeki `site` ve `src/data/site.json` içindeki `siteUrl`, `https://ekingokalp.com` değerini kullanır. `/repository-name/` taban yolu yoktur. Alan adı bağlı değilken `username.github.io/depo/` gibi bir alt yolda test etmek isterseniz base-path desteği ayrıca uyarlanmalıdır; mevcut paket custom domain içindir.

1. GitHub hesap ayarlarında **Pages → Add a domain** ile `ekingokalp.com` alan adını doğrulayın; GitHub’ın verdiği TXT kaydını DNS paneline ekleyin.
2. Site deposunda **Settings → Pages → Custom domain** alanına `ekingokalp.com` yazıp kaydedin.
3. Alan adınızın DNS panelinde aşağıdaki kayıtları yapılandırın. Başka bir servise ait e-posta MX/TXT kayıtlarını değiştirmeyin. Eski siteye yönlenen çakışan `@` A/AAAA/ALIAS kayıtlarını ancak bu siteye geçmeye hazırken değiştirin.

| Tür | Ad / Host | Değer |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | ekingokalp.github.io |

4. DNS doğrulaması ve sertifika hazır olduğunda **Enforce HTTPS** seçeneğini açın. DNS yayılımı ve sertifika hazırlığı zaman alabilir.
5. Hem `https://ekingokalp.com` hem `https://www.ekingokalp.com` adreslerini kontrol edin. GitHub doğru DNS kayıtlarıyla `www` adresini seçtiğiniz kök alan adına yönlendirir.

`public/CNAME` ve `.nojekyll` dosyaları hazırdır. **GitHub Actions ile dağıtımda CNAME dosyası domain ayarının yerine geçmez; esas ayar Pages ekranındaki Custom domain alanıdır.** IPv6 kullanacaksanız güncel AAAA kayıtlarını resmî GitHub kılavuzundan alın.

Resmî kaynaklar: [GitHub özel alan adı kılavuzu](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [Astro’yu GitHub Pages’e dağıtma](https://docs.astro.build/en/guides/deploy/github/). Kontrol tarihi: 9 Eylül 2026.

## SEO ve URL sürekliliği

Her sayfada başlık, açıklama, canonical, Open Graph ve X card alanları bulunur. Mevcut bir kapak görseli varsa ilgili içeriğin sosyal metadata’sına da eklenir. Uydurma veya jenerik sosyal görsel oluşturulmadı. Person, WebSite ve WebPage JSON-LD’si ortak; GitHub projesinde SoftwareSourceCode, iç yazıda BlogPosting, araştırma/diğer çalışmalarda CreativeWork kullanılır. Akademik çalışma, doğrulanmış bir yayın olmadığı için hakemli makale gibi işaretlenmez.

`slug` dosya adından ve başlıktan bağımsızdır. Dosyayı yeniden adlandırırken slug’ı koruyun. Bir içeriği farklı URL kökü olan bölüme taşımanın URL’yi değiştireceğini unutmayın. Eski adresleri korumak için taşımayın veya yönlendirme planı yapın. GitHub Pages sunucu düzeyinde özel 301 kuralı sunmaz; çok sayıda yönlendirme gerektiğinde uygun bir statik hosting hizmeti seçmek gerekebilir.

Sitemap yalnızca gerçekten üretilen sayfaları içerir. Taslaklar, boş bölümler, harici yazı kartlarının hayali yerel adresleri ve 404 sayfası sitemap’e girmez.

## Hangi durumlarda kod değişir?

**Gerekmez:** yeni proje, deneyim, eğitim, araştırma, yazı, kişisel çalışma; metin, bağlantı, etiket, durum, sıralama ve öne çıkarma güncellemeleri. Yeni bölüm için yalnızca `sections.json` ve içerik klasörü yeterlidir.

**Gerekebilir:** yepyeni görsel sayfa düzeni, büyük fotoğraf galerisi, etkileşimli hesaplayıcı, arama/filtreleme, çok dil, MDX bileşenleri, sayfalama, içerik şemasını aşan karmaşık veri, hosting kökünden alt yola taşıma veya gerçek gönderim yapan iletişim formu. Bu özellikler istenirse bağımsız eklenebilir; mevcut içeriklerin yeniden yazılması gerekmez.

Onlarca içerik mevcut arşivlerde çalışır. Çok büyük bir arşivde daha iyi gezinme için sayfalama/arama eklemek bir kullanıcı deneyimi geliştirmesidir; temel Markdown mimarisinin yeniden kurulmasını gerektirmez. Bakımı düşük tutmak, bağımlılıkları hiç güncellememek anlamına gelmez: güncellemeleri aralıklı olarak ayrı bir dalda build ve kontrol ile değerlendirin.

## İçerik kaynakları

Başlangıç bilgileri yüklenen `Ekin_Gokalp_CV.pdf` dosyasından ve Ekin’in mevcut blogundaki doğrulanmış yazı sayfalarından alınmıştır. Telefon, açık adres, yaş veya gereksiz özel bilgi eklenmemiştir. Ayrıntılar ve tamamlanmayı bekleyen gerçek bilgiler `docs/CONTENT-SOURCES.md` içindedir.
