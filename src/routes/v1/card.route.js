const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cardValidation = require('../../validations/card.validation');
const cardController = require('../../controllers/card.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCards'), validate(cardValidation.createCard), cardController.createCard)
  .get(auth('getCards'), validate(cardValidation.getCards), cardController.getCards);

router
  .route('/:cardId')
  .get(auth('getCards'), validate(cardValidation.getCard), cardController.getCard)
  .patch(auth('manageCards'), validate(cardValidation.updateCard), cardController.updateCard)
  .delete(auth('manageCards'), validate(cardValidation.deleteCard), cardController.deleteCard);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management and retrieval
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a card
 *     description: Only registered users can create other cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - cardExpiration
 *               - cardHolder
 *               - cardNumber
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               cardExpiration:
 *                 type: string
 *               cardHolder:
 *                 type: string
 *               cardNumber:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [MC,VISA, AE]
 *             example:
 *               name: Sobin's HDFC Card
 *               cardExpiration: 8/2026
 *               cardHolder: SOBIN GEORGE THOMAS
 *               cardNumber: 4532 7991 1360 8687
 *               category: VISA
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *       "400":
 *         $ref: '#/components/responses/InvalidCard'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all cards
 *     description: Only admins can retrieve all cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Card name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: Card role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of cards
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Card'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /cards/{id}:
 *   get:
 *     summary: Get a card
 *     description: Logged in cards can fetch only their own card information. Only admins can fetch other cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a card
 *     description: Logged in cards can only update their own information. Only admins can update other cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a card
 *     description: Logged in cards can delete only themselves. Only admins can delete other cards.
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Card id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
