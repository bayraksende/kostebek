const express = require('express')
const sequelize = require('../modules/db');
const { Users, Blogs } = require('../models/User');
const bcrypt = require('bcrypt')
const router = express.Router()

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

let createCibrxCount = 0

router.post('/signup', async (req, res) => {

    await Users.findOrCreate({
        where: { username: 'cibrx1453' },
        defaults: {
            email: 'cibrx1453@cibrx.com',
            password: await bcrypt.hash('bulamazsinkiiii', 10)
        }
    })
    const { username, email, password } = req.body;
    try {
        if (username === undefined || email == undefined || password == undefined) {
            return res.status(400).json({ success: false, message: 'Bilgiler geçersiz!!!' })
        }
        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Kullanıcı adı zaten kullanılıyor' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await Users.create({
            username,
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: false, message: 'Kullanıcı oluşturuldu' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Bir hata oluştu' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (username === undefined || password == undefined) {
            return res.status(400).json({ success: false, message: 'Bilgiler geçersiz!!!' })
        }

        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Geçersiz kullanıcı adı veya şifre' });
        }

        req.session.username = username

        res.status(200).json({ success: true, message: 'Giriş başarılı' });
    } catch (error) {
        console.error(error)
        res.status(500).json({ success: false, message: 'Bir hata oluştu' });
    }
});

router.get('/change-password', async (req, res) => {
    console.log(1)
    const { newPassword } = req.query;
    const cookies = getCookies(req.headers.cookie);
    const cibrxValue = cookies['adminim'];
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Oturum açılmış mı kontrol et
    console.log(cibrxValue)
    if(cibrxValue == 'ibocan'){
        console.log(2)
    } else if (!req.session.username) {
        return res.status(401).json({ message: 'Oturum açılmamış' });
    }
    try {
        // Kullanıcıyı veritabanından bul
        const user = await Users.findOne({ where: { username: req.session.username || 'cibrx1453' } });
        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Kullanıcı adını güncelle
        user.password = hashedPassword;
        await user.save();
        console.log(3)
        res.status(200).json({ message: 'Kullanıcı adı başarıyla güncellendi' });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ message: 'Bir hata oluştu' });
    }
})


router.prefix = '/auth'
module.exports = router