const express = require('express');
const router = express.Router();
const { register, login, getUser, seedDemoUser } = require('../controllers/userController');
const authorization = require('../middleware/authorization');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully, returns JWT token
 *       400:
 *         description: Validation error or user already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *       400:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/users/seed-demo:
 *   get:
 *     summary: Create demo user if not exists (for local testing)
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Demo user ready or already exists
 */
router.get('/seed-demo', seedDemoUser);

/**
 * @swagger
 * /api/users/verify:
 *   get:
 *     summary: Verify token and get authenticated user data
 *     tags: [Users]
 *     security:
 *       - authToken: []
 *     responses:
 *       200:
 *         description: Returns user data (without password)
 *       401:
 *         description: Token invalid or missing
 */
router.get('/verify', authorization, getUser);

module.exports = router;
