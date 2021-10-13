const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

module.exports = () => {
  const app = express();

  // configura cors
  app.use(cors());

  // middleware do body-parser para poder pegar o body da requisição. 
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}