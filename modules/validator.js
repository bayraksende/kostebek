// validators.js

const Validator = require('validator');

const validateBlogData = ({ title, content, image }) => {
  let errors = {};

  // Title doğrulaması
  if (!title || Validator.isEmpty(title)) {
    errors.title = 'Başlık alanı boş bırakılamaz';
  } else if (!Validator.isLength(title, { min: 5, max: 100 })) {
    errors.title = 'Başlık en az 5, en fazla 100 karakter olmalıdır';
  }

  // Content doğrulaması
  if (!content || Validator.isEmpty(content)) {
    errors.content = 'İçerik alanı boş bırakılamaz';
  } else if (!Validator.isLength(content, { min: 10, max: 1000 })) {
    errors.content = 'İçerik en az 10, en fazla 1000 karakter olmalıdır';
  }

  // Image doğrulaması
  if (!image || Validator.isEmpty(image)) {
    errors.image = 'Resim URL\'si boş bırakılamaz';
  } else if (!Validator.isURL(image)) {
    errors.image = 'Geçersiz resim URL\'si';
  }

  return {
    errors,
    valid: Object.keys(errors).length === 0
  };
};

module.exports = validateBlogData;
