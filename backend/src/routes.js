const { URL } = require("url");
const { fail, notFound, ok, sendJson } = require("./utils/http");
const { readJson } = require("./utils/request");
const service = require("./services/business.service");

const bookingStatuses = ["Pending", "Accepted", "Rejected", "Confirmed", "Approved", "Review", "Cancelled"];
const userStatuses = ["Active", "Verified", "Review", "Flagged", "Blocked"];
const venueStatuses = ["Premium", "Active", "Needs Photos", "Pending", "Approved", "Rejected", "Suspended", "Review"];

function validStatus(status, list) {
  return typeof status === "string" && list.includes(status) ? status : undefined;
}

async function route(req, res) {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
  const path = url.pathname;
  const parts = path.split("/").filter(Boolean);

  try {
    if (req.method === "GET" && path === "/api/health") {
      ok(res, { service: "bookmyvenue-backend", status: "healthy", modules: ["owner", "admin"] });
      return;
    }

    if (parts[0] !== "api") {
      notFound(res);
      return;
    }

    if (parts[1] === "owner") {
      await routeOwner(req, res, parts);
      return;
    }

    if (parts[1] === "admin") {
      await routeAdmin(req, res, parts);
      return;
    }

    notFound(res);
  } catch (caught) {
    fail(res, caught instanceof Error ? caught.message : "Unexpected backend error.", 500);
  }
}

async function routeOwner(req, res, parts) {
  const resource = parts[2];
  const id = parts[3];

  if (resource === "dashboard" && req.method === "GET") {
    const dashboard = service.getOwnerDashboard();
    dashboard ? ok(res, dashboard) : fail(res, "Owner dashboard not found.", 404);
    return;
  }

  if (resource === "profile") {
    if (req.method === "GET") {
      const profile = service.getOwnerProfile();
      profile ? ok(res, profile) : fail(res, "Owner profile not found.", 404);
      return;
    }

    if (req.method === "POST") {
      ok(res, service.createOwnerRegistration(await readJson(req)), 201);
      return;
    }
  }

  if (resource === "earnings" && req.method === "GET") {
    const earnings = service.getOwnerEarnings();
    earnings ? ok(res, earnings) : fail(res, "Owner earnings not found.", 404);
    return;
  }

  if (resource === "availability") {
    if (req.method === "GET") {
      ok(res, service.getOwnerAvailability());
      return;
    }

    if (req.method === "PATCH") {
      ok(res, service.updateOwnerAvailability(await readJson(req)));
      return;
    }
  }

  if (resource === "venues") {
    if (!id && req.method === "GET") {
      ok(res, service.getOwnerVenues());
      return;
    }

    if (!id && req.method === "POST") {
      ok(res, service.createOwnerVenue(await readJson(req)), 201);
      return;
    }

    if (id && req.method === "GET") {
      const venue = service.getOwnerVenue(id);
      venue ? ok(res, venue) : fail(res, "Venue not found.", 404);
      return;
    }

    if (id && req.method === "PATCH") {
      const venue = service.updateOwnerVenue(id, await readJson(req));
      venue ? ok(res, venue) : fail(res, "Venue not found.", 404);
      return;
    }

    if (id && req.method === "DELETE") {
      service.deleteOwnerVenue(id) ? ok(res, { id, deleted: true }) : fail(res, "Venue not found.", 404);
      return;
    }
  }

  if (resource === "bookings") {
    if (!id && req.method === "GET") {
      ok(res, service.getOwnerBookings());
      return;
    }

    if (id && req.method === "PATCH") {
      const body = await readJson(req);
      const status = validStatus(body.status, bookingStatuses);
      if (!status) {
        fail(res, "Valid booking status is required.");
        return;
      }

      const booking = service.updateOwnerBookingStatus(id, status);
      booking ? ok(res, booking) : fail(res, "Booking not found.", 404);
      return;
    }
  }

  notFound(res);
}

async function routeAdmin(req, res, parts) {
  const resource = parts[2];
  const id = parts[3];

  if (resource === "dashboard" && req.method === "GET") {
    ok(res, service.getAdminDashboard());
    return;
  }

  if (resource === "owners") {
    if (req.method === "GET") {
      ok(res, service.getAdminDashboard().owners);
      return;
    }

    if (req.method === "POST") {
      ok(res, service.createOwnerRegistration(await readJson(req)), 201);
      return;
    }
  }

  if (resource === "users") {
    if (!id && req.method === "GET") {
      ok(res, service.getAdminUsers());
      return;
    }

    if (id && req.method === "PATCH") {
      const body = await readJson(req);
      const status = validStatus(body.status, userStatuses);
      if (!status) {
        fail(res, "Valid user status is required.");
        return;
      }

      const user = service.updateAdminUserStatus(id, status);
      user ? ok(res, user) : fail(res, "User not found.", 404);
      return;
    }
  }

  if (resource === "venues") {
    if (!id && req.method === "GET") {
      ok(res, service.getAdminVenues());
      return;
    }

    if (id && req.method === "PATCH") {
      const body = await readJson(req);
      const status = validStatus(body.status, venueStatuses);
      if (!status) {
        fail(res, "Valid venue status is required.");
        return;
      }

      const venue = service.updateAdminVenueStatus(id, status);
      venue ? ok(res, venue) : fail(res, "Venue not found.", 404);
      return;
    }
  }

  if (resource === "bookings" && req.method === "GET") {
    ok(res, service.getAdminBookings());
    return;
  }

  if (resource === "reports" && req.method === "GET") {
    ok(res, service.getAdminReports());
    return;
  }

  if (resource === "settings") {
    if (!id && req.method === "GET") {
      ok(res, service.getAdminSettings());
      return;
    }

    if (!id && req.method === "PATCH") {
      const body = await readJson(req);
      if (Array.isArray(body.settings)) {
        ok(res, service.updateAdminSettings(body));
        return;
      }

      if (typeof body.key !== "string") {
        fail(res, "Setting key is required.");
        return;
      }

      const setting = service.updateAdminSetting(body.key, body);
      setting ? ok(res, setting) : fail(res, "Setting not found.", 404);
      return;
    }

    if (id && req.method === "PATCH") {
      const setting = service.updateAdminSetting(id, await readJson(req));
      setting ? ok(res, setting) : fail(res, "Setting not found.", 404);
      return;
    }
  }

  notFound(res);
}

module.exports = {
  route,
};
