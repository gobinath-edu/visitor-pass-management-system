import { Visit } from "../models/Visit.model.js";
import { VISIT_STATUS } from "../constants/visitStatus.js";
import { getTodayString } from "../utils/dateTime.js";

function weekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export async function getReportSummary({ period = "TODAY", startDate, endDate }) {
  const today = getTodayString();
  let from = today;
  let to = today;

  if (period === "WEEK") {
    from = weekStart();
  }

  if (period === "CUSTOM") {
    from = startDate;
    to = endDate;
  }

  const pipeline = [
    { $match: { visitDate: { $gte: from, $lte: to } } },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 }
      }
    }
  ];

  const grouped = await Visit.aggregate(pipeline);

  const counts = Object.fromEntries(
    grouped.map((item) => [item._id, item.count])
  );

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);

  return {
    period,
    from,
    to,
    total,
    pending: counts[VISIT_STATUS.PENDING] || 0,
    approved: counts[VISIT_STATUS.APPROVED] || 0,
    rejected: counts[VISIT_STATUS.REJECTED] || 0,
    checkedIn: counts[VISIT_STATUS.CHECKED_IN] || 0,
    checkedOut: counts[VISIT_STATUS.CHECKED_OUT] || 0,
    cancelled: counts[VISIT_STATUS.CANCELLED] || 0
  };
}
