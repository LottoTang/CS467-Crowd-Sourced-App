const express = require('express');

const {usersRouter} = require('./users-controller');
const {itemsRouter} = require('./items-controller');
const {storesRouter} = require('./stores-controller');
const {promotionsRouter} = require('./promotions-controller');
const {livefeedsRouter} = require('./livefeeds-controller');
const {productsRouter} = require('./products-controller');


const router = module.exports = express.Router();

router.use('/users', usersRouter);
router.use('/items', itemsRouter);
router.use('/stores', storesRouter);
router.use('/promotions', promotionsRouter);
router.use('/livefeeds', livefeedsRouter);
router.use('/products', productsRouter);
