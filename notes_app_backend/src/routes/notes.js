'use strict';

const express = require('express');
const notesController = require('../controllers/notes');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Notes
 *     description: Notes CRUD operations
 */

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: List notes
 *     tags: [Notes]
 *     responses:
 *       200:
 *         description: List of notes
 */
router.get('/', notesController.list.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note found
 *       404:
 *         description: Note not found
 */
router.get('/:id', notesController.getById.bind(notesController));

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create note
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note created
 *       400:
 *         description: Validation error
 */
router.post('/', notesController.create.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   put:
 *     summary: Update note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Note not found
 */
router.put('/:id', notesController.update.bind(notesController));

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted
 *       404:
 *         description: Note not found
 */
router.delete('/:id', notesController.remove.bind(notesController));

module.exports = router;
