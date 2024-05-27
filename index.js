const express = require('express')
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const sequelize = require('./modules/db');
const { Users, Blogs } = require('./models/User');
const path = require('path')
const app = express()
const fs = require('fs')
const https = require('https')


const port = process.env.PORT || 4607
const sessionSecret = process.env.SESSION_SECRET
const options = {
  key: fs.readFileSync("./server.key"),
  cert: fs.readFileSync("./server.crt"),
};

app.set('view engine', 'ejs')
app.use('/', rateLimit({
  windowMs: 60 * 1000,
  max: 90,
  handler: (req, res, next) => {
    return
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'), { index: 'index.html', extensions: ['html'] }));
app.use(session({
  secret: sessionSecret,
  name: 'Cibrx',
  resave: false,
  saveUninitialized: true,
  cookie: {
    sameSite: "none",
    secure: true,
    httpOnly: false,
  },
}))


const routers = fs.readdirSync('./routers/')
//const routers = ['auth', 'chat']
routers.forEach(routerFile => {
  const file = require(`./routers/${routerFile}`);
  app.use(file.prefix, file)
})

sequelize.sync()
  .then(() => {
    https.createServer(options, app)
      .listen(port, function () {
        console.log("Server started at port:",port);
      });
  })
  .catch(error => {
    console.error('Veritabanı senkronizasyon hatası:', error);
  });

