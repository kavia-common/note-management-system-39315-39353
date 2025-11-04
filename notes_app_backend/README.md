# Notes App Backend (Express)

This backend provides RESTful CRUD endpoints for managing text notes, along with a health check. It is designed with a modular structure (routes, controllers, services) and can be easily adapted to a database-backed repository. For now, an in-memory repository with seed data is used.

- Runs on: http://localhost:3001
- API Docs (Swagger/OpenAPI): http://localhost:3001/docs

## Endpoints

- GET /health — health check (also available at GET /)
- GET /api/notes — list all notes
- GET /api/notes/:id — get a note by id
- POST /api/notes — create a note
  - Body: { "title": "required string", "content": "optional string" }
- PUT /api/notes/:id — update a note
  - Body: { "title": "optional string", "content": "optional string" }
- DELETE /api/notes/:id — delete a note

## Validation and Errors

- POST /api/notes requires a non-empty string "title". "content" is optional.
- PUT /api/notes/:id validates provided fields. If provided, "title" must be a non-empty string.
- JSON error responses are returned as: { "error": "message" } with appropriate HTTP status codes (e.g., 400, 404, 500).

## Architecture

- src/routes — Express route definitions
- src/controllers — Request handlers (thin controllers)
- src/services — Business logic and data access abstraction
  - src/services/notes.js includes an in-memory repository with seed data. Replace with a DB repository when a database is available.

## CORS and JSON

- CORS is enabled for all origins.
- JSON body parsing is enabled via `express.json()`.

## Database Integration (Stub)

The NotesService is constructed to accept a repository implementing: list, getById, create, update, remove.
When a `notes_app_database` container is available, implement a repository that connects using environment variables, and inject it into the service.

Example repository interface:
```js
class NotesRepository {
  list() {}
  getById(id) {}
  create({ title, content }) {}
  update(id, { title, content }) {}
  remove(id) {}
}
```

Then wire it in `src/services/notes.js` by replacing the default `InMemoryNotesRepository` with your implementation.

## Development

- Start: `npm start` (port 3001)
- Dev (watch): `npm run dev`
- Lint: `npm run lint`

```bash
curl http://localhost:3001/health
curl http://localhost:3001/api/notes
```
