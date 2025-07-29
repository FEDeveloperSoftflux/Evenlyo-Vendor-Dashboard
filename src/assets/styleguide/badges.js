export const badgeStyles = {
  new: "bg-pink-100 text-pink-600",
  confirmed: "bg-green-100 text-green-600",
  "in-progress": "bg-[#FFB3101A] text-yellow-600", // Golden color with transparency
  edit: "bg-yellow-100 text-yellow-600",
  rejected: "bg-red-100 text-red-600",
  addition: "bg-green-100 text-green-600",
  approval: "bg-blue-100 text-blue-600",
  rejection: "bg-red-100 text-red-600",
  live: "bg-green-100 text-green-600",
  block: "bg-red-100 text-red-600",
  // Tracking-specific statuses
  delivered: "bg-[#FFB3101A] text-[#FFB310]",
  "on the way": "bg-pink-100  text-[#FF0092]",
  "received back": "bg-yellow-100  text-[#A05807]",
  claim: "bg-pink-100 text-[#E31B95]",
  complete: "bg-[#04C3731A] text-green-600",
  pickedup: "bg-blue-100 text-blue-600",
  // Role management statuses
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600",
  inactive: "bg-red-100 text-red-600",
  // Billing-specific statuses
  paid: "bg-green-100 text-green-600",
  pending: "bg-yellow-100 text-yellow-600",
  overdue: "bg-red-100 text-red-600",
  left: "bg-red-100 text-red-600",
  // Notification-specific statuses
  unread: "bg-pink-100 text-pink-600",
  read: "bg-gray-100 text-gray-600",
};

export const getBadgeStyle = (status) => {
  return badgeStyles[status?.toLowerCase()] || badgeStyles.new;
};
