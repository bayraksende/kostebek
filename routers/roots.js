const express = require('express')
const router = express.Router()
const path = require('path')


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