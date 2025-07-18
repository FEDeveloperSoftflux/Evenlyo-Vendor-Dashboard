export const badgeStyles = {
  new: "bg-pink-100 text-pink-600",
  confirmed: "bg-green-100 text-green-600",
  "in-progress": "bg-purple-100 text-purple-600",
  edit: "bg-yellow-100 text-yellow-600",
  rejected: "bg-red-100 text-red-600",
  addition: "bg-green-100 text-green-600",
  approval: "bg-blue-100 text-blue-600",
  rejection: "bg-red-100 text-red-600",
};

export const getBadgeStyle = (status) => {
  return badgeStyles[status?.toLowerCase()] || badgeStyles.new;
};
