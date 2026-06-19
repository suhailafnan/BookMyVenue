const Booking = require("../models/Booking");
const Product = require("../models/Product");
const ApiError = require("../utils/apiError");

const getDatesBetween = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  const end = new Date(endDate);

  while (current <= end) {
    dates.push(current.toISOString().slice(0, 10));
    current.setDate(current.getDate() + 1);
  }

  return dates;
};

const assertAvailability = async (venue, payload) => {
  const blockedDates = venue.metadata.blockedDates || [];

  if (payload.bookingType === "hourly") {
    if (blockedDates.includes(payload.date)) {
      throw new ApiError(409, "This date is blocked by the owner");
    }

    const exists = await Booking.findOne({
      venueId: venue._id,
      bookingType: "hourly",
      date: payload.date,
      startTime: payload.startTime,
      status: { $in: ["pending", "confirmed"] },
    });

    if (exists) {
      throw new ApiError(409, "This time slot is already booked");
    }
  }

  if (payload.bookingType === "daily") {
    const requestedDates = getDatesBetween(payload.startDate, payload.endDate);
    const hasBlockedDate = requestedDates.some((date) => blockedDates.includes(date));

    if (hasBlockedDate) {
      throw new ApiError(409, "Selected range contains blocked dates");
    }

    const exists = await Booking.findOne({
      venueId: venue._id,
      bookingType: "daily",
      status: { $in: ["pending", "confirmed"] },
      startDate: { $lte: payload.endDate },
      endDate: { $gte: payload.startDate },
    });

    if (exists) {
      throw new ApiError(409, "Selected date range is already booked");
    }
  }
};

const calculateAmount = (venue, payload) => {
  if (payload.bookingType === "hourly") {
    return Number(payload.totalAmount || venue.pricePerHour || venue.price || 0);
  }

  const days = getDatesBetween(payload.startDate, payload.endDate).length;
  return Number(payload.totalAmount || (venue.pricePerDay || venue.price || 0) * days);
};

const createBooking = async (userId, payload) => {
  const venue = await Product.findById(payload.venueId);

  if (!venue) {
    throw new ApiError(404, "Venue not found");
  }

  if (!venue.owner) {
    throw new ApiError(400, "Venue owner is not configured");
  }

  await assertAvailability(venue, payload);

  return Booking.create({
    userId,
    venueId: venue._id,
    ownerId: venue.owner,
    bookingType: payload.bookingType,
    date: payload.date,
    startDate: payload.startDate,
    endDate: payload.endDate,
    startTime: payload.startTime,
    endTime: payload.endTime,
    totalAmount: calculateAmount(venue, payload),
  });
};

const getCustomerBookings = (userId) =>
  Booking.find({ userId }).populate("venueId").sort({ createdAt: -1 });

const getOwnerBookings = (ownerId) =>
  Booking.find({ ownerId }).populate("venueId userId").sort({ createdAt: -1 });

const updateBookingStatus = async (bookingId, ownerId, status) => {
  const booking = await Booking.findOneAndUpdate(
    { _id: bookingId, ownerId },
    { status },
    { new: true, runValidators: true }
  ).populate("venueId userId");

  if (!booking) {
    throw new ApiError(404, "Booking not found");
  }

  return booking;
};

const getOwnerStats = async (ownerId) => {
  const [totalVenues, bookings, revenueResult] = await Promise.all([
    Product.countDocuments({ owner: ownerId }),
    Booking.find({ ownerId }).sort({ createdAt: -1 }).limit(8).populate("venueId userId"),
    Booking.aggregate([
      { $match: { ownerId, paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]),
  ]);

  const allBookings = await Booking.find({ ownerId });
  const upcomingBookings = allBookings.filter((booking) =>
    ["pending", "confirmed"].includes(booking.status)
  ).length;

  return {
    totalVenues,
    totalBookings: allBookings.length,
    monthlyRevenue: revenueResult[0]?.total || 0,
    upcomingBookings,
    recentBookings: bookings,
    chart: {
      bookings: [4, 8, 5, 12, 9, allBookings.length],
      revenue: [12000, 18000, 15000, 30000, 26000, revenueResult[0]?.total || 0],
    },
  };
};

module.exports = {
  createBooking,
  getCustomerBookings,
  getOwnerBookings,
  updateBookingStatus,
  getOwnerStats,
};
