# BookMyVenue Architecture

## Frontend Structure

```text
frontend/website/src/app
```

App Router pages, route-level loading/error boundaries, and global CSS. Pages should compose reusable and feature-specific components, not hold heavy business logic.

```text
frontend/website/src/components
```

Reusable layout components shared across pages, such as `Navbar` and `Footer`.

```text
frontend/website/src/features
```

Feature-specific UI and business logic. Venue listing/card/search components live under `features/venues`. Contact form logic lives under `features/contact`.

```text
frontend/website/src/services
```

API communication. `services/api.ts` owns the Axios instance, base URL, interceptors, and typed backend methods.

```text
frontend/website/src/types
```

Shared TypeScript interfaces used across features and services.

```text
frontend/website/src/hooks
```

Custom React hooks for client-side state and async orchestration. `useVenues` manages venue list loading, errors, fallback data, and pagination state.

```text
frontend/website/src/lib
```

Small reusable helpers such as date and currency formatting.

## Backend Structure

```text
backend/src/config
```

Environment and database connection code.

```text
backend/src/models
```

Mongoose schemas and collection definitions.

```text
backend/src/routes
```

Express route definitions and middleware composition.

```text
backend/src/controllers
```

Request/response orchestration. Controllers call services and format API responses.

```text
backend/src/services
```

Business logic and database queries. Search, filtering, sorting, stock management, and inventory statistics live here.

```text
backend/src/middleware
```

Validation, uploads, async handling, and error handling.

```text
backend/src/utils
```

Reusable backend utilities such as API errors and response formatting.

```text
backend/src/seed
```

Sample MongoDB seed data for categories and venue products.

## Frontend To Backend Flow

```text
User interaction
  ↓
React component
  ↓
Custom hook
  ↓
services/api.ts Axios method
  ↓
Express route
  ↓
Controller
  ↓
Service
  ↓
Mongoose model
  ↓
MongoDB Atlas
```

## Backend To Frontend Flow

```text
MongoDB Atlas
  ↓
Mongoose model
  ↓
Service returns data
  ↓
Controller formats response
  ↓
Express sends JSON
  ↓
Axios response interceptor
  ↓
Custom hook state
  ↓
React component renders UI
```

## Product List Request

```text
/venues page
  ↓
VenueExplorer
  ↓
useVenues({ search, category, city, sort, page, limit })
  ↓
GET /api/products
  ↓
productRoutes.js
  ↓
productController.getProducts
  ↓
productService.getProducts
  ↓
Product.find(...).populate("category")
  ↓
VenueGrid + VenueCard
```

