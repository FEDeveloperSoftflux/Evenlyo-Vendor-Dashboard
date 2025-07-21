export const badgeStyles = {
  new: "bg-pink-100 text-pink-600",
  confirmed: "bg-green-100 text-green-600",
  "in-progress": "bg-purple-100 text-purple-600",
  edit: "bg-yellow-100 text-yellow-600",
  rejected: "bg-red-100 text-red-600",
  addition: "bg-green-100 text-green-600",
  approval: "bg-blue-100 text-blue-600",
  rejection: "bg-red-100 text-red-600",
  live: "bg-green-100 text-green-600",
  block: "bg-red-100 text-red-600",
  // Tracking-specific statuses
  delivered: "bg-green-100 text-green-600",
  "on the way": "bg-pink-100 text-pink-600",
  "received back": "bg-yellow-100 text-yellow-600",
  claim: "bg-purple-100 text-purple-600",
  complete: "bg-green-100 text-green-600",
  // Role management statuses
  active: "bg-green-100 text-green-600",
  "de-active": "bg-red-100 text-red-600",
  inactive: "bg-red-100 text-red-600",
};

export const getBadgeStyle = (status) => {
  return badgeStyles[status?.toLowerCase()] || badgeStyles.new;
};
