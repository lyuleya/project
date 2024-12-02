import fs from "fs";

const USERS_FILE = "./src/data/users.json";

const loadUsers = () => {
  const data = fs.readFileSync(USERS_FILE, "utf-8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
};

const getAllUsers = () => loadUsers();

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
    id: Date.now().toString(),
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