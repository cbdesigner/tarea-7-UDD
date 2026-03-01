const express = require('express');
const router = express.Router();
const { createCheckoutSession, handleWebhook, getOrders } = require('../controllers/checkoutController');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Create a Stripe checkout session
 *     tags: [Checkout]
 *     security:
 *       - authToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     size:
 *                       type: string
 *                     color:
 *                       type: string
 *     responses:
 *       200:
 *         description: Returns Stripe checkout URL
 *       401:
 *         description: Not authorized
 */
router.post('/', authorization, createCheckoutSession);

/**
 * @swagger
 * /api/checkout/webhook:
 *   post:
 *     summary: Stripe webhook endpoint
 *     tags: [Checkout]
 *     responses:
 *       200:
 *         description: Webhook received
 */
router.post('/webhook', handleWebhook);

/**
 * @swagger
 * /api/checkout/orders:
 *   get:
 *     summary: Get orders for authenticated user
 *     tags: [Checkout]
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: Array of orders
 *       401:
 *         description: Not authorized
 */
router.get('/orders', authorization, getOrders);

module.exports = router;
