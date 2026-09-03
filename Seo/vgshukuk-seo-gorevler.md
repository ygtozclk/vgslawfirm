# vgshukuk.com — SEO Görev Listesi

Bu dosya iki iş paketini kapsar: (1) 5 yeni SGK ilaç davası makalesi, (2) ictihat sayfalarının URL slug'larının konu bazlı hale getirilmesi. Claude Code bu dosyayı okuyup adım adım uygulayabilir.

---

## PAKET 1 — 5 Hazır Makaleyi Yayınla (yayınlar bölümü)

Mevcut durum: `/tr/yayinlar/` altında şu an sadece `trastuzumab-derukstekan-sgk-ilac-bedeli` ve `kvkk-uyum-programi` var. Aşağıdaki 5 makale zaten yazılmış halde teslim edildi (frontmatter'lı .md dosyaları) — iş bunları site yapısına (MDX/route + sitemap) entegre etmek, yeniden yazmak değil.

### Kaynak dosyalar ve slug'lar
1. **Perjeta (Pertuzumab)** — `perjeta-sgk-karsiliyor-mu.md` → `/tr/yayinlar/perjeta-sgk-karsiliyor-mu`
2. **Erbitux (Setuksimab)** — `erbitux-sgk-karsiliyor-mu.md` → `/tr/yayinlar/erbitux-sgk-karsiliyor-mu`
3. **Bevax (Bevasizumab)** — `bevax-sgk-karsiliyor-mu.md` → `/tr/yayinlar/bevax-sgk-karsiliyor-mu`
4. **Trodelvy (Sacituzumab Govitecan)** — `trodelvy-sgk-karsiliyor-mu.md` → `/tr/yayinlar/trodelvy-sgk-karsiliyor-mu`
5. **Prexet (Pemetreksed Disodyum)** — `prexet-sgk-karsiliyor-mu.md` → `/tr/yayinlar/prexet-sgk-karsiliyor-mu`

### Her makale için yapılacaklar
- [ ] Dosyayı sitenin `yayinlar` içerik dizinine (mevcut trastuzumab derukstekan makalesiyle aynı yapıda) kopyala/dönüştür.
- [ ] Frontmatter'daki `title`/`description` alanlarını sayfanın `<title>` ve meta description'ına eşle.
- [ ] Mevcut makalelerdeki gibi Article/FAQPage JSON-LD şemasını uygula (her makalede zaten "Sıkça Sorulan Sorular" bölümü var, en az 4-5 soru-cevap — FAQPage şemasına doğrudan aktarılabilir).
- [ ] `/en/yayinlar/` altında İngilizce çevirisini oluştur (mevcut ikili yapıyla tutarlı) — bu makalelerde İngilizce versiyon yok, ayrıca çevrilmesi gerekiyor.
- [ ] sitemap.xml'e otomatik girecek şekilde route yapısına ekle.
- [ ] İlgili ictihat kararlarına ve birbirlerine (ör. Bevax ↔ Trodelvy gibi benzer ilaç sınıfı) iç link ver.
- [ ] Ana `yayinlar` liste sayfasına yeni makaleleri ekle.

**Not:** İçerikler zaten hukuki/genel bilgilendirme çerçevesinde ve "bu içerik hukuki görüş niteliği taşımaz" uyarısını içeriyor — değiştirmeye gerek yok.

---

## PAKET 2 — İctihat Sayfası Slug Düzeltmesi

Mevcut durum: Bazı ictihat sayfaları zaten konu bazlı (`endikasyon-disi-ilac-belgeler`, `kanser-ilaci-yetkili-mahkeme`), bazıları hâlâ dava numarası bazlı:

- `/tr/ictihat/ygt-10hd-2025-3980`
- `/tr/ictihat/ygt-10hd-2025-10958`
- `/tr/ictihat/ygt-10hd-2025-11761`
- `/tr/ictihat/ygt-10hd-2025-8068`
- `/tr/ictihat/ygt-10hd-2025-3244`
- `/tr/ictihat/ygt-10hd-2024-10976`

### Yapılacaklar
1. **Her kararın içeriğini oku**, konusunu belirle (ör. hangi ilaç, hangi hukuki mesele — yetkili mahkeme, zamanaşımı, ihtiyati tedbir, endikasyon dışı kullanım vb.) ve konu bazlı bir slug öner (örn. `sgk-ilac-bedeli-zamanasimi-yargitay-karari`, `ihtiyati-tedbir-yargitay-karari` gibi — mevcut iki örnekle aynı isimlendirme mantığını kullan).
2. Aynı konuda birden fazla karar varsa slug'a ayırt edici ek yap (örn. `-2` veya kısa konu farkı).
3. **next.config.js** içindeki `redirects()` fonksiyonuna her eski URL → yeni URL için `permanent: true` (301) redirect ekle. En/tr her iki dil için de yap.
4. Sayfa içindeki `<title>` ve meta description'ları da slug'la tutarlı, konuyu yansıtan başlıklara güncelle.
5. Build sonrası sitemap.xml'in yeni slug'larla güncellendiğini doğrula, GSC'ye tekrar gönder.
6. Yayınlar sayfalarından bu kararlara verilen iç linkleri yeni slug'lara güncelle.

---

## Genel Notlar
- Tüm yeni sayfalarda mevcut JSON-LD (Article/FAQPage) şemasını koru.
- Baro reklam yönetmeliği çerçevesinde abartılı/karşılaştırmalı ifadelerden kaçın (mevcut sitedeki tondan sapma).
- Deploy sonrası GSC → URL Denetimi ile en az 2-3 yeni sayfada "Dizine ekleme isteği" gönder (Google'ın manuel taramasını hızlandırır).
