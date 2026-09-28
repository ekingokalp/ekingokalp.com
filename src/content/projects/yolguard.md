---
title: "YolGuard AI"
slug: "yolguard-ai"
subtitle: "Yolculuk öncesi risk karar destek sistemi"
description: "Rota, hava durumu, güneş etkisi ve sürücü özelliklerini bir araya getirerek yolculuk öncesi planlamayı destekleyen uygulama."
tags: ["Karar destek", "Risk modelleme"]
technologies: ["Python", "Streamlit", "REST API", "Gemini API"]
github: "https://github.com/ekingokalp/YolGuard-AI"
featured: true
featuredOrder: 1
order: 1
# TODO: Doğrulanmış tarih, canlı demo ve ekran görüntüsü varsa ekleyin.
---
## Yola çıkmadan önce daha geniş bir bakış

YolGuard AI, yolculuğu etkileyen farklı koşulları tek bir değerlendirmede bir araya getirmek için geliştirdiğim bir karar destek uygulaması. Rota, hava durumu, güneş etkisi, sürücü deneyimi ve araç özelliklerini birlikte ele alıyor.

Alternatif çıkış saatleri için **0–100 aralığında deterministik bir yolculuk risk skoru** üretiyor. Böylece yolculuk öncesi planlamada farklı zaman seçeneklerini karşılaştırmayı sağlıyor.

## Neler içeriyor?

- OpenStreetMap / OSRM üzerinden rota verisi ve etkileşimli rota görselleştirme.
- Open-Meteo ile hava durumu verilerinin değerlendirmeye katılması.
- Maliyet tahmini ve hazırlık kontrol listesi.
- Gemini API üzerinden yapay zekâ destekli seyahat raporu.

## Geliştirme odağı

Python ve Streamlit ile uygulama geliştirme, farklı REST API’lerini birleştirme ve risk modelleme bu çalışmanın temel bileşenleri. Uygulamanın kaynak kodu GitHub üzerinde yer alıyor.
