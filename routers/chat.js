const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    if(req.session.username) {
      res.render('chat.ejs', { username: req.session.username})
    } else {
      res.send('Lütfen öncelikle giriş yapınız!')
    }
})

router.prefix = '/chat'
module.exports = router