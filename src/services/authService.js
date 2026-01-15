import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const filePath = path.resolve("src/data/users.json");

// usuário “logado” fake (em memória)
let currentUser = null;

function readFile() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

export function signup({ email, password, name }) {
  const data = readFile();

  if (data.users.find(u => u.email === email)) {
    throw new Error("Este email já está cadastrado");
  }

  const newUser = {
    id: uuid(),
    email,
    name,
    password
  };

  data.users.push(newUser);
  writeFile(data);

  currentUser = sanitizeUser(newUser);
  return currentUser;
}

export function login({ email, password }) {
  const data = readFile();

  const user = data.users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Email ou senha incorretos");
  }

  currentUser = sanitizeUser(user);
  return currentUser;
}

export function logout() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}
