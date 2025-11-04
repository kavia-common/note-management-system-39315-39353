'use strict';

const notesService = require('../services/notes');

class NotesController {
  /**
   * Get list of all notes
   */
  // PUBLIC_INTERFACE
  async list(req, res, next) {
    try {
      const data = await notesService.listNotes();
      return res.status(200).json({ data });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Get a single note by ID
   */
  // PUBLIC_INTERFACE
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const note = await notesService.getNoteById(id);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.status(200).json({ data: note });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Create a new note
   */
  // PUBLIC_INTERFACE
  async create(req, res, next) {
    try {
      const note = await notesService.createNote(req.body);
      return res.status(201).json({ data: note });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Update an existing note by ID
   */
  // PUBLIC_INTERFACE
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const note = await notesService.updateNote(id, req.body || {});
      return res.status(200).json({ data: note });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Delete a note by ID
   */
  // PUBLIC_INTERFACE
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const note = await notesService.deleteNote(id);
      return res.status(200).json({ data: note });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = new NotesController();
