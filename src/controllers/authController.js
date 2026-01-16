import * as authService from "../services/authService.js";

export async function signup(req, res) { // Adicionado async
  try {
    const user = await authService.signup(req.body); // Adicionado await
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req, res) { // Adicionado async
  try {
    const user = await authService.login(req.body); // Adicionado await
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

export function logout(req, res) {
  authService.logout();
  res.status(204).end();
}

export function me(req, res) {
  const user = authService.getCurrentUser();
  res.json(user);
}