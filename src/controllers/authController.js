import * as authService from "../services/authService.js";

export function signup(req, res) {
  try {
    const user = authService.signup(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export function login(req, res) {
  try {
    const user = authService.login(req.body);
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
