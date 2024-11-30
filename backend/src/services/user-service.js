import fs from "fs";

const loadUsers = () => {
  const data = fs.readFileSync("./src/data/users.json", "utf-8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync("./src/data/users.json", JSON.stringify(users, null, 2));
};

const getAllUsers = () => {
  return loadUsers();
};

const authenticateUser = (email, password) => {
  const users = loadUsers();
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

const registerUser = ({ name, email, password, role = "user" }) => {
  const users = loadUsers();

  if (users.find((user) => user.email === email)) {
    throw new Error("User already exists");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password,
    role,
  };

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

export default {
  getAllUsers,
  authenticateUser,
  registerUser,
};
