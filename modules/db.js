const { Sequelize } = require('sequelize');

// SQLite veritabanına bağlanma
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'kostebek.sqlite'  // Veritabanı dosyasının yolunu belirtin
});

module.exports = sequelize;
