# BAYRAKSENDE'24 Final

## Soru İsmi:

´Köstebek´

### Kategori:
 - `Web`

### Soru:
```
TR:
Danışmanlık yaptığımız bir şirkette köstebek olduğundan şüpheleniyoruz. Daha fazla kanıt toplamak için köstebeğe fark ettirmeden hesabını ele geçirmemiz gerekiyor. Köstebeğin rutin olarak sitedeki blogları okuduğunu fark ettik. Köstebeğin hesabını ele geçirebilir misin?

Not: Ekiplerimiz köstebeğin kullanıcı adının "cibrx1453" olduğunu saptadı.
```


## Çözüm:

- İlk olarak bağlantıda verlen adrese gidildiğinde "Cibrx-Sec Blog" adında bir site ile karşılaşılır.
- Siteden gelen http dönütlerine bakıldığında Set-Cookie başlığı içerisinde çerez tanımlarken SameSite=None seçeneği kullanıldığı görülür(çerezlerin SameSite=None olarak tanımlanması CSRF zaafiyetlerine karşı siteyi savunmasız bırakır).
- <img src="https://github.com/LegendMan46/kostebek/blob/main/images/cookie.png">
- Kayıt Ol ve Giriş Yap sayfalarinin bulunmasının ardından bir kullanıcı oluşturularak sayfaya giriş yapılır.
- /my-account sayfası incelendiğinde mevcut kullanıcının şifresini değiştirebilen CSRF ataklarına karşı korunmasız bir fonksiyonun olduğu tespit edilir.
- <img src="https://github.com/LegendMan46/kostebek/blob/main/images/csrf.png">
- Site incelenmeye devam edildiğinde /blog/new adresinde yeni bloglar eklemek için bir fonksiyon olduğu farkedilir. Blog eklerken Fotoğraf Adresi adında bir girişin herhangi bir kontrol yapılmadan /blog sayfasındaki <img> taglarinin src bölümüne yerleştirildiği farkedilir.
- Fotoğraf adresi olarak kendimize ait bir adres verdiğimizde çerez bilgilerinin isteğe eklendiği ve http referer başlıkları aracılığı ile cibrx1453 kullanıcısının localhost:4607 sayfasi üzerinden sayfaya giriş yaptiği anlaşılmaktadır.
- <img src="https://github.com/LegendMan46/kostebek/blob/main/images/test_image.png">
- Bu keşifler üzerine yeni bir blog eklemek sureti ile fotoğraf adresi girişine 'https://localhost:4607/auth/change-password?newPassword=testPassword' yükü girilerek sayfayı ziyaret eden cibrx1453 kullanıcısına ait şifreyi testPassword yapan bir CSRF atağı gerçekleştirilir.
- Sitedeki oturum sonlandırılıp cibrx1453 - testPassword bilgileri ile tekrardan giriş yapılır. Siteyi incelemeye devam edildiği surette /chat adresi üzerinde flag doğrudan bulunabilir. 
  
