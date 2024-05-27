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
- Kayıt Ol ve Giriş Yap sayfalarinin bulunmasının ardından bir kullanıcı oluşturularak sayfaya giriş yapılır.
- /my-account sayfası incelendiğinde mevcut kullanıcının şifresini değiştirebilen CSRF ataklarına karşı korunmasız bir fonksiyonun olduğu tespit edilir.
- Site incelenmeye devam edildiğinde /blog/new adresinde yeni bloglar eklemek için bir fonksiyon olduğu farkedilir.
  
