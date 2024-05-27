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

EN:
We suspect there is a mole in one of the companies we provide consulting for. To gather more evidence, we need to take over the mole's account without them noticing. We have noticed that the mole regularly reads the blogs on the site. Can you take over the mole's account?

Note: Our teams have determined that the mole's username is "cibrx1453".
```


## Çözüm:
´´´
- İlk olarak bağlantıda verlen adrese gidildiğinde "Cibrx-Sec Blog" adında bir site ile karşılaşılır. 
- Kayıt Ol ve Giriş Yap sayfalarinin bulunmasının ardından bir kullanıcı oluşturarak sayfaya giriş yapılır.
- /my-account sayfası incelendiğinde mevcut kullanıcının şifresini değiştirebilen CSRF ataklarına karşı korunmasız bir fonksiyonun olduğu tespit edilir
- Site incelenmeye devam edildiğinde /blog/new adresinde yeni bloglar eklemek için bir fonksiyon olduğu farkedilir
