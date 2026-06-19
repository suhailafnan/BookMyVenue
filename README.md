# BookMyVenue

BookMyVenue is a production-ready full-stack venue booking application for discovering, filtering, and viewing premium event venues.

## Tech Stack

Frontend:

- Next.js 16 App Router
- TypeScript
- Tailwind CSS
- Axios
- React Icons

Backend:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Multer
- REST APIs

## Architecture

```text
frontend/website
  src/app        Route pages and app boundaries
  src/components Shared layout components
  src/features   Feature-specific UI
  src/hooks      Reusable React hooks
  src/lib        Utility functions
  src/services   Axios API layer
  src/types      TypeScript interfaces

backend
  src/config      Environment and database config
  src/controllers HTTP request/response orchestration
  src/middleware  Validation, upload, async, and error middleware
  src/models      Mongoose models
  src/routes      Express routes
  src/services    Business logic and database queries
  src/utils       API utility helpers
  src/seed        Sample seed data
```

Detailed architecture docs: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

Code audit: [docs/CODE_AUDIT.md](docs/CODE_AUDIT.md)

## Installation

```bash
cd backend
npm install
```

```bash
cd frontend/website
npm install
```

## Environment Variables

Backend, create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/bookmyvenue?retryWrites=true&w=majority
CLIENT_URL=http://localhost:3000
LOW_STOCK_THRESHOLD=10
```

Frontend, create `frontend/website/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## MongoDB Setup

1. Create a MongoDB Atlas cluster.
2. Create a database user.
3. Allow your IP address in Atlas network access.
4. Add your Atlas connection string to `backend/.env`.
5. Seed sample data:

```bash
cd backend
npm run seed
```

## Start Backend

```bash
cd backend
npm run dev
```

API base URL:

```text
http://localhost:5000
```

## Start Frontend

```bash
cd frontend/website
npm run dev
```

App URL:

```text
http://localhost:3000
```

## API Documentation

Categories:

```http
GET    /api/categories
GET    /api/categories/:id
POST   /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

Products / Venues:

```http
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
PUT    /api/products/:id/stock
GET    /api/products/inventory/dashboard
POST   /api/products/upload
```

Product query parameters:

```text
search
category
minPrice
maxPrice
sort
page
limit
```

Example:

```http
GET /api/products?search=hall&category=Wedding&page=1&limit=10&sort=price:asc
```

Stock examples:

```json
{ "stock": 100 }
```

```json
{ "action": "increase", "quantity": 5 }
```

```json
{ "action": "reduce", "quantity": 2 }
```

## Available Frontend Routes

```text
/              Home
/venues        Venue listing
/venues/[id]   Venue details
/about         About page
/contact       Contact page
/privacy       Privacy page
/terms         Terms page
```

## Screenshots

Add screenshots here before deployment:

```text
docs/screenshots/home.png
docs/screenshots/venues.png
docs/screenshots/details.png
```

## Deployment Guide

Backend:

1. Deploy `backend` to Render, Railway, Fly.io, or similar.
2. Set production environment variables.
3. Ensure `/uploads` persistence is configured or replace local storage with cloud storage.
4. Set `CLIENT_URL` to your deployed frontend URL.

Frontend:

1. Deploy `frontend/website` to Vercel or another Next.js host.
2. Set `NEXT_PUBLIC_API_URL` to the deployed backend API URL.
3. Run `npm run build` before release.

## Performance Notes

- Venue cards use `next/image`.
- Venue listing uses a dynamic import boundary.
- API calls are centralized through Axios interceptors.
- Listing pages include loading skeletons, empty states, and error states.
- Reusable hooks reduce duplicated request logic.

## Verification

```bash
cd backend
Get-ChildItem -Recurse src -Filter *.js | ForEach-Object { node --check $_.FullName }
```

```bash
cd frontend/website
npm run lint
npm run build
```

## Future Improvements

- Add authentication and role-based venue management.
- Move uploads from local disk to S3 or Cloudinary.
- Add real booking and payment workflows.
- Add admin dashboard charts for inventory and bookings.
- Add automated API and component tests.
