const express = require('express');

const {usersRouter} = require('./users-controller');
const {itemsRouter} = require('./items-controller');
const {itemsPromotionsRouter} = require('./itemsPromotions-controller');


const router = module.exports = express.Router();

router.use('/users', require('./users-controller'));
router.use('/items', require('./items-controller'));
router.use('/stores', require('./stores-controller'));
router.use('/promotions', require('./promotions-controller'));
router.use('/livefeeds', require('./livefeeds-controller'));
router.use('/shoppinglists', require('./shoppinglists-controller'));
router.use('/itemsPromotions', require('./itemsPromotions-controller'));




// const express = require('express');

// const {usersRouter} = require('./users-controller');



// const router = module.exports = express.Router();

// router.use('/users', require('./users-controller'));
// router.use('/items', require('./items-controller'));
// router.use('/stores', require('./stores-controller'));
// router.use('/promotions', require('./promotions-controller'));
// router.use('/livefeeds', require('./livefeeds-controller'));
// router.use('/shoppinglists', require('./shoppinglists-controller'));
// router.use('/itemsPromotions', require('./itemsPromotions-controller'));