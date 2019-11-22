// configure middlewares

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = (server) => {
  server.use(helmet());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true: }));
  server.use(cors());
};
