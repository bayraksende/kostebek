const express = require('express')
const router = express.Router()
const path = require('path')
const { Users, Blogs } = require('../models/User');
const validateBlogData = require('../modules/validator');
const pupp = require('../modules/adminBlog')

function getCookies(cookieString) {
    // Çerezler boş bir nesne olarak başlatılır
    const cookies = {};

    // Çerezlerin anahtar-değer çiftleri ayıklanır ve nesneye eklenir
    cookieString.split(';').forEach(cookie => {
        const [key, value] = cookie.split('=').map(c => c.trim());
        cookies[key] = value
    });

    return cookies;
}

router.get('/', (req, res) => {
    const cookies = getCookies(req.headers.cookie);
    const cibrxValue = cookies['adminim'];
    
    if (req.session.username || cibrxValue == 'ibocan') {
        res.render('blog.ejs')
    } else {
        res.status(302).redirect('/login')
    }
})

router.get('/new', (req, res) => {
    if (req.session.username) {
        res.render('add-blog.ejs')
    } else {
        res.status(302).redirect('/login')
    }
})

router.post('/new', async (req, res) => {
    const { title, content, image } = req.body;

    // Verileri doğrula
    const { valid, errors } = validateBlogData({ title, content, image });
    if (valid) {
        return res.status(400).json({ message: 'Geçersiz blog verisi', errors });
    }

    try {
        // Kullanıcının oturumda olduğunu kontrol et
        if (!req.session.username) {
            return res.status(401).json({ message: 'Oturum açılmamış' });
        }

        // Blog oluştur
        await Blogs.create({
            title,
            content,
            image,
            author: req.session.username // Oturumda bulunan kullanıcıyı blog yazarı olarak ayarla
        });

        pupp()

        res.status(201).json({ message: 'Blog oluşturuldu' });
    } catch (error) {
        console.log('Error', error)
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
});

router.get('/get-content', async (req, res) => {
    const all = await Blogs.findAll()
    res.send(all)
})


router.prefix = '/blog'
module.exports = router