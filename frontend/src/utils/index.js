const saveUserToLocalStorage = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

const getUserFromLocalStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const validateFilters = ({ startDate, endDate }) => {
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

const formatDateRange = (startDateString, nights) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + nights);

  const formattedStartDate = startDate.toLocaleDateString();
  const formattedEndDate = endDate.toLocaleDateString();

  return `${formattedStartDate} - ${formattedEndDate}`;
};

const getToday = () => {
  return new Date().toLocaleDateString("en-CA");
};

export {
  getToday,
  getUserFromLocalStorage,
  saveUserToLocalStorage,
  formatDateRange,
  validateFilters,
};