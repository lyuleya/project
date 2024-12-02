export const saveUserToLocalStorage = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const validateFilters = ({ startDate, endDate }) => {
  const today = new Date().toISOString().split("T")[0];
  const errors = {};

  if (!startDate || startDate < today) {
    errors.startDate = true;
  }
  if (!endDate || endDate < today || endDate < startDate) {
    errors.endDate = true;
  }

  return errors;
};