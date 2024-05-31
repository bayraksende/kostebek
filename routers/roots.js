const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/my-account', (req, res) => {
  let flag = ''
  if (req.session.username) {
    if (req.session.username == 'cibrx1453') flag = 'bayrakbende{patr0n_cibrx1n_gazab1na_ugr4di!}'
    res.render('my-account.ejs', { flag: flag })
  } else {
    res.redirect('/login')
  }
})

router.get('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.send('Error logging out.');
      } else {
        res.redirect('/');
      }
    });
  } catch (error) {
    res.redirect('/login')
  }
})


router.prefix = '/'
module.exports = router