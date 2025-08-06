export const isLoggedIn = () => !!localStorage.getItem("authToken");

export const hasRole = (role) => {
  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  return roles.includes(role);
};