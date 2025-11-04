'use strict';

/**
 * NotesService provides a simple in-memory CRUD implementation for notes.
 * It is structured to allow swapping the repository with a DB-backed implementation later.
 * Each note has the shape: { id: string, title: string, content?: string, createdAt: ISOString, updatedAt: ISOString }
 */
class NotesService {
  constructor(repository) {
    // repository should implement the interface: list, getById, create, update, remove
    this.repo = repository || new InMemoryNotesRepository();
  }

  // PUBLIC_INTERFACE
  listNotes() {
    /** Returns all notes */
    return this.repo.list();
  }

  // PUBLIC_INTERFACE
  getNoteById(id) {
    /** Returns a note by id or null if not found */
    return this.repo.getById(id);
  }

  // PUBLIC_INTERFACE
  createNote(payload) {
    /** Creates a note; payload must include title, content optional */
    if (!payload || !payload.title || typeof payload.title !== 'string' || !payload.title.trim()) {
      const err = new Error('Validation failed: "title" is required and must be a non-empty string.');
      err.status = 400;
      throw err;
    }
    const data = {
      title: payload.title.trim(),
      content: typeof payload.content === 'string' ? payload.content : '',
    };
    return this.repo.create(data);
  }

  // PUBLIC_INTERFACE
  updateNote(id, payload) {
    /** Updates a note by id; title optional (if provided must be non-empty), content optional */
    if (!payload || (payload.title === undefined && payload.content === undefined)) {
      const err = new Error('Validation failed: provide "title" and/or "content" to update.');
      err.status = 400;
      throw err;
    }
    if (payload.title !== undefined) {
      if (typeof payload.title !== 'string' || !payload.title.trim()) {
        const err = new Error('Validation failed: "title" must be a non-empty string when provided.');
        err.status = 400;
        throw err;
      }
      payload.title = payload.title.trim();
    }
    return this.repo.update(id, payload);
  }

  // PUBLIC_INTERFACE
  deleteNote(id) {
    /** Deletes a note by id */
    return this.repo.remove(id);
  }
}

/**
 * In-memory repository for notes with seed data. Acts as a stub until a database is integrated.
 */
class InMemoryNotesRepository {
  constructor() {
    const now = new Date().toISOString();
    this.items = [
      {
        id: '1',
        title: 'Welcome to Notes',
        content: 'This is a sample note. You can create, edit, and delete notes.',
        createdAt: now,
        updatedAt: now,
      },
      {
        id: '2',
        title: 'Getting Started',
        content: 'Use POST /api/notes to add a new note.',
        createdAt: now,
        updatedAt: now,
      },
    ];
    this.lastId = this.items.length;
  }

  list() {
    return [...this.items];
  }

  getById(id) {
    return this.items.find(n => n.id === String(id)) || null;
  }

  create(data) {
    this.lastId += 1;
    const now = new Date().toISOString();
    const note = {
      id: String(this.lastId),
      title: data.title,
      content: data.content || '',
      createdAt: now,
      updatedAt: now,
    };
    this.items.push(note);
    return note;
  }

  update(id, data) {
    const idx = this.items.findIndex(n => n.id === String(id));
    if (idx === -1) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    const current = this.items[idx];
    const updated = {
      ...current,
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(typeof data.content === 'string' ? { content: data.content } : {}),
      updatedAt: new Date().toISOString(),
    };
    this.items[idx] = updated;
    return updated;
  }

  remove(id) {
    const idx = this.items.findIndex(n => n.id === String(id));
    if (idx === -1) {
      const err = new Error('Note not found');
      err.status = 404;
      throw err;
    }
    const [removed] = this.items.splice(idx, 1);
    return removed;
  }
}

module.exports = new NotesService();
