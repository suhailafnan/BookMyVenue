# BookMyVenue Backend

Standalone backend for the owner and admin business-management modules.

## Run

```powershell
cd backend
npm run dev
```

Default URL:

```text
http://localhost:4000
```

## Main Endpoints

- `GET /api/health`
- `GET /api/admin/dashboard`
- `GET /api/admin/owners`
- `POST /api/admin/owners`
- `GET /api/admin/users`
- `PATCH /api/admin/users/:id`
- `GET /api/admin/venues`
- `PATCH /api/admin/venues/:id`
- `GET /api/admin/bookings`
- `GET /api/admin/reports`
- `GET /api/admin/settings`
- `PATCH /api/admin/settings`
- `PATCH /api/admin/settings/:key`
- `GET /api/owner/dashboard`
- `GET /api/owner/profile`
- `POST /api/owner/profile`
- `GET /api/owner/venues`
- `POST /api/owner/venues`
- `GET /api/owner/venues/:id`
- `PATCH /api/owner/venues/:id`
- `DELETE /api/owner/venues/:id`
- `GET /api/owner/bookings`
- `PATCH /api/owner/bookings/:id`
- `GET /api/owner/availability`
- `PATCH /api/owner/availability`
- `GET /api/owner/earnings`
