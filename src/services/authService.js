import { User } from "../models/User.js";

let currentUser = null; // Mantendo sua lógica de estado simples

export async function signup({ email, password, name }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Este email já está cadastrado");

  const newUser = new User({ email, password, name });
  await newUser.save();

  const safeUser = newUser.toObject();
  delete safeUser.password;
  
  currentUser = safeUser;
  return currentUser;
}

export async function login({ email, password }) {
  const user = await User.findOne({ email, password });
  if (!user) throw new Error("Email ou senha incorretos");

  const safeUser = user.toObject();
  delete safeUser.password;

  currentUser = safeUser;
  return currentUser;
}

export function logout() { currentUser = null; }
export function getCurrentUser() { return currentUser; }